import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
