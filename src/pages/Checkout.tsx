"use client";

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import PixPaymentDetails from '@/components/PixPaymentDetails';
import CardPaymentForm from '@/components/CardPaymentForm'; // Novo componente de cartão
import { useCart } from '@/contexts/CartContext';
import { useStoreStatus } from '@/contexts/StoreStatusContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, CreditCard, Loader2, CheckCircle2, User, Clock, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { generateUUID } from '@/lib/utils';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

interface PixData {
  qrCodeImage: string;
  pixCopyPaste: string;
  paymentId: string;
}

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isStoreOpen, isLoading: isStatusLoading } = useStoreStatus();
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

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'awaiting_pix' | 'success' | 'failed'>('idle');
  const [pixData, setPixData] = useState<PixData | null>(null);

  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');

  const totalWithDelivery = totalPrice + (deliveryFee || 0);

  // Redireciona se o carrinho estiver vazio ou detalhes de entrega ausentes
  useEffect(() => {
    if (items.length === 0 || !deliveryDetails || deliveryFee === undefined || deliveryFee === null) {
      if (window.location.pathname === '/checkout') {
        toast.info('Por favor, revise seu carrinho e endereço de entrega.');
        navigate('/carrinho');
      }
    }
  }, [items, navigate, deliveryDetails, deliveryFee]);

  const constructFullAddress = (details?: typeof deliveryDetails) => {
    if (!details) return '';
    const { address, number, neighborhood, city, zipCode } = details;
    return `${address}, ${number}, ${neighborhood}, ${city} - ${zipCode}`;
  };

  // Função para enviar os detalhes do pedido para o backend
  const sendOrderToBackend = useCallback(async (paymentId: string, paymentMethodUsed: string) => {
    if (!deliveryDetails || deliveryFee === null) {
        toast.error('Detalhes de entrega ou taxa de frete ausentes. Por favor, retorne ao carrinho.');
        return;
    }

    const orderDetails = {
        items: items,
        deliveryDetails: deliveryDetails,
        deliveryFee: deliveryFee,
        totalPrice: totalPrice,
        totalWithDelivery: totalWithDelivery,
        paymentMethod: paymentMethodUsed,
        payerName: payerName,
        payerEmail: payerEmail,
        paymentId: paymentId,
        orderDate: new Date().toISOString(),
        orderId: generateUUID(),
    };

    try {
        await axios.post(`${BACKEND_URL}/api/confirm-order`, orderDetails);
        toast.success('Pedido confirmado e notificação enviada!');
        setPaymentStatus('success');
        clearCart();
    } catch (error) {
        console.error('Erro ao confirmar pedido no backend:', error);
        toast.error('Ocorreu um erro ao finalizar seu pedido. Por favor, entre em contato.');
        setPaymentStatus('failed');
    }
  }, [items, deliveryDetails, deliveryFee, totalPrice, totalWithDelivery, payerName, payerEmail, clearCart]);

  // --- Lógica PIX ---
  const handlePixGeneration = async () => {
    if (!isStoreOpen) {
        toast.error('A loja está fechada no momento. Não é possível processar o pagamento.');
        return;
    }
    
    if (!deliveryDetails || deliveryFee === null || !payerName.trim() || !payerEmail.trim()) {
        toast.error('Por favor, preencha todos os dados do pagador e de entrega.');
        return;
    }

    setIsLoading(true);
    setPaymentStatus('processing');

    try {
        const response = await axios.post(`${BACKEND_URL}/api/generate-pix`, {
            amount: totalWithDelivery,
            description: `Pedido Pastel & Cana - R$ ${totalWithDelivery.toFixed(2)}`,
            payerEmail: payerEmail,
            payerName: payerName,
        });

        if (response.data && response.data.qrCodeImage && response.data.pixCopyPaste) {
            setPixData({
                qrCodeImage: response.data.qrCodeImage,
                pixCopyPaste: response.data.pixCopyPaste,
                paymentId: response.data.id,
            });
            setPaymentStatus('awaiting_pix');
            toast.info('PIX gerado com sucesso. Aguardando pagamento.');
        } else {
            throw new Error('Dados do PIX incompletos na resposta do backend.');
        }
    } catch (error) {
        console.error('Erro ao gerar PIX:', error);
        toast.error('Ocorreu um erro ao gerar o PIX. Tente novamente.');
        setPaymentStatus('failed');
    } finally {
        setIsLoading(false);
    }
  };

  const handlePixConfirmation = async () => {
    if (!pixData) return;

    setIsLoading(true);
    setPaymentStatus('processing');

    try {
        // Assumimos que o usuário pagou e confirmamos o pedido.
        await sendOrderToBackend(pixData.paymentId, 'pix'); 
    } catch (error) {
        // Se falhar, o status é 'failed'
    } finally {
        setIsLoading(false);
    }
  };

  // --- Lógica Cartão ---
  const handleCardPaymentSuccess = (paymentId: string) => {
    // O pagamento foi aprovado/em processo pelo Mercado Pago. Agora confirmamos o pedido.
    sendOrderToBackend(paymentId, 'card');
  };

  const handleCardPaymentFailure = (message: string) => {
    toast.error(`Falha no pagamento: ${message}`);
    setPaymentStatus('failed');
  };

  // Se o pagamento foi um sucesso
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
  const isCheckoutButtonDisabled = items.length === 0 || isPayerDetailsMissing || isLoading || !isStoreOpen;

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
            
            {/* Se o PIX foi gerado, mostra os detalhes do pagamento */}
            {paymentStatus === 'awaiting_pix' && pixData ? (
                <PixPaymentDetails
                    qrCodeImage={pixData.qrCodeImage}
                    pixCopyPaste={pixData.pixCopyPaste}
                    onConfirmPayment={handlePixConfirmation}
                    isLoading={isLoading}
                />
            ) : (
                <>
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
                            onValueChange={(value: 'pix' | 'card') => {
                                setPaymentMethod(value);
                                setPixData(null); // Limpa dados PIX se mudar para cartão
                                setPaymentStatus('idle');
                            }}
                            className="space-y-4"
                        >
                            <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                <RadioGroupItem value="pix" id="payment-pix" />
                                <Label htmlFor="payment-pix" className="flex items-center gap-2 text-lg font-medium cursor-pointer">
                                    <QrCode className="w-6 h-6 text-green-600" />
                                    PIX (Pagamento Instantâneo)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                <RadioGroupItem value="card" id="payment-card" />
                                <Label htmlFor="payment-card" className="flex items-center gap-2 text-lg font-medium cursor-pointer">
                                    <CreditCard className="w-6 h-6 text-blue-600" />
                                    Cartão de Crédito/Débito
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Formulário de Pagamento Condicional */}
                    {paymentMethod === 'card' && (
                        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-blue-200">
                            <h3 className="text-xl font-bold mb-4">Detalhes do Cartão</h3>
                            <CardPaymentForm
                                amount={totalWithDelivery}
                                payerName={payerName}
                                payerEmail={payerEmail}
                                onPaymentSuccess={handleCardPaymentSuccess}
                                onPaymentFailure={handleCardPaymentFailure}
                            />
                        </div>
                    )}

                    {/* Total e Botão Finalizar (Apenas para PIX) */}
                    {paymentMethod === 'pix' && (
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

                            <Button
                                variant="hero"
                                size="lg"
                                className="w-full"
                                onClick={handlePixGeneration}
                                disabled={isCheckoutButtonDisabled}
                            >
                                {isStatusLoading || isLoading ? (
                                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                ) : isCheckoutButtonDisabled && !isStoreOpen ? (
                                'Loja Fechada'
                                ) : (
                                'Gerar PIX e Finalizar Pedido'
                                )}
                            </Button>
                        </div>
                    )}
                </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
