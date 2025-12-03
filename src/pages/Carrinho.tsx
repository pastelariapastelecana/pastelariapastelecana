"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'; // Usar variável de ambiente

const Carrinho = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    zipCode: '',
  });
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [isCalculatingDelivery, setIsCalculatingDelivery] = useState(false);

  const totalWithDelivery = totalPrice + (deliveryFee || 0);

  // Redireciona se o carrinho estiver vazio
  useEffect(() => {
    if (items.length === 0 && window.location.pathname === '/carrinho') {
      // toast.info('Seu carrinho está vazio. Adicione itens para finalizar o pedido.');
      // navigate('/cardapio');
    }
  }, [items, navigate]);

  const constructFullAddress = (details: typeof deliveryDetails) => {
    const { address, number, neighborhood, city, zipCode } = details;
    // Retorna o endereço completo apenas se todos os campos essenciais estiverem preenchidos
    if (address && number && neighborhood && city && zipCode) {
      return `${address}, ${number}, ${neighborhood}, ${city} - ${zipCode}`;
    }
    return '';
  };

  const calculateDeliveryFee = async (details: typeof deliveryDetails) => {
    const fullAddress = constructFullAddress(details);
    if (!fullAddress) {
      setDeliveryFee(null);
      // toast.error('Por favor, preencha todos os campos do endereço para calcular o frete.'); // Removed to avoid spamming toast on partial input
      return;
    }
    console.log('[Frontend] Endereço completo enviado para cálculo de frete:', fullAddress);
    setIsCalculatingDelivery(true);
    try {
      const originAddress = import.meta.env.VITE_STORE_ADDRESS;
      console.log('[Frontend] VITE_STORE_ADDRESS lida no frontend:', originAddress);
      if (!originAddress) {
        toast.error('Endereço da loja não configurado. Por favor, defina VITE_STORE_ADDRESS no seu arquivo .env do frontend.');
        setDeliveryFee(null);
        return;
      }
      const response = await axios.post(`${BACKEND_URL}/api/delivery/calculate-fee`, {
        origin: originAddress,
        destination: fullAddress,
      });
      setDeliveryFee(response.data.deliveryFee);
      toast.success(`Taxa de entrega calculada: R$ ${response.data.deliveryFee.toFixed(2)}`);
    } catch (error) {
      console.error('[Frontend] Erro ao calcular taxa de entrega:', error);
      let errorMessage = 'Não foi possível calcular a taxa de entrega. Verifique o endereço.';
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.details) {
        errorMessage = `Erro no cálculo do frete: ${error.response.data.details}`;
      } else if (error instanceof Error) {
        errorMessage = `Erro no cálculo do frete: ${error.message}`;
      }
      toast.error(errorMessage);
      setDeliveryFee(null);
    } finally {
      setIsCalculatingDelivery(false);
    }
  };

  // Adicionar tipo para window para a propriedade customizada
  declare global {
    interface Window {
      deliveryFeeTimeout: ReturnType<typeof setTimeout> | undefined;
    }
  }

  const handleDeliveryDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => {
      const updatedDetails = { ...prev, [name]: value };
      const fullAddressProvided = updatedDetails.address && updatedDetails.number && updatedDetails.neighborhood && updatedDetails.city && updatedDetails.zipCode;
      
      if (fullAddressProvided) {
        if (window.deliveryFeeTimeout) {
          clearTimeout(window.deliveryFeeTimeout);
        }
        window.deliveryFeeTimeout = setTimeout(() => calculateDeliveryFee(updatedDetails), 1000);
      } else {
        setDeliveryFee(null);
        // Optionally, clear the timeout if fields become incomplete
        if (window.deliveryFeeTimeout) {
          clearTimeout(window.deliveryFeeTimeout);
          window.deliveryFeeTimeout = undefined;
        }
      }
      return updatedDetails;
    });
  };

  const isCheckoutButtonDisabled = items.length === 0 || isCalculatingDelivery || deliveryFee === null || !constructFullAddress(deliveryDetails);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meu Carrinho</h1>
            <p className="text-xl opacity-90">Revise seus itens e calcule o frete</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                <h2 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h2>
                <p className="text-muted-foreground mb-8">
                  Adicione produtos deliciosos ao seu carrinho!
                </p>
                <Link to="/cardapio">
                  <Button variant="hero" size="lg">
                    Ver Cardápio
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                  <div className="space-y-6">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4 pb-6 border-b last:border-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                          <p className="text-primary font-bold text-xl">
                            R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <div className="flex items-center gap-2 bg-muted rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Endereço de Entrega */}
                    <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-primary" />
                        Endereço de Entrega
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="address">Endereço *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={deliveryDetails.address}
                            onChange={handleDeliveryDetailChange}
                            placeholder="Rua, Avenida, etc."
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="number">Número *</Label>
                          <Input
                            id="number"
                            name="number"
                            value={deliveryDetails.number}
                            onChange={handleDeliveryDetailChange}
                            placeholder="123"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="neighborhood">Bairro *</Label>
                          <Input
                            id="neighborhood"
                            name="neighborhood"
                            value={deliveryDetails.neighborhood}
                            onChange={handleDeliveryDetailChange}
                            placeholder="Seu bairro"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">Cidade *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={deliveryDetails.city}
                            onChange={handleDeliveryDetailChange}
                            placeholder="Sua cidade"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="zipCode">CEP *</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={deliveryDetails.zipCode}
                            onChange={handleDeliveryDetailChange}
                            placeholder="00000-000"
                            required
                          />
                        </div>
                      </div>
                      {isCalculatingDelivery && (
                        <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1">
                          <Loader2 className="w-4 h-4 animate-spin" /> Calculando taxa de entrega...
                        </p>
                      )}
                      {!isCalculatingDelivery && deliveryFee === null && constructFullAddress(deliveryDetails) && (
                        <p className="text-sm text-destructive mt-4">
                          Não foi possível calcular o frete. Verifique o endereço ou tente novamente.
                        </p>
                      )}
                    </div>

                    <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-lg">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="font-medium">R$ {totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span className="text-muted-foreground">Frete:</span>
                          <span className="font-medium text-accent">
                            {deliveryFee !== null ? `R$ ${deliveryFee.toFixed(2)}` : 'Aguardando endereço'}
                          </span>
                        </div>
                        <div className="border-t pt-4 flex justify-between text-2xl font-bold">
                          <span>Total:</span>
                          <span className="text-primary">R$ {totalWithDelivery.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          variant="hero"
                          size="lg"
                          className="w-full"
                          onClick={() => navigate('/checkout', { state: { deliveryDetails, deliveryFee } })}
                          disabled={isCheckoutButtonDisabled}
                        >
                          {isCheckoutButtonDisabled ? 'Preencha o endereço e calcule o frete' : 'Finalizar Pedido'}
                        </Button>
                        <div className="flex gap-3">
                          <Link to="/cardapio" className="flex-1">
                            <Button variant="outline" size="lg" className="w-full">
                              Continuar Comprando
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="lg"
                            onClick={clearCart}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            Limpar Carrinho
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    };

    export default Carrinho;