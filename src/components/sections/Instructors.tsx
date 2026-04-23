import Image from "next/image";

type Instructor = {
  name: string;
  experience: string;
  role: string;
  rating: number;
  image: string;
  alt: string;
};

const instructors: Instructor[] = [
  {
    name: "Davor Sterling",
    experience: "12 godina iskustva",
    role: "B kategorija",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    alt: "Instruktor vožnje Davor Sterling",
  },
  {
    name: "Sara Jenkić",
    experience: "8 godina iskustva",
    role: "B i A kategorija",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    alt: "Instruktorica vožnje Sara Jenkić",
  },
  {
    name: "Marko Tornjak",
    experience: "15 godina iskustva",
    role: "C kategorija",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    alt: "Instruktor vožnje Marko Tornjak",
  },
  {
    name: "Elena Rossi",
    experience: "6 godina iskustva",
    role: "B kategorija",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    alt: "Instruktorica vožnje Elena Rossi",
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const total = 5;
  return (
    <div className="flex gap-1 mt-3" aria-label={`Ocjena ${rating} od 5`}>
      {Array.from({ length: total }).map((_, i) => {
        const icon = i < full ? "star" : i === full && half ? "star_half" : "star";
        const active = i < full || (i === full && half);
        return (
          <span
            key={i}
            className={`material-symbols-outlined ${
              active ? "filled text-tertiary-fixed-dim" : "text-outline-variant"
            }`}
            style={{ fontSize: 16 }}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}

export default function Instructors() {
  return (
    <section className="py-24 bg-surface" id="instruktori">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
              Tim
            </span>
            <h2 className="font-headline text-4xl font-extrabold text-primary mt-2">
              Naši instruktori
            </h2>
          </div>
          <p className="text-on-surface-variant max-w-md">
            Strpljivi i ovlašteni profesionalci s preko 50 godina zajedničkog
            iskustva u obučavanju novih vozača.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((i) => (
            <article
              key={i.name}
              className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-outline-variant/20"
            >
              <div className="h-64 overflow-hidden">
                <Image
                  src={i.image}
                  alt={i.alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="font-headline font-bold text-lg">{i.name}</div>
                <div className="text-primary text-sm font-semibold">
                  {i.experience}
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  {i.role}
                </div>
                <Stars rating={i.rating} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
