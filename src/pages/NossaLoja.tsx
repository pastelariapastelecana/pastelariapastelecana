import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoreInfo from '@/components/StoreInfo';
import { MapPin } from 'lucide-react';

const NossaLoja = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossa Loja Física</h1>
            <p className="text-xl opacity-90">Venha nos visitar e saborear nossos produtos!</p>
          </div>
        </div>
        <StoreInfo />
      </main>
      <Footer />
    </div>
  );
};

export default NossaLoja;