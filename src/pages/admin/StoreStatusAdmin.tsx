import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Store, LogOut } from 'lucide-react';
import { useStoreStatus } from '@/contexts/StoreStatusContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const StoreStatusAdmin = () => {
  const { isStoreOpen, isLoadingStatus, updateStoreStatus } = useStoreStatus();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const handleToggle = async (checked: boolean) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await updateStoreStatus(checked);
    } catch (error) {
      // O erro já é tratado e exibido no toast dentro do contexto, mas garantimos que o estado volte
      console.error('Falha ao alternar status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Erro ao fazer logout.');
    } else {
      toast.info('Logout realizado com sucesso.');
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Store className="w-7 h-7 text-primary" />
                Painel de Status da Loja
              </h1>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>

            {isLoadingStatus ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="ml-3 text-lg text-muted-foreground">Carregando status atual...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                  <Label htmlFor="store-status-toggle" className="text-xl font-medium">
                    Status da Loja:
                  </Label>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl font-bold ${isStoreOpen ? 'text-accent' : 'text-destructive'}`}>
                      {isStoreOpen ? 'ABERTA' : 'FECHADA'}
                    </span>
                    <Switch
                      id="store-status-toggle"
                      checked={isStoreOpen}
                      onCheckedChange={handleToggle}
                      disabled={isUpdating}
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Ao fechar a loja, os clientes verão um aviso de que não estamos aceitando pedidos online no momento.
                </p>
                
                {isUpdating && (
                  <p className="text-sm text-primary flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Atualizando status...
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StoreStatusAdmin;