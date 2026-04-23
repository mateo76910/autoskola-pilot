const locations = [
  {
    name: "Autoškola Pilot",
    address: "Kolodvorska 83, 31000 Osijek",
    hours: "Pon – Sub: 08 – 20h",
    features: ["Besplatan parking"],
    query: "Kolodvorska 83, 31000 Osijek",
  },
  {
    name: "Autoškola Pilot 2",
    address: "Drinska 93, 31000 Osijek",
    hours: "Pon – Pet: 09 – 18h",
    features: ["Moderna predavaonica", "Besplatan parking"],
    query: "Drinska 93, 31000 Osijek",
  },
];

function mapEmbedSrc(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=hr&z=16&output=embed`;
}

function mapLinkHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function Locations() {
  return (
    <section className="py-24 bg-surface-container-low" id="lokacije">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
            Prisutnost
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-primary mt-2">
            Pronađite nas
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((l) => (
            <article
              key={l.name}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-sm border border-outline-variant/30"
            >
              <div className="sm:w-1/2 h-64 sm:h-auto relative min-h-60">
                <iframe
                  title={`Karta lokacije ${l.name}`}
                  src={mapEmbedSrc(l.query)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                />
              </div>
              <div className="sm:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-3 font-headline">
                  {l.name}
                </h3>
                <p className="text-on-surface-variant text-sm mb-4">
                  {l.address}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 18 }}
                    >
                      schedule
                    </span>
                    {l.hours}
                  </div>
                  {l.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-xs font-bold text-primary"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 18 }}
                      >
                        check
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
                <a
                  href={mapLinkHref(l.query)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary border-b border-primary font-bold text-sm self-start"
                >
                  Otvori u Google Mapsu
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
