import { useState } from 'react';
import { Toaster } from 'sonner';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Brands } from './components/Brands';
import { OfficialBrands } from './components/OfficialBrands';
import { Catalog } from './components/Catalog';
import { Financing } from './components/Financing';
import { SpareParts } from './components/SpareParts';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Maps } from './components/Maps';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Product } from './data/catalog';
import { FiltroCatalogo } from './data/marcas';

export default function App() {
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [filtroCatalogo, setFiltroCatalogo] = useState<FiltroCatalogo | null>(null);

  // Cada pedido lleva un id nuevo para que repetir el mismo filtro vuelva a aplicarse
  const verEnCatalogo = (filtro: Omit<FiltroCatalogo, 'id'>) =>
    setFiltroCatalogo((anterior) => ({ ...filtro, id: (anterior?.id ?? 0) + 1 }));

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-ink text-white">
      <Header />
      <main>
        <Hero />
        <Brands />
        <OfficialBrands onVerEnCatalogo={verEnCatalogo} />
        <Catalog
          compareProducts={compareProducts}
          setCompareProducts={setCompareProducts}
          filtroExterno={filtroCatalogo}
        />
        <Financing />
        <SpareParts />
        <About />
        <Contact />
      </main>
      <Maps />
      <Footer />
      <WhatsAppFloat />
      <Toaster
        position="top-right"
        theme="dark"
        richColors
      />
    </div>
    </MotionConfig>
  );
}
