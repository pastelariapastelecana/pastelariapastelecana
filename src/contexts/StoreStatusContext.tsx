import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StoreStatusContextType {
  isStoreOpen: boolean;
  isLoadingStatus: boolean;
  updateStoreStatus: (isOpen: boolean) => Promise<void>;
}

const StoreStatusContext = createContext<StoreStatusContextType | undefined>(undefined);

export const StoreStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  const STORE_STATUS_ID = 1;

  const fetchStoreStatus = useCallback(async () => {
    setIsLoadingStatus(true);
    try {
      const { data, error } = await supabase
        .from('store_status')
        .select('is_open')
        .eq('id', STORE_STATUS_ID)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = No rows found (ignorar se a tabela estiver vazia, embora tenhamos inserido a linha 1)
        console.error('Erro ao buscar status da loja:', error);
        // Se houver erro, assume que está aberto para não bloquear o app
        setIsStoreOpen(true); 
        toast.error('Erro ao carregar status da loja. Assumindo que está aberta.');
      } else if (data) {
        setIsStoreOpen(data.is_open);
      }
    } catch (e) {
      console.error('Erro inesperado ao buscar status da loja:', e);
      setIsStoreOpen(true);
    } finally {
      setIsLoadingStatus(false);
    }
  }, []);

  const updateStoreStatus = useCallback(async (isOpen: boolean) => {
    try {
      const { error } = await supabase
        .from('store_status')
        .update({ is_open: isOpen })
        .eq('id', STORE_STATUS_ID);

      if (error) {
        console.error('Erro Supabase ao atualizar status:', error);
        throw new Error(`Falha ao atualizar status da loja no banco de dados. Detalhes: ${error.message}`);
      }

      setIsStoreOpen(isOpen);
      toast.success(`Loja ${isOpen ? 'aberta' : 'fechada'} com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error(error instanceof Error ? error.message : 'Erro desconhecido ao atualizar status.');
      throw error; // Re-throw para que o componente Admin possa lidar com o estado de loading/erro
    }
  }, []);

  useEffect(() => {
    fetchStoreStatus();

    // Opcional: Assinar mudanças em tempo real
    const channel = supabase
      .channel('store_status_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'store_status', filter: `id=eq.${STORE_STATUS_ID}` },
        (payload) => {
          if (payload.new) {
            setIsStoreOpen(payload.new.is_open);
            toast.info(`Status da loja atualizado remotamente para: ${payload.new.is_open ? 'ABERTA' : 'FECHADA'}`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStoreStatus]);

  return (
    <StoreStatusContext.Provider value={{ isStoreOpen, isLoadingStatus, updateStoreStatus }}>
      {children}
    </StoreStatusContext.Provider>
  );
};

export const useStoreStatus = () => {
  const context = useContext(StoreStatusContext);
  if (!context) {
    throw new Error('useStoreStatus must be used within a StoreStatusProvider');
  }
  return context;
};