const highlights = [
  {
    neighborhood: "Bosutsko-Sjenjak",
    address: "Drinska 93",
    hint: "preko puta KIFOS-a i Graditeljsko-geodetske srednje škole",
    isNew: true,
  },
  {
    neighborhood: "Retfala",
    address: "Kolodvorska 83",
    hint: "lako dostupna lokacija u središtu Retfale",
    isNew: false,
  },
];

export default function LocationsHighlight() {
  return (
    <section
      className="pt-4 pb-12 md:pb-16"
      aria-labelledby="lokacije-isticanje"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
            Dvije lokacije u Osijeku
          </span>
          <h2
            id="lokacije-isticanje"
            className="font-headline text-2xl md:text-3xl font-extrabold text-primary mt-2"
          >
            Možete nas pronaći na dvije lokacije
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {highlights.map((l) => (
            <a
              key={l.address}
              href="#lokacije"
              className="group relative bg-surface-container-lowest rounded-2xl p-5 md:p-6 border border-outline-variant/40 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-start gap-4"
            >
              {l.isNew && (
                <span className="absolute -top-2 -right-2 bg-tertiary-container text-on-tertiary-fixed text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md">
                  Novo
                </span>
              )}

              <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl pilot-gradient flex items-center justify-center text-on-primary shadow-md">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 28 }}
                >
                  location_on
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-headline font-extrabold text-primary text-base md:text-lg uppercase tracking-wide leading-tight">
                  {l.neighborhood}
                </div>
                <div className="font-bold text-on-surface text-sm md:text-base mt-0.5">
                  {l.address}
                </div>
                <p className="text-on-surface-variant text-xs md:text-sm mt-1.5 leading-snug">
                  {l.hint}
                </p>
              </div>

              <span
                className="material-symbols-outlined text-primary self-center transition-transform group-hover:translate-x-1 hidden sm:inline-block"
                style={{ fontSize: 22 }}
              >
                arrow_forward
              </span>
            </a>
          ))}
        </div>

        <div className="text-center mt-6">
          <a
            href="#lokacije"
            className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:gap-2.5 transition-all"
          >
            Pogledaj karte i detalje
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              arrow_downward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
