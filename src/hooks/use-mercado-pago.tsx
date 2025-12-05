import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define a interface global para o objeto MercadoPago
declare global {
  interface Window {
    MercadoPago: {
      initMercadoPago: (publicKey: string, options?: { locale: string }) => void;
    };
  }
}

const PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

export const useMercadoPago = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!PUBLIC_KEY) {
      console.error('VITE_MERCADOPAGO_PUBLIC_KEY não está configurada no .env do frontend.');
      toast.error('Chave pública do Mercado Pago ausente.');
      return;
    }

    // Verifica se o SDK global foi carregado
    if (window.MercadoPago && window.MercadoPago.initMercadoPago) {
      try {
        window.MercadoPago.initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
        setIsInitialized(true);
      } catch (error) {
        console.error('Erro ao inicializar Mercado Pago SDK (global):', error);
        toast.error('Falha ao inicializar o sistema de pagamento.');
      }
    } else {
      // Se não estiver carregado imediatamente, espera um pouco (pode ser necessário em alguns navegadores)
      const checkInterval = setInterval(() => {
        if (window.MercadoPago && window.MercadoPago.initMercadoPago) {
          clearInterval(checkInterval);
          try {
            window.MercadoPago.initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
            setIsInitialized(true);
          } catch (error) {
            console.error('Erro ao inicializar Mercado Pago SDK (global, interval):', error);
            toast.error('Falha ao inicializar o sistema de pagamento.');
          }
        }
      }, 100);

      // Limpa o intervalo após um tempo limite para evitar vazamento de memória
      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        if (!isInitialized) {
          console.error('Mercado Pago SDK não carregou após o tempo limite.');
          // Não exibe toast aqui, pois pode ser um falso positivo, mas mantém o estado como não inicializado.
        }
      }, 5000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, [isInitialized]);

  return { isInitialized };
};
