import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Coffee, Users, Calendar, MapPin } from 'lucide-react';

const CoffeeBreak = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    address: '',
    guestCount: '',
    needsWaiter: 'no',
    materialType: 'descartavel',
    needsAccessories: 'no',
    additionalInfo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Orçamento enviado! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      address: '',
      guestCount: '',
      needsWaiter: 'no',
      materialType: 'descartavel',
      needsAccessories: 'no',
      additionalInfo: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Coffee className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Coffee Break para Empresas</h1>
            <p className="text-xl opacity-90">Torne seu evento especial com nossos serviços de buffet</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card rounded-2xl p-6 shadow-md text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-lg mb-2">Eventos Corporativos</h3>
                <p className="text-sm text-muted-foreground">Atendemos desde pequenas reuniões até grandes eventos</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-md text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-lg mb-2">Planejamento Completo</h3>
                <p className="text-sm text-muted-foreground">Cuidamos de todos os detalhes do seu coffee break</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-md text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-lg mb-2">Entrega no Local</h3>
                <p className="text-sm text-muted-foreground">Montamos e entregamos onde você precisar</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Solicite um Orçamento</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(31) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDate">Data do Evento *</Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Endereço do Evento *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Rua, número, bairro, cidade"
                  />
                </div>

                <div>
                  <Label htmlFor="guestCount">Número de Convidados *</Label>
                  <Input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    value={formData.guestCount}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 50"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Necessita de garçom? *</Label>
                  <RadioGroup
                    value={formData.needsWaiter}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, needsWaiter: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="waiter-yes" />
                      <Label htmlFor="waiter-yes" className="font-normal">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="waiter-no" />
                      <Label htmlFor="waiter-no" className="font-normal">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Tipo de Material *</Label>
                  <RadioGroup
                    value={formData.materialType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, materialType: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="descartavel" id="mat-desc" />
                      <Label htmlFor="mat-desc" className="font-normal">Descartável</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reutilizavel" id="mat-reut" />
                      <Label htmlFor="mat-reut" className="font-normal">Reutilizável</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Necessita de aparadores e toalha? *</Label>
                  <RadioGroup
                    value={formData.needsAccessories}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, needsAccessories: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="acc-yes" />
                      <Label htmlFor="acc-yes" className="font-normal">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="acc-no" />
                      <Label htmlFor="acc-no" className="font-normal">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Informações Adicionais</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Nos conte mais sobre seu evento..."
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Solicitar Orçamento
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoffeeBreak;
