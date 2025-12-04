import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useStoreStatus } from '@/contexts/StoreStatusContext';
import { ShoppingCart, Check, Circle } from 'lucide-react';
import { toast } from 'sonner';

const Cardapio = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const { isStoreOpen } = useStoreStatus(); // Get store status

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    if (categoria) {
      setSelectedCategory(categoria);
    }
  }, [searchParams]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    if (!isStoreOpen) {
      toast.error('A loja está fechada. Não é possível adicionar itens ao carrinho no momento.');
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    
    setAddedProducts(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);

    toast.success('Produto adicionado ao carrinho!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nosso Cardápio</h1>
            <p className="text-xl opacity-90">Temos mais de 40 tipos de pastéis</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {!isStoreOpen && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-lg flex items-center gap-3" role="alert">
              <Circle className="w-5 h-5 fill-red-500 text-white" />
              <p className="font-bold">Atenção: A loja está fechada.</p>
              <p className="text-sm">Você pode navegar, mas não é possível adicionar itens ao carrinho ou finalizar pedidos.</p>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-2xl p-6 shadow-md sticky top-24">
                <h2 className="font-bold text-lg mb-4">Categorias</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'hover:bg-muted'
                    }`}
                  >
                    Todos os Produtos
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'all' 
                    ? 'Todos os Produtos' 
                    : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {filteredProducts.length} produto(s) encontrado(s)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id}
                    className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          variant={addedProducts.has(product.id) ? "accent" : "default"}
                          size="sm"
                          className="transition-all"
                          disabled={!isStoreOpen} // Disable if closed
                        >
                          {addedProducts.has(product.id) ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Adicionado
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {isStoreOpen ? 'Adicionar' : 'Fechado'}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cardapio;