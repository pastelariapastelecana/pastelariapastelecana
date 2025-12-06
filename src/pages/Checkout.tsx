"use client";

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useStoreStatus } from '@/contexts/StoreStatusContext';
import { useMercadoPago } from '@/contexts/MercadoPagoContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, CreditCard, Loader2, CheckCircle2, User, Clock } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { generateUUID } from '@/lib/utils'; // Importar a função de UUID
import { supabase } from '@/integrations/supabase/client'; // Importar o cliente Supabase

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isStoreOpen, isLoading: isStatusLoading } = useStoreStatus();
  const { mpInstance, isMpInitialized } = useMercadoPago();
  const navigate = useNavigate();
  const location = useLocation();

  const { deliveryDetails, deliveryFee } = (location.state || {}) as {
    deliveryDetails?: {
      address: string;
      number: string;
      neighborhood: string;
      city: string;
      zipCode: string;
    };
    deliveryFee?: number | null;
  };

  const [paymentMethod, setPaymentMethod] = useState<'mercadopago'>('mercadopago');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null); // Novo estado para Order ID

  const totalWithDelivery = totalPrice + (deliveryFee || 0);

  // Redireciona se o carrinho estiver vazio ou detalhes de entrega ausentes
  useEffect(() => {
    if (items.length === 0 || !deliveryDetails || deliveryFee === undefined || deliveryFee === null) {
      if (paymentStatus !== 'success') {
        toast.info('Por favor, revise seu carrinho e endereço de entrega.');
        navigate('/carrinho');
      }
    }
  }, [items, navigate, deliveryDetails, deliveryFee, paymentStatus]);

  const constructFullAddress = (details?: typeof deliveryDetails) => {
    if (!details) return '';
    const { address, number, neighborhood, city, zipCode } = details;
    return `${address}, ${number}, ${neighborhood}, ${city} - ${zipCode}`;
  };

  // Função para armazenar os detalhes do pedido no Supabase
  const storeOrderDetails = useCallback(async (paymentId: string, paymentMethodUsed: string, externalOrderId: string) => {
    if (!deliveryDetails || deliveryFee === null) {
        toast.error('Detalhes de entrega ou taxa de frete ausentes. Por favor, retorne ao carrinho.');
        return;
    }

    const orderDetails = {
        external_order_id: externalOrderId, // Usado como external_reference no MP
        payment_id: paymentId,
        status: 'pending_payment', // Status inicial
        items: items,
        delivery_details: deliveryDetails,
        delivery_fee: deliveryFee,
        total_price: totalPrice,
        total_with_delivery: totalWithDelivery,
        payment_method: paymentMethodUsed,
        payer_name: payerName,
        payer_email: payerEmail,
        order_date: new Date().toISOString(),
    };

    try {
        const { error } = await supabase
            .from('orders')
            .insert([orderDetails]);

        if (error) {
            console.error('Erro ao armazenar pedido no Supabase:', error);
            throw new Error('Falha ao armazenar pedido.');
        }
        
        // Se o pagamento já foi aprovado (retorno do MP), atualiza o status
        if (paymentId && paymentMethodUsed === 'mercadopago_approved') {
            await supabase
                .from('orders')
                .update({ status: 'approved' })
                .eq('external_order_id', externalOrderId);
            
            // Se o pagamento já está aprovado, o frontend pode assumir sucesso
            setPaymentStatus('success');
            clearCart();
        }

    } catch (error) {
        console.error('Erro ao armazenar pedido no Supabase:', error);
        toast.error('Ocorreu um erro ao preparar seu pedido. Tente novamente.');
        setPaymentStatus('failed');
    }
  }, [items, deliveryDetails, deliveryFee, totalPrice, totalWithDelivery, payerName, payerEmail, clearCart]);

  // Efeito para lidar com o retorno do Mercado Pago (se for redirecionado)
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get('status');
    const paymentId = query.get('payment_id');
    const externalReference = query.get('external_reference'); // Captura o external_reference

    if (status === 'approved' && paymentId && externalReference) {
        if (paymentStatus !== 'success' && paymentStatus !== 'processing') {
            setPaymentStatus('processing');
            // Se o pagamento foi aprovado, armazenamos o pedido no Supabase e limpamos o carrinho.
            // O e-mail será enviado pelo webhook.
            storeOrderDetails(paymentId, 'mercadopago_approved', externalReference);
        }
    } else if (status === 'pending') {
        toast.info('Seu pagamento está pendente. Aguardando confirmação.');
    } else if (status === 'rejected') {
        toast.error('Seu pagamento foi recusado. Por favor, tente novamente.');
        navigate('/checkout');
    }
  }, [location.search, navigate, paymentStatus, storeOrderDetails]);


  const handleCheckoutProPayment = async () => {
    if (!isStoreOpen) {
        toast.error('A loja está fechada no momento. Não é possível processar o pagamento.');
        return;
    }
    
    if (!deliveryDetails || deliveryFee === null || !payerName.trim() || !payerEmail.trim()) {
        toast.error('Por favor, preencha todos os dados do pagador e de entrega.');
        return;
    }

    if (!mpInstance) {
        toast.error('O sistema de pagamento ainda não foi carregado. Tente novamente em instantes.');
        return;
    }

    setIsLoading(true);
    setPaymentStatus('processing');

    try {
        const orderItemsForMP = items.map(item => ({
            title: item.name,
            unit_price: parseFloat(item.price.toFixed(2)),
            quantity: item.quantity,
            currency_id: 'BRL',
            picture_url: item.imageUrl,
            description: item.description || item.name,
        }));

        if (deliveryFee && deliveryFee > 0) {
            orderItemsForMP.push({
                title: 'Taxa de Entrega',
                unit_price: parseFloat(deliveryFee.toFixed(2)),
                quantity: 1,
                currency_id: 'BRL',
                picture_url: '',
                description: 'Custo de entrega do pedido',
            });
        }
        
        // 1. Gerar Order ID (External Reference)
        const externalReference = generateUUID();
        setOrderId(externalReference); // Armazena no estado local

        // 2. Criar a preferência de pagamento no backend
        const response = await axios.post(`${BACKEND_URL}/api/create-payment`, {
            items: orderItemsForMP,
            payer: {
                name: payerName,
                email: payerEmail,
            },
            externalReference: externalReference, // Envia a referência externa
        });

        const preferenceId = response.data?.id;

        if (!preferenceId) {
            throw new Error('ID da preferência de pagamento não recebido.');
        }
        
        // 3. Armazenar o pedido no Supabase com status 'pending_payment'
        // Usamos '0' como paymentId temporário, pois o MP ainda não gerou um.
        await storeOrderDetails('0', 'mercadopago_checkout_pro', externalReference);


        // 4. Inicializar e abrir o modal de checkout
        const checkout = mpInstance.checkout({
            preference: { id: preferenceId },
            render: {
                container: 'body',
                label: 'Pagar com Mercado Pago',
            },
            theme: {
                elementsColor: '#FF7700',
            }
        });

        checkout.open();

        setIsLoading(false);

    } catch (error) {
        console.error('Erro ao iniciar pagamento com Mercado Pago Checkout Pro Modal:', error);
        toast.error('Ocorreu um erro ao iniciar o pagamento. Tente novamente.');
        setPaymentStatus('failed');
        setIsLoading(false);
    }
  };

  // Se o pagamento foi um sucesso (após retorno do MP)
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <CheckCircle2 className="w-24 h-24 mx-auto text-accent mb-6" />
            <h2 className="text-3xl font-bold mb-4">Pedido Realizado com Sucesso!</h2>
            <p className="text-muted-foreground mb-8">
              Agradecemos a sua compra. Seu pedido está sendo preparado!
            </p>
            <Link to="/">
              <Button variant="hero" size="lg">
                Voltar para o Início
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!deliveryDetails || deliveryFee === undefined || deliveryFee === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <Loader2 className="w-24 h-24 mx-auto text-primary animate-spin mb-6" />
            <h2 className="text-3xl font-bold mb-4">Carregando detalhes do pedido...</h2>
            <p className="text-muted-foreground mb-8">
              Se o carregamento demorar, por favor, retorne ao carrinho.
            </p>
            <Button onClick={() => navigate('/carrinho')} variant="hero" size="lg">
              Voltar para o Carrinho
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isPayerDetailsMissing = !payerName.trim() || !payerEmail.trim();
  const isCheckoutButtonDisabled = items.length === 0 || isPayerDetailsMissing || isLoading || !isStoreOpen || !isMpInitialized;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Finalizar Pedido</h1>
            <p className="text-xl opacity-90">Confirme seus dados e escolha a forma de pagamento</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Resumo do Pedido */}
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Seu Pedido</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.quantity} x R$ {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="font-bold">R$ {(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 mt-4 space-y-2">
                {deliveryFee !== null && (
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Frete:</span>
                    <span className="font-medium text-accent">R$ {deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Endereço de Entrega (apenas exibição) */}
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Endereço de Entrega
              </h2>
              <p className="text-lg text-muted-foreground">
                {constructFullAddress(deliveryDetails)}
              </p>
              <Button variant="link" className="pl-0 mt-2" onClick={() => navigate('/carrinho')}>
                Alterar Endereço
              </Button>
            </div>

            {/* Dados do Pagador */}
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Dados do Pagador
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payerName">Nome Completo *</Label>
                  <Input
                    id="payerName"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="payerEmail">E-mail *</Label>
                  <Input
                    id="payerEmail"
                    type="email"
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Forma de Pagamento</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: 'mercadopago') => {
                  setPaymentMethod(value);
                  setIsLoading(false);
                }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="mercadopago" id="payment-mercadopago" />
                  <Label htmlFor="payment-mercadopago" className="flex items-center gap-2 text-lg font-medium cursor-pointer">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    Mercado Pago (Cartão de Crédito/Débito e PIX)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Total e Botão Finalizar */}
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">R$ {totalPrice.toFixed(2)}</span>
                </div>
                {deliveryFee !== null && (
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Frete:</span>
                    <span className="font-medium text-accent">R$ {deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between text-2xl font-bold">
                  <span>Total a Pagar:</span>
                  <span className="text-primary">R$ {totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>

              {!isStoreOpen && (
                <div className="flex items-center justify-center p-4 mb-4 bg-destructive/10 border border-destructive rounded-lg text-destructive font-medium">
                  <Clock className="w-5 h-5 mr-2" />
                  A loja está fechada no momento.
                </div>
              )}
              
              {!isMpInitialized && (
                <div className="flex items-center justify-center p-4 mb-4 bg-yellow-100 border border-yellow-500 rounded-lg text-yellow-700 font-medium">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Carregando sistema de pagamento...
                </div>
              )}

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleCheckoutProPayment}
                disabled={isCheckoutButtonDisabled}
              >
                {isStatusLoading || isLoading ? (
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                ) : isCheckoutButtonDisabled && !isStoreOpen ? (
                  'Loja Fechada'
                ) : (
                  'Finalizar Pedido'
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
