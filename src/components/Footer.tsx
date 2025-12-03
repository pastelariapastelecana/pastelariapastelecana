import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Pastelaria Pastel & Cana</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A melhor pastelaria de Uberlândia e região. Sabor e tradição em cada mordida.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/pastelariapastelecana/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/cardapio" className="text-muted-foreground hover:text-primary transition-colors">
                  Cardápio
                </Link>
              </li>
              <li>
                <Link to="/nossa-loja" className="text-muted-foreground hover:text-primary transition-colors">
                  Loja Física
                </Link>
              </li>
              <li>
                <Link to="/cadastro" className="text-muted-foreground hover:text-primary transition-colors">
                  Cadastro
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Av. Engenheiro Diniz, 2022<br />Uberlândia - MG</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+5534988399588" className="hover:text-primary transition-colors">
                  (34) 98839-9588
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <a href="tel:+5531987654321" className="block text-muted-foreground hover:text-primary transition-colors">
                      (34) 98839-9588
                    </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contato@pastelariamarilia.com.br" className="hover:text-primary transition-colors">
                  contato@pastelaripastelecana.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Segunda a Sexta:</span>
                <span className="font-medium">9h - 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado:</span>
                <span className="font-medium">10h - 16h</span>
              </li>
              <li className="flex justify-between">
                <span></span>
                <span className="font-medium"></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Pastelaria Pastel & Cana. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;