import {
  CJENICI,
  REFERENTNI_DATUM,
  USLUGE,
  USLUZNI_OBJEKTI,
  type CjenikVerzija,
  type Grupa,
  type Sifra,
  type Usluga,
} from "@/data/cjenik";

export type StavkaCjenika = {
  sifra: Sifra;
  grupa: Grupa;
  kategorija: string;
  posjeduje: string;
  naziv: string;
  cijena: number;
  bazna: number;
  baznaDatum: string;
  akcija?: string;
};

export type DatotekaCjenika = {
  naziv: string;
  oznaka: string;
  adresa: string;
  verzija: CjenikVerzija;
  trenutna: boolean;
};

const pad = (n: number | string, len = 2) => String(n).padStart(len, "0");

function iznos(cents: number): { cijeli: string; decimale: string } {
  return {
    cijeli: String(Math.trunc(cents / 100)),
    decimale: pad(Math.abs(cents % 100)),
  };
}

/** 161100 → "1.611,00 €" */
export function formatEur(cents: number): string {
  const { cijeli, decimale } = iznos(cents);
  return `${cijeli.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${decimale} €`;
}

/** 161100 → "1611,00" (CSV: bez oznake valute i bez točke za tisućice) */
export function formatCsvIznos(cents: number): string {
  const { cijeli, decimale } = iznos(cents);
  return `${cijeli},${decimale}`;
}

/** "2026-09-10" → "10.9.2026." */
export function formatDatum(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d}.${m}.${y}.`;
}

/** "2026-11-16T15:00" → "16.11.2026. u 15:00" */
export function formatObjavljeno(objavljeno: string): string {
  return `${formatDatum(objavljeno)} u ${objavljeno.slice(11, 16)}`;
}

function nazivUsluge(kategorija: string, posjeduje: string): string {
  const uz = posjeduje === "/" ? "" : ` (kandidat posjeduje ${posjeduje})`;
  return `Osposobljavanje za vozača – kategorija ${kategorija}${uz}`;
}

export function stavke(verzija: CjenikVerzija): StavkaCjenika[] {
  return USLUGE.flatMap((u: Usluga & { sifra: Sifra }) => {
    const cijena = verzija.cijene[u.sifra];
    if (cijena === undefined) return [];
    return [
      {
        sifra: u.sifra,
        grupa: u.grupa,
        kategorija: u.kategorija,
        posjeduje: u.posjeduje,
        naziv: nazivUsluge(u.kategorija, u.posjeduje),
        cijena,
        bazna: u.bazna,
        baznaDatum: u.baznaDatum ?? REFERENTNI_DATUM,
        akcija: verzija.akcije?.[u.sifra],
      },
    ];
  });
}

export function trenutniCjenik(): CjenikVerzija {
  return CJENICI[CJENICI.length - 1];
}

/**
 * Naziv po uputi Ministarstva gospodarstva: oblik objekta_adresa_oznaka_
 * broj pohrane_datum i vrijeme objave. Razmaci i ":" zamijenjeni su s "-"
 * da URL i naziv datoteke rade na svim sustavima.
 */
export function nazivDatoteke(
  verzija: CjenikVerzija,
  objekt: { oznaka: string; adresa: string },
): string {
  const [datum, vrijeme] = verzija.objavljeno.split("T");
  const [y, m, d] = datum.split("-");
  return [
    "autoskola",
    objekt.adresa.trim().replace(/\s+/g, "-"),
    objekt.oznaka,
    pad(verzija.brojPohrane, 3),
    `${d}.${m}.${y}`,
    vrijeme.replace(":", "-"),
  ].join("_") + ".csv";
}

export function sveDatoteke(): DatotekaCjenika[] {
  const trenutna = trenutniCjenik();
  return CJENICI.flatMap((verzija) =>
    USLUZNI_OBJEKTI.map((objekt) => ({
      naziv: nazivDatoteke(verzija, objekt),
      oznaka: objekt.oznaka,
      adresa: objekt.adresa,
      verzija,
      trenutna: verzija === trenutna,
    })),
  );
}

const CSV_ZAGLAVLJE = [
  "Šifra",
  "Naziv usluge",
  "Maloprodajna cijena (EUR)",
  "Posebni oblik prodaje",
  "Naziv posebnog oblika prodaje",
  "Bazna cijena (EUR)",
  "Datum bazne cijene",
];

function csvPolje(v: string): string {
  return /[";\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/** UTF-8 s BOM-om (da Excel ispravno prikaže č/ć/š), ";" kao razdjelnik, CRLF. */
export function generirajCsv(verzija: CjenikVerzija): string {
  const redovi = [
    CSV_ZAGLAVLJE,
    ...stavke(verzija).map((s) => [
      s.sifra,
      s.naziv,
      formatCsvIznos(s.cijena),
      s.akcija ? "DA" : "NE",
      s.akcija ?? "",
      formatCsvIznos(s.bazna),
      formatDatum(s.baznaDatum),
    ]),
  ];
  return "﻿" + redovi.map((r) => r.map(csvPolje).join(";")).join("\r\n") + "\r\n";
}
