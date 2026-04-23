import Image from "next/image";

type Instructor = {
  name: string;
  image: string;
};

const instructors: Instructor[] = [
  {
    name: "Predrag Kunić",
    image: "/instructors/instruktor1.webp",
  },
  {
    name: "Igor Halt, mag.oec., ing.traff.",
    image: "/instructors/instruktor2.webp",
  },
  {
    name: "Maja Kozić",
    image: "/instructors/instruktor3.webp",
  },
  {
    name: "Viktor Kunić, ing.traff.",
    image: "/instructors/instruktor4.webp",
  },
];

export default function Instructors() {
  return (
    <section
      className="relative py-24 bg-surface overflow-hidden"
      id="instruktori"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 w-[30rem] h-[30rem] rounded-full bg-secondary-fixed/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-0 w-[22rem] h-[22rem] rounded-full bg-primary-fixed/30 blur-3xl"
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
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
          {instructors.map((i, idx) => (
            <article
              key={i.name}
              className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-outline-variant/20"
            >
              <div className="h-64 overflow-hidden">
                <Image
                  src={i.image}
                  alt={i.name}
                  width={600}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="font-headline font-bold text-lg">{i.name}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
