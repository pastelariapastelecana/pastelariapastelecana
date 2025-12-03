"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PixPaymentDetailsProps {
  qrCodeImage: string;
  pixCopyPaste: string;
  onConfirmPayment: () => void;
  isLoading: boolean;
}

const PixPaymentDetails: React.FC<PixPaymentDetailsProps> = ({
  qrCodeImage,
  pixCopyPaste,
  onConfirmPayment,
  isLoading,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCopyPaste);
    setCopied(true);
    toast.success('Código PIX copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-center">
      <h2 className="text-2xl font-bold mb-6">Pague com PIX</h2>
      <p className="text-muted-foreground mb-4">Escaneie o QR Code ou copie o código abaixo para pagar.</p>

      <div className="flex justify-center mb-6">
        <img src={qrCodeImage} alt="QR Code PIX" className="w-64 h-64 border rounded-lg p-2 bg-white" />
      </div>

      <div className="mb-6">
        <Label htmlFor="pix-code" className="sr-only">Código PIX Copia e Cola</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="pix-code"
            value={pixCopyPaste}
            readOnly
            className="flex-1 font-mono text-sm bg-muted"
          />
          <Button onClick={handleCopy} variant="outline" size="icon">
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Após realizar o pagamento no seu banco, clique em "Confirmar Pagamento".
      </p>

      <Button
        variant="hero"
        size="lg"
        className="w-full"
        onClick={onConfirmPayment}
        disabled={isLoading}
      >
        {isLoading ? 'Confirmando...' : 'Confirmar Pagamento PIX'}
      </Button>
    </div>
  );
};

export default PixPaymentDetails;