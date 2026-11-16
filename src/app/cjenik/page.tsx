import Link from "next/link";
import { REFERENTNI_DATUM } from "@/data/cjenik";
import {
  formatDatum,
  formatObjavljeno,
  sveDatoteke,
  type DatotekaCjenika,
} from "@/lib/cjenik";

export const metadata = {
  title: "Cjenik usluga (CSV)",
  description:
    "Važeći cjenik usluga Pilot Autoškole u strojno čitljivom obliku (CSV) s baznim cijenama i arhivom prethodnih cjenika.",
  alternates: { canonical: "/cjenik" },
};

function DatotekaLink({ d }: { d: DatotekaCjenika }) {
  return (
    <a
      href={`/cjenik/${d.naziv}`}
      className="font-mono text-xs sm:text-sm text-primary underline underline-offset-2 break-all hover:no-underline"
    >
      {d.naziv}
    </a>
  );
}

export default function Page() {
  const datoteke = sveDatoteke();
  const trenutne = datoteke.filter((d) => d.trenutna);
  const arhiva = datoteke.filter((d) => !d.trenutna).reverse();

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 pt-32 pb-24">
      <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
        Cjenik
      </span>
      <h1 className="font-headline text-4xl font-extrabold text-primary mt-2 leading-tight">
        Cjenik usluga u strojno čitljivom obliku
      </h1>
      <p className="mt-4 text-on-surface-variant leading-relaxed">
        Važeći cjenik usluga objavljen je u CSV formatu za svaki naš uslužni
        objekt. Uz maloprodajnu cijenu svake usluge navedena je i bazna cijena,
        odnosno cijena koja je vrijedila {formatDatum(REFERENTNI_DATUM)}{" "}
        Pregled cijena dostupan je i u{" "}
        <Link href="/#cjenik" className="text-primary font-bold underline">
          cjeniku na naslovnici
        </Link>
        .
      </p>

      <section className="mt-12">
        <h2 className="font-headline text-2xl font-extrabold text-on-surface">
          Važeći cjenik
        </h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Objavljeno {formatObjavljeno(trenutne[0].verzija.objavljeno)}
        </p>
        <ul className="mt-6 grid gap-4">
          {trenutne.map((d) => (
            <li
              key={d.naziv}
              className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-sm"
            >
              <div className="font-bold text-on-surface">{d.adresa}</div>
              <div className="mt-2">
                <DatotekaLink d={d} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-headline text-2xl font-extrabold text-on-surface">
          Arhiva cjenika
        </h2>
        {arhiva.length === 0 ? (
          <p className="mt-2 text-sm text-on-surface-variant">
            Nema prethodnih cjenika.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {arhiva.map((d) => (
              <li key={d.naziv} className="text-sm text-on-surface-variant">
                {formatObjavljeno(d.verzija.objavljeno)} · {d.adresa}
                <br />
                <DatotekaLink d={d} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-12 text-xs text-on-surface-variant leading-relaxed">
        Format: CSV, UTF-8, razdjelnik „;”, decimalni zarez, iznosi u eurima.
        Stupci: šifra, naziv usluge, maloprodajna cijena, posebni oblik prodaje
        (DA/NE), naziv posebnog oblika prodaje, bazna cijena, datum bazne
        cijene.
      </p>
    </div>
  );
}
