import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client'; // Importar o cliente Supabase

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Por favor, selecione uma avaliação em estrelas.');
      return;
    }
    if (comment.trim() === '') {
      toast.error('Por favor, deixe um comentário.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the current user's ID if they are logged in
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || null;

      const { error } = await supabase
        .from('feedback')
        .insert([
          { user_id: userId, rating, comment }
        ]);

      if (error) {
        console.error('Erro ao enviar feedback para o Supabase:', error);
        toast.error('Ocorreu um erro ao enviar seu feedback. Tente novamente.');
      } else {
        toast.success('Seu feedback foi enviado com sucesso! Agradecemos sua opinião.');
        setRating(0);
        setComment('');
      }
    } catch (error) {
      console.error('Erro inesperado ao enviar feedback:', error);
      toast.error('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Star className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Deixe seu Feedback</h1>
            <p className="text-xl opacity-90">Sua opinião é muito importante para nós!</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Avalie sua Experiência</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="rating" className="block text-lg font-medium mb-3 text-center">
                  Qual o seu grau de satisfação?
                </Label>
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      className={`w-10 h-10 cursor-pointer transition-colors ${
                        starValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                      }`}
                      onClick={() => setRating(starValue)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="comment" className="block text-lg font-medium mb-2">
                  Seu Comentário
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Compartilhe sua experiência conosco..."
                  rows={6}
                  className="resize-y"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Feedback
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;