import { useRef, useEffect } from "react";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";
import { selecoes, retro, europeus, brasileirao } from "@/data/products";
import videoBanner from "@/assets/watermark-removed.mp4";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0; // Deixa o vídeo 2x mais rápido
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryBar />

      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <video
          ref={videoRef}
          src={videoBanner}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[320px] md:h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 md:pb-14 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-white drop-shadow-lg">Vista a camisa do seu time</h2>
          <p className="text-white/85 text-lg max-w-2xl mx-auto drop-shadow">
            Coleção exclusiva de camisetas originais, retrô e lançamentos. Frete grátis acima de R$ 300.
          </p>
        </div>
      </section>

      {selecoes.length > 0 && (
        <ProductSection
          title="Seleções"
          products={selecoes.map((p) => ({ ...p, id: p.id }))}
          id="seleções"
        />
      )}
      {retro.length > 0 && (
        <>
          <div className="border-t border-border" />
          <ProductSection
            title="Históricas, edição: Série A Italiana"
            products={retro.map((p) => ({ ...p, id: p.id }))}
            id="retrô"
          />
        </>
      )}
      {europeus.length > 0 && (
        <>
          <div className="border-t border-border" />
          <ProductSection
            title="Europeus"
            products={europeus.map((p) => ({ ...p, id: p.id }))}
            id="europeus"
          />
        </>
      )}
      {brasileirao.length > 0 && (
        <>
          <div className="border-t border-border" />
          <ProductSection
            title="Brasileirão"
            products={brasileirao.map((p) => ({ ...p, id: p.id }))}
            id="brasileirão"
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Index;
