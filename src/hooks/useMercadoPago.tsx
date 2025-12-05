import { useState, useEffect } from 'react';
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

    const initializeMP = async () => {
      try {
        // Importação dinâmica para garantir que o módulo seja carregado corretamente
        const mpModule = await import('@mercadopago/sdk-js');
        
        // O SDK pode estar em 'default' ou diretamente no módulo, dependendo da configuração do bundler
        const initMercadoPago = mpModule.initMercadoPago || (mpModule.default as any)?.initMercadoPago;

        if (initMercadoPago) {
          initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
          setIsInitialized(true);
        } else {
          console.error('initMercadoPago não encontrado no módulo importado.');
          toast.error('Falha crítica ao carregar o sistema de pagamento (SDK).');
        }
      } catch (error) {
        console.error('Erro ao inicializar Mercado Pago SDK:', error);
        toast.error('Falha ao carregar o sistema de pagamento.');
      }
    };

    if (!isInitialized) {
      initializeMP();
    }
  }, [isInitialized]);

  return { isInitialized };
};
