"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useMercadoPago } from '@/hooks/useMercadoPago';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

interface CardPaymentFormProps {
  amount: number;
  payerName: string;
  payerEmail: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentFailure: (message: string) => void;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  amount,
  payerName,
  payerEmail,
  onPaymentSuccess,
  onPaymentFailure,
}) => {
  const { mp, isLoading: isMpLoading } = useMercadoPago();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    securityCode: '',
    docType: 'CPF',
    docNumber: '',
  });
  const [installments, setInstallments] = useState('1');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [availableInstallments, setAvailableInstallments] = useState<number[]>([]);

  // 1. Obter o Payment Method ID e as parcelas
  useEffect(() => {
    if (mp && formData.cardNumber.length >= 6) {
      const bin = formData.cardNumber.substring(0, 6);
      mp.getPaymentMethods({ bin })
        .then((response: any) => {
          if (response.results && response.results.length > 0) {
            const method = response.results[0];
            setPaymentMethodId(method.id);
            
            // Busca as parcelas
            mp.getInstallments({
                amount: amount,
                bin: bin,
                payment_method_id: method.id,
            }).then((installmentsResponse: any) => {
                if (installmentsResponse.length > 0 && installmentsResponse[0].payer_costs) {
                    const costs = installmentsResponse[0].payer_costs.map((cost: any) => cost.installments);
                    setAvailableInstallments(costs);
                    setInstallments('1'); // Reseta para 1 parcela
                } else {
                    setAvailableInstallments([1]);
                }
            }).catch(() => {
                setAvailableInstallments([1]);
            });

          } else {
            setPaymentMethodId('');
            setAvailableInstallments([]);
          }
        })
        .catch((error: any) => {
          console.error('Erro ao buscar método de pagamento:', error);
          setPaymentMethodId('');
          setAvailableInstallments([]);
        });
    } else if (formData.cardNumber.length < 6) {
        setPaymentMethodId('');
        setAvailableInstallments([]);
    }
  }, [mp, formData.cardNumber, amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mp || isMpLoading || isProcessing || !paymentMethodId) {
        toast.error('Sistema de pagamento não carregado ou dados incompletos.');
        return;
    }

    setIsProcessing(true);

    try {
      // 2. Tokenizar o Cartão
      const [month, year] = formData.expirationDate.split('/');
      
      const cardData = {
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        cardholderName: formData.cardholderName,
        cardExpirationMonth: month,
        cardExpirationYear: year,
        securityCode: formData.securityCode,
        identificationType: formData.docType,
        identificationNumber: formData.docNumber,
      };

      const tokenResponse = await mp.createCardToken({ cardData });
      const token = tokenResponse.id;

      if (!token) {
        throw new Error('Falha ao tokenizar o cartão.');
      }

      // 3. Enviar o Token para o Backend para criar o pagamento
      const backendResponse = await axios.post(`${BACKEND_URL}/api/process-card-payment`, {
        amount: amount,
        description: `Pagamento de pedido Pastel & Cana - R$ ${amount.toFixed(2)}`,
        token: token,
        installments: parseInt(installments),
        paymentMethodId: paymentMethodId,
        payerEmail: payerEmail,
        payerName: payerName,
      });

      const paymentStatus = backendResponse.data.status;
      const paymentId = backendResponse.data.id;

      if (paymentStatus === 'approved' || paymentStatus === 'in_process') {
        onPaymentSuccess(paymentId);
      } else {
        onPaymentFailure(`Pagamento ${paymentStatus}. Detalhe: ${backendResponse.data.status_detail}`);
      }

    } catch (error) {
      console.error('Erro no pagamento com cartão:', error);
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.details 
        ? error.response.data.details 
        : 'Erro desconhecido ao processar o cartão.';
      onPaymentFailure(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isMpLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-3 text-lg text-muted-foreground">Carregando formulário de pagamento...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cardNumber">Número do Cartão *</Label>
          <Input
            id="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength={19}
          />
        </div>
        <div>
          <Label htmlFor="cardholderName">Nome no Cartão *</Label>
          <Input
            id="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
            required
            placeholder="Nome Sobrenome"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="expirationDate">Vencimento (MM/AA) *</Label>
          <Input
            id="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
            placeholder="MM/AA"
            maxLength={5}
          />
        </div>
        <div>
          <Label htmlFor="securityCode">Cód. Segurança *</Label>
          <Input
            id="securityCode"
            value={formData.securityCode}
            onChange={handleChange}
            required
            placeholder="123"
            maxLength={4}
          />
        </div>
        <div>
          <Label htmlFor="installments">Parcelas *</Label>
          <Select value={installments} onValueChange={setInstallments} required>
            <SelectTrigger id="installments">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {availableInstallments.length > 0 ? (
                availableInstallments.map(num => (
                    <SelectItem key={num} value={String(num)}>
                        {num}x de R$ {(amount / num).toFixed(2)}
                    </SelectItem>
                ))
              ) : (
                <SelectItem value="1">1x de R$ {amount.toFixed(2)}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Label htmlFor="docType">Tipo Doc. *</Label>
          <Select value={formData.docType} onValueChange={(value) => setFormData(prev => ({ ...prev, docType: value }))} required>
            <SelectTrigger id="docType">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CPF">CPF</SelectItem>
              <SelectItem value="CNPJ">CNPJ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor="docNumber">Número do Documento *</Label>
          <Input
            id="docNumber"
            value={formData.docNumber}
            onChange={handleChange}
            required
            placeholder="000.000.000-00"
          />
        </div>
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isProcessing || !paymentMethodId}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando Pagamento...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Pagar R$ {amount.toFixed(2)}
          </>
        )}
      </Button>
      {!paymentMethodId && formData.cardNumber.length >= 6 && (
        <p className="text-sm text-destructive text-center">
            Não foi possível identificar o método de pagamento. Verifique o número do cartão.
        </p>
      )}
    </form>
  );
};

export default CardPaymentForm;
