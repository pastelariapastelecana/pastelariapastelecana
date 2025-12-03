import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import OrderSteps from '@/components/OrderSteps';
import CategoryGrid from '@/components/CategoryGrid';
// import StoreInfo from '@/components/StoreInfo'; // Removido conforme solicitado
import DeliveryApps from '@/components/DeliveryApps';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <OrderSteps />
        <CategoryGrid />
        {/* <StoreInfo /> */}
        <DeliveryApps />
      </main>
      <Footer />
    </div>
  );
};

export default Index;