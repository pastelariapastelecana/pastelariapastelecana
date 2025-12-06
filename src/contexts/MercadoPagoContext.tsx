import React, { createContext, useContext, useState, useEffect } from 'react';
import { initMercadoPago, MercadoPagoInstance } from '@mercadopago/sdk-react';
import { toast } from 'sonner';

interface MercadoPagoContextType {
  mpInstance: MercadoPagoInstance | null;
  isMpInitialized: boolean;
}

const MercadoPagoContext = createContext<MercadoPagoContextType | undefined>(undefined);

export const MercadoPagoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mpInstance, setMpInstance] = useState<MercadoPagoInstance | null>(null);
  const [isMpInitialized, setIsMpInitialized] = useState(false);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

    if (!publicKey) {
      console.error('VITE_MERCADOPAGO_PUBLIC_KEY não está configurada no frontend.');
      toast.error('Erro de configuração: Chave pública do Mercado Pago ausente.');
      return;
    }

    try {
      const instance = initMercadoPago(publicKey, {
        locale: 'pt-BR',
      });
      setMpInstance(instance);
      setIsMpInitialized(true);
      console.log('Mercado Pago SDK inicializado com sucesso.');
    } catch (error) {
      console.error('Erro ao inicializar Mercado Pago SDK:', error);
      toast.error('Falha ao carregar o sistema de pagamento.');
      setIsMpInitialized(false);
    }
  }, []);

  return (
    <MercadoPagoContext.Provider value={{ mpInstance, isMpInitialized }}>
      {children}
    </MercadoPagoContext.Provider>
  );
};

export const useMercadoPago = () => {
  const context = useContext(MercadoPagoContext);
  if (!context) {
    throw new Error('useMercadoPago must be used within a MercadoPagoProvider');
  }
  return context;
};
