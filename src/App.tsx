import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { StoreStatusProvider } from "@/contexts/StoreStatusContext";
import { MercadoPagoProvider } from "@/contexts/MercadoPagoContext"; // Importar o novo Provider
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreStatusProvider>
      <MercadoPagoProvider> {/* Novo Provider */}
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cardapio" element={<Cardapio />} />
                <Route path="/coffee-break" element={<CoffeeBreak />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/contato" element={<Contato />} />
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
          </TooltipProvider>
        </CartProvider>
      </MercadoPagoProvider>
    </StoreStatusProvider>
  </QueryClientProvider>
);

export default App;
