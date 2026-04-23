import Image from "next/image";

const locations = [
  {
    name: "Pilot – Zagreb Centar",
    address: "Ilica 124, 10000 Zagreb",
    hours: "Pon – Sub: 08 – 20h",
    features: ["Besplatan parking", "Pristupačno javnim prijevozom"],
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    alt: "Lokacija autoškole Pilot u Zagrebu",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ilica+124+Zagreb",
  },
  {
    name: "Pilot – Split",
    address: "Velebitska 48, 21000 Split",
    hours: "Pon – Pet: 09 – 18h",
    features: ["Punionice za električna vozila", "Moderna predavaonica"],
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    alt: "Lokacija autoškole Pilot u Splitu",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Velebitska+48+Split",
  },
];

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
                <Image
                  src={l.image}
                  alt={l.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
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
                  href={l.mapUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary border-b border-primary font-bold text-sm self-start"
                >
                  Pronađi na karti
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
