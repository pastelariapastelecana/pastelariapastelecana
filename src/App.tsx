import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { StoreStatusProvider } from "@/contexts/StoreStatusContext";
import { useMercadoPago } from "@/hooks/use-mercado-pago"; // Importar o novo hook
import Index from "./pages/Index";
import Cardapio from "./pages/Cardapio";
import CoffeeBreak from "./pages/CoffeeBreak";
import Contato from "./pages/Contato";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import Feedback from "./pages/Feedback";
import Registration from "./pages/Registration";
import NossaLoja from "./pages/NossaLoja";
import NotFound from "./pages/NotFound";
import StoreStatusAdmin from "./pages/admin/StoreStatusAdmin";
import Login from "./pages/admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

// Componente wrapper para inicializar o Mercado Pago
const AppWrapper = () => {
  useMercadoPago(); // Inicializa o SDK globalmente
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/coffee-break" element={<CoffeeBreak />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/cadastro" element={<Registration />} />
        <Route path="/nossa-loja" element={<NossaLoja />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Rotas de Administração */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute redirectPath="/admin/login" />}>
          <Route path="/admin/status" element={<StoreStatusAdmin />} />
        </Route>

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreStatusProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppWrapper />
        </TooltipProvider>
      </CartProvider>
    </StoreStatusProvider>
  </QueryClientProvider>
);

export default App;
