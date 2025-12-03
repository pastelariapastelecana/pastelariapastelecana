import { ShoppingBag, MapPin, Calendar, CreditCard } from 'lucide-react';

const OrderSteps = () => {
  const steps = [
    {
      icon: ShoppingBag,
      title: 'Escolha o que deseja',
      description: 'Navegue pelo nosso cardápio e selecione seus favoritos',
    },
    {
      icon: MapPin,
      title: 'Informe seu endereço',
      description: 'Digite o endereço para entrega',
    },
    {
      icon: Calendar,
      title: 'Pague seu pedido',
      description: 'Selecione a forma de pagamento',
    },
    {
      icon: CreditCard,
      title: 'Receba o seu pedido',
      description: 'Finalize o pedido e aguarde a entrega',
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como Fazer Seu Pedido
          </h2>
          <p className="text-muted-foreground text-lg">
            Simples, rápido e seguro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] flex items-center justify-center shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center font-bold text-secondary-foreground shadow-md mx-auto left-0 right-0 ml-auto mr-6">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrderSteps;
