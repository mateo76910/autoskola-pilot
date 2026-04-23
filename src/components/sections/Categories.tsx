const categories = [
  {
    code: "B",
    name: "Osobna vozila",
    description:
      "Naš najpopularniji program. Teorijska i praktična nastava uz moderna vozila s dvostrukim komandama.",
    highlights: [
      "Minimalno 35 sati vožnje",
      "Nastava iz propisa (PPSP) i prve pomoći",
      "Moderan vozni park",
    ],
    icon: "directions_car",
  },
  {
    code: "A",
    name: "Motocikli",
    description:
      "Obuka za sve motocikle – od AM, A1 i A2 do A kategorije. Zaštitna oprema uključena.",
    highlights: [
      "Individualan pristup",
      "AM, A1, A2 i A kategorija",
      "Iskusan instruktor motociklista",
    ],
    icon: "two_wheeler",
  },
  {
    code: "C",
    name: "Teretna vozila",
    description:
      "Profesionalna obuka za kamione uz pomoć pri nalaženju posla nakon položenog ispita.",
    highlights: [
      "Program za buduće profesionalne vozače",
      "Moderna teretna vozila",
      "Mogućnost nadogradnje s C1 na C",
    ],
    icon: "local_shipping",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-surface" id="kategorije">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
            Ponuda
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-primary mt-2">
            Kategorije obuke
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4">
            Odaberite kategoriju koja odgovara Vašim potrebama. Svi programi
            uključuju stručnu teorijsku i praktičnu nastavu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <article
              key={c.code}
              className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">{c.icon}</span>
                </div>
                <div>
                  <div className="text-tertiary font-bold text-3xl leading-none">
                    {c.code}
                  </div>
                  <div className="text-sm font-semibold text-on-surface-variant">
                    kategorija
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">{c.name}</h3>
              <p className="text-on-surface-variant mb-6">{c.description}</p>
              <ul className="space-y-3 mb-8">
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: 18 }}
                    >
                      check_circle
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cjenik"
                className="mt-auto text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Pogledaj cijenu
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
