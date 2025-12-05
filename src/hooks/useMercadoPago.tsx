import { useState, useEffect } from 'react';
import * as MP from '@mercadopago/sdk-js'; // Importa o módulo inteiro
import { toast } from 'sonner';

const PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

export const useMercadoPago = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!PUBLIC_KEY) {
      console.error('VITE_MERCADOPAGO_PUBLIC_KEY não está configurada no .env do frontend.');
      toast.error('Chave pública do Mercado Pago ausente.');
      return;
    }

    try {
      // Acessa a função initMercadoPago a partir do módulo importado
      if (MP.initMercadoPago) {
        MP.initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
        setIsInitialized(true);
      } else {
        console.error('initMercadoPago não encontrado no módulo MP.');
        toast.error('Falha ao carregar o sistema de pagamento (SDK).');
      }
    } catch (error) {
      console.error('Erro ao inicializar Mercado Pago SDK:', error);
      toast.error('Falha ao carregar o sistema de pagamento.');
    }
  }, []);

  return { isInitialized };
};
