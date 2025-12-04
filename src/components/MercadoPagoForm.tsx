"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { initMercadoPago, CardPaymentBrick } from '@mercadopago/sdk-js';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

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

    try {
      initMercadoPago(MERCADOPAGO_PUBLIC_KEY, { locale: 'pt-BR' });
      setSdkReady(true);
    } catch (error) {
      console.error('Erro ao inicializar Mercado Pago SDK:', error);
      toast.error('Falha ao carregar o sistema de pagamento.');
    }
  }, []);

  const renderBrick = useCallback(async () => {
    if (!sdkReady) return;

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
            theme: 'bootstrap', // Estilo simples
          },
        },
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          maxInstallments: 1, // Limitar a 1 parcela para simplificar o fluxo de delivery
        },
      },
      callbacks: {
        onReady: () => {
          console.log('Brick de pagamento pronto.');
        },
        onSubmit: (cardFormData: any) => {
          setIsLoading(true);
          // O Brick já tokenizou o cartão e forneceu os dados necessários
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
      const bricks = (window as any).MercadoPago.bricks();
      const cardPaymentBrick = new CardPaymentBrick(settings);
      await cardPaymentBrick.render(brickContainerId);
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

      if (!response.ok || data.status !== 'approved') {
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
      {/* O botão de submissão é gerado pelo próprio Brick */}
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
