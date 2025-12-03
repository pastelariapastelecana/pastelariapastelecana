import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const DeliveryApps = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Peça Também Pelos Apps
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Disponível nas principais plataformas de delivery
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto ">
            <a
              href="https://www.ifood.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-[#EA1D2C]">
                <div className="bg-[#EA1D2C] rounded-xl p-4 mb-4 inline-block">
                  <span className="text-white font-bold text-2xl">iFood</span>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-[#EA1D2C] group-hover:text-primary-foreground group-hover:border-[#EA1D2C]">
                  Pedir no iFood
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </a>

            <a
              href="https://wa.me/5534988399588"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-[#25d366]">
    <div className="bg-[#25d366] rounded-xl p-4 mb-4 inline-block">
        <span className="text-white font-bold text-2xl">WhatsApp</span>
    </div>
    <Button variant="outline" className="w-full group-hover:bg-[#25d366] group-hover:text-white group-hover:border-[#25d366]">
        WhatsApp
        <ExternalLink className="ml-2 w-4 h-4" />
    </Button>
</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryApps;
