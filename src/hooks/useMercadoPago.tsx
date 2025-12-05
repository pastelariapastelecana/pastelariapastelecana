import { useState, useEffect } from 'react';
import { initMercadoPago, MercadoPagoInstance } from '@mercadopago/sdk-js';
import { toast } from 'sonner';

// A chave pública deve ser lida do .env do frontend
const PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

export function useMercadoPago() {
  const [mp, setMp] = useState<MercadoPagoInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!PUBLIC_KEY) {
      console.error('VITE_MERCADOPAGO_PUBLIC_KEY não está configurada no frontend.');
      toast.error('Erro de configuração: Chave pública do Mercado Pago ausente.');
      setIsLoading(false);
      return;
    }

    try {
      // Inicializa o SDK
      initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
      
      // O SDK é carregado globalmente, mas podemos obter a instância
      // A tipagem do SDK é um pouco complexa, mas o objeto global 'MercadoPago' deve estar disponível.
      // Para simplificar, vamos apenas verificar se a inicialização ocorreu.
      // Em um ambiente React, é comum usar o objeto global após a inicialização.
      // Vamos forçar a tipagem para evitar erros de compilação, assumindo que o initMercadoPago funciona.
      const mpInstance = (window as any).MercadoPago as MercadoPagoInstance;
      setMp(mpInstance);
      
    } catch (error) {
      console.error('Erro ao inicializar Mercado Pago SDK:', error);
      toast.error('Falha ao carregar o sistema de pagamento.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mp, isLoading };
}
