"use client";

import React, { useState, useEffect, useCallback } from 'react';
// Importamos o SDK, mas as funções são acessadas via window.MercadoPago
import '@mercadopago/sdk-js'; 
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

// Adicionar tipo para a propriedade global MercadoPago
declare global {
  interface Window {
    MercadoPago: any;
  }
}

// O Mercado Pago SDK requer a chave pública (public key)
const MERCADOPAGO_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

interface MercadoPagoFormProps {
  totalAmount: number;
  payerEmail: string;
  payerName: string;
  externalReference: string;
  onPaymentSuccess: (paymentId: string, paymentMethod: string) => void;
  onPaymentError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const MercadoPagoForm: React.FC<MercadoPagoFormProps> = ({
  totalAmount,
  payerEmail,
  payerName,
  externalReference,
  onPaymentSuccess,
  onPaymentError,
  isLoading,
  setIsLoading,
}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const [brickContainerId] = useState('cardPaymentBrick_container');

  useEffect(() => {
    if (!MERCADOPAGO_PUBLIC_KEY) {
      toast.error('Chave pública do Mercado Pago (VITE_MERCADOPAGO_PUBLIC_KEY) não configurada.');
      return;
    }

    // Verifica se o SDK já está carregado (via import '@mercadopago/sdk-js')
    if (window.MercadoPago && window.MercadoPago.bricks) {
        try {
            window.MercadoPago.init(MERCADOPAGO_PUBLIC_KEY, { locale: 'pt-BR' });
            setSdkReady(true);
        } catch (error) {
            console.error('Erro ao inicializar Mercado Pago SDK:', error);
            toast.error('Falha ao carregar o sistema de pagamento.');
        }
    } else {
        // Se não estiver carregado, pode haver um problema com o import ou o ambiente.
        console.error('MercadoPago global object not found after import.');
        toast.error('Falha crítica ao carregar o SDK do Mercado Pago.');
    }
  }, []);

  const renderBrick = useCallback(async () => {
    if (!sdkReady || !window.MercadoPago || !window.MercadoPago.bricks) return;

    const bricks = window.MercadoPago.bricks();
    const CardPaymentBrick = bricks.getBrick('cardPayment');

    const settings = {
      initialization: {
        amount: totalAmount,
        payer: {
          email: payerEmail,
        },
      },
      customization: {
        visual: {
          style: {
            theme: 'bootstrap',
          },
        },
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          maxInstallments: 1,
        },
      },
      callbacks: {
        onReady: () => {
          console.log('Brick de pagamento pronto.');
        },
        onSubmit: (cardFormData: any) => {
          setIsLoading(true);
          return handleCardPayment(cardFormData);
        },
        onError: (error: any) => {
          console.error('Erro no Brick de pagamento:', error);
          onPaymentError('Erro ao processar o cartão. Verifique os dados.');
          setIsLoading(false);
        },
      },
    };

    try {
      // Se o Brick já existe, ele pode ser renderizado novamente
      await CardPaymentBrick.render(brickContainerId, settings);
    } catch (error) {
      console.error('Erro ao renderizar o Brick:', error);
      onPaymentError('Erro ao carregar o formulário de cartão.');
    }
  }, [sdkReady, totalAmount, payerEmail, externalReference, onPaymentSuccess, onPaymentError, setIsLoading, brickContainerId]);

  useEffect(() => {
    if (sdkReady && totalAmount > 0 && payerEmail) {
      renderBrick();
    }
  }, [sdkReady, totalAmount, payerEmail, renderBrick]);

  const handleCardPayment = async (cardFormData: any) => {
    const paymentData = {
      token: cardFormData.token,
      issuer_id: cardFormData.issuer_id,
      payment_method_id: cardFormData.payment_method_id,
      transaction_amount: totalAmount,
      installments: cardFormData.installments,
      payer: {
        email: payerEmail,
        identification: cardFormData.identification,
      },
      externalReference: externalReference,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/process-card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok || (data.status !== 'approved' && data.status !== 'in_process')) {
        const errorMsg = data.details || data.error || 'Pagamento recusado ou erro desconhecido.';
        onPaymentError(errorMsg);
        return;
      }

      onPaymentSuccess(data.paymentId, 'card');
    } catch (error) {
      console.error('Erro na comunicação com o backend para cartão:', error);
      onPaymentError('Erro de comunicação ao processar o pagamento.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!sdkReady) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-3 text-lg text-muted-foreground">Carregando formulário de pagamento...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div id={brickContainerId} />
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
          <span className="text-primary">Processando pagamento...</span>
        </div>
      )}
    </div>
  );
};

export default MercadoPagoForm;
