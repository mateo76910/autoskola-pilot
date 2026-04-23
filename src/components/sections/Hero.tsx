import HeroImage from "@/components/HeroImage";

export default function Hero() {
  return (
    <header className="relative pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-headline font-bold text-xs tracking-widest uppercase rounded mb-6">
            Preciznost u pokretu
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-tight mb-6">
            Postani vozač s{" "}
            <span className="text-primary-container italic">povjerenjem</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed">
            Pilot Autoškola spaja najviše sigurnosne standarde s modernom
            nastavom. Upiši se danas i kreni putem do vozačke dozvole uz
            ovlaštene HAK instruktore.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#upis"
              className="pilot-gradient text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-all"
            >
              Upiši se
            </a>
            <a
              href="#cjenik"
              className="flex items-center gap-2 px-8 py-4 text-primary font-bold hover:gap-4 transition-all"
            >
              Pogledaj cjenik
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
          <HeroImage />

          <div className="absolute -bottom-6 -left-6 glass-nav bg-surface/90 p-6 rounded-xl shadow-xl z-20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary">
              <span className="material-symbols-outlined filled">verified</span>
            </div>
            <div>
              <div className="font-bold text-primary">Ovlašteni instruktori</div>
              <div className="text-sm text-on-surface-variant">
                HAK certificirana nastava
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
