import { MapPin, Clock, Phone, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StoreInfo = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        {/* Award Banner - Removido */}
        {/*
        <div className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] rounded-2xl p-8 mb-12 text-center text-white shadow-xl">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            A melhor pastelaria 
          </h3>
          <p className="text-xl opacity-90">
            de Uberlândia-MG
          </p>
        </div>
        */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Store Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Nossa Loja</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Endereço</h3>
                  <p className="text-muted-foreground">
                    Av. Engenheiro Diniz, 2022<br />
                    Uberlândia - MG
                  </p>
                  <Button variant="link" className="pl-0 mt-2">
                    Ver no mapa 
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Horário de Funcionamento</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between max-w-xs">
                      <span>Segunda a Sexta:</span>
                      <span className="font-medium text-foreground">9h - 19h</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                      <span>Sábado:</span>
                      <span className="font-medium text-foreground">10h - 16h</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                      <span></span>
                      <span className="font-medium text-foreground"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Telefones</h3>
                  <div className="space-y-1">
                    <a href="tel:+5534988399588" className="block text-muted-foreground hover:text-primary transition-colors">
                      (34) 98839-9588
                    </a>
                    <a href="tel:+5531987654321" className="block text-muted-foreground hover:text-primary transition-colors">
                      (34) 98839-9588
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5017.795321984731!2d-48.2961800880889!3d-18.91348480738969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a444449a24d351%3A0x698b3fec2b0aab77!2sAv.%20Eng.%20Diniz%2C%202022%20-%20Martins%2C%20Uberl%C3%A2ndia%20-%20MG%2C%2038400-403!5e1!3m2!1spt-BR!2sbr!4v1760918951796!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Pastelaria Pastel & Cana"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreInfo;