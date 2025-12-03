import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import pasteisImg from '@/assets/category-pasteis.jpg';
import salgadosImg from '@/assets/category-salgados.jpg';
import sanduichesImg from '@/assets/category-sanduiches.jpg';
import docesImg from '@/assets/category-doces.jpg';
import tortasImg from '@/assets/category-tortas.jpg';
import bebidasImg from '@/assets/category-bebidas.jpg';

const CategoryGrid = () => {
  const categories = [
    { id: 'pasteis', name: 'Pastéis', image: pasteisImg },
    { id: 'salgados', name: 'Caldo de Cana', image: salgadosImg },
    { id: 'sanduiches', name: 'Refrigerantes', image: sanduichesImg },
    { id: 'doces', name: 'Sucos', image: docesImg },
    { id: 'tortas', name: 'Vitaminas', image: tortasImg },
    { id: 'bebidas', name: 'Adicionais', image: bebidasImg },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nosso Cardápio
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore nossas deliciosas categorias
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/cardapio?categoria=${category.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-64 bg-card">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Ver Mais
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/cardapio">
            <Button variant="hero" size="lg">
              Ver Cardápio Completo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
