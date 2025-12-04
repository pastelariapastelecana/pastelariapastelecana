"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import axios from 'axios';

// O SDK do Mercado Pago deve ser carregado globalmente
declare global {
  interface Window {
    MercadoPago: any;
    cardPaymentBrickController: any;
  }
}

interface CardPaymentBrickProps {
  totalAmount: number;
  payerEmail: string;
  payerName: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: any) => void;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
const MERCADOPAGO_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

const CardPaymentBrick: React.FC<CardPaymentBrickProps> = ({
  totalAmount,
  payerEmail,
  payerName,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isBrickReady, setIsBrickReady] = useState(false);
  const { clearCart } = useCart();

  const loadMercadoPagoSDK = useCallback(() => {
    if (window.MercadoPago || !MERCADOPAGO_PUBLIC_KEY) {
      setSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      setSdkLoaded(true);
    };
    script.onerror = () => {
      toast.error('Falha ao carregar o SDK do Mercado Pago.');
      onPaymentError(new Error('SDK Load Failed'));
    };
    document.head.appendChild(script);
  }, [onPaymentError]);

  useEffect(() => {
    loadMercadoPagoSDK();
  }, [loadMercadoPagoSDK]);

  useEffect(() => {
    if (sdkLoaded && containerRef.current && totalAmount > 0 && MERCADOPAGO_PUBLIC_KEY) {
      const mp = new window.MercadoPago(MERCADOPAGO_PUBLIC_KEY, {
        locale: 'pt-BR',
      });

      const renderBrick = async (bricksBuilder: any) => {
        const externalReference = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        const settings = {
          initialization: {
            amount: parseFloat(totalAmount.toFixed(2)),
            payer: {
                email: payerEmail,
            },
          },
          customization: {
            visual: {
                hidePaymentButton: true, // Ocultamos o botão padrão para usar o nosso
            },
            paymentMethods: {
                creditCard: 'all',
                debitCard: 'all',
            }
          },
          callbacks: {
            onReady: () => {
              setIsBrickReady(true);
            },
            onSubmit: async (formData: any) => {
              // Callback chamado ao submeter o formulário (usaremos o controller para chamar)
              const submitData = {
                transaction_amount: parseFloat(totalAmount.toFixed(2)),
                token: formData.token,
                description: 'Pagamento do pedido na Pastelaria Pastel & Cana',
                installments: formData.installments,
                payment_method_id: formData.payment_method_id,
                issuer_id: formData.issuer_id,
                payer: {
                    email: payerEmail,
                    first_name: payerName.split(' ')[0] || 'Cliente',
                    last_name: payerName.split(' ').slice(1).join(' ') || 'Online',
                    identification: formData.payer.identification, // CPF/CNPJ
                },
                externalReference: externalReference,
              };

              try {
                const response = await axios.post(`${BACKEND_URL}/api/process-card-payment`, submitData);
                
                if (response.data.status === 'approved' || response.data.status === 'in_process') {
                    onPaymentSuccess(response.data.paymentId);
                } else {
                    onPaymentError(response.data);
                }
                
              } catch (error) {
                console.error('Erro ao processar pagamento com cartão:', error);
                onPaymentError(error);
              }
            },
            onError: (error: any) => {
              console.error('Erro do Brick:', error);
              onPaymentError(error);
            },
          },
        };

        try {
          window.cardPaymentBrickController = await bricksBuilder.create(
            'cardPayment',
            containerRef.current!,
            settings
          );
        } catch (error) {
          console.error('Erro ao renderizar o Brick:', error);
          onPaymentError(error);
        }
      };

      mp.bricks().then(renderBrick);
    }
  }, [sdkLoaded, totalAmount, payerEmail, payerName, onPaymentSuccess, onPaymentError, clearCart]);

  if (!MERCADOPAGO_PUBLIC_KEY) {
    return <div className="text-red-500 p-4 border border-red-500 rounded-lg">Erro: VITE_MERCADOPAGO_PUBLIC_KEY não configurada no frontend.</div>;
  }

  if (!sdkLoaded || totalAmount <= 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Carregando formulário de pagamento...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div ref={containerRef} id="cardPaymentBrick_container" />
      {!isBrickReady && (
        <div className="absolute inset-0 bg-card/80 flex items-center justify-center rounded-lg">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Preparando formulário...</p>
        </div>
      )}
    </div>
  );
};

export default CardPaymentBrick;
