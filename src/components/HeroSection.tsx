import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-pasteis.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            O Melhor Pastel de
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Uberlândia
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Temos mais de 40 tipos de pastéis, caldo de cana, refrigerantes, vitaminas e sucos naturais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/cardapio">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Ver Cardápio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/sobre">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-black hover:bg-white hover:text-red-500">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
