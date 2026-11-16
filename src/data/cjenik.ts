/**
 * Cjenik usluga — jedini izvor cijena za web stranicu i strojno čitljive
 * CSV cjenike (/cjenik/).
 *
 * Pravni okvir (od 17.11.2026.): Zakon o zaštiti potrošača i pravilnici o
 * isticanju bazne cijene i o načinu objave cjenika. Za usluge je bazna cijena
 * cijena koja je vrijedila 10.9.2026. (bez akcija i posebnih uvjeta prodaje)
 * i ističe se uz svaku cijenu, čak i kad je jednaka trenutnoj.
 *
 * PROMJENA CIJENE: ne mijenjaj postojeću verziju — dodaj novu na kraj
 * CJENICI (sljedeći brojPohrane, objavljeno = vrijeme objave) i promijeni
 * samo cijene koje se mijenjaju. Bazna cijena u USLUGE se NE mijenja.
 * Stare verzije moraju ostati javno dostupne najmanje 30 dana.
 *
 * NOVA USLUGA (uvedena nakon 10.9.2026.): bazna = cijena prvog dana ponude,
 * baznaDatum = taj datum (obvezno se ističe uz cijenu).
 */

export const REFERENTNI_DATUM = "2026-09-10";

export type Grupa = "B" | "A" | "C";

export type Usluga = {
  /** Trajna oznaka usluge — ne mijenjati i ne koristiti ponovno. */
  sifra: string;
  grupa: Grupa;
  kategorija: string;
  /** Kategorija koju kandidat već posjeduje ("/" = nijedna). */
  posjeduje: string;
  /** Bazna cijena u centima (EUR). */
  bazna: number;
  /** ISO datum bazne cijene; izostavljeno = REFERENTNI_DATUM. */
  baznaDatum?: string;
};

export const USLUGE = [
  { sifra: "B", grupa: "B", kategorija: "B", posjeduje: "/", bazna: 179000 },
  { sifra: "B-POPUST", grupa: "B", kategorija: "B (uz popust od 10% na jednokratno plaćanje)", posjeduje: "/", bazna: 161100 },
  { sifra: "B-A1", grupa: "B", kategorija: "B", posjeduje: "A1", bazna: 140400 },
  { sifra: "BE-B", grupa: "B", kategorija: "BE", posjeduje: "B", bazna: 73000 },
  { sifra: "AM", grupa: "A", kategorija: "AM", posjeduje: "/", bazna: 99000 },
  { sifra: "A1", grupa: "A", kategorija: "A1", posjeduje: "/", bazna: 128000 },
  { sifra: "A1-B", grupa: "A", kategorija: "A1", posjeduje: "B", bazna: 38500 },
  { sifra: "A2-B", grupa: "A", kategorija: "A2", posjeduje: "B", bazna: 90000 },
  { sifra: "A2-A1", grupa: "A", kategorija: "A2", posjeduje: "A1", bazna: 42000 },
  { sifra: "A-B", grupa: "A", kategorija: "A", posjeduje: "B", bazna: 93000 },
  { sifra: "A-A1", grupa: "A", kategorija: "A", posjeduje: "A1", bazna: 43400 },
  { sifra: "A-A2", grupa: "A", kategorija: "A", posjeduje: "A2", bazna: 31000 },
  { sifra: "C-B", grupa: "C", kategorija: "C", posjeduje: "B", bazna: 174000 },
  { sifra: "C-C1", grupa: "C", kategorija: "C", posjeduje: "C1", bazna: 113000 },
  { sifra: "CE-C", grupa: "C", kategorija: "CE", posjeduje: "C", bazna: 138000 },
] as const satisfies readonly Usluga[];

export type Sifra = (typeof USLUGE)[number]["sifra"];

export type CjenikVerzija = {
  /** Redni broj objavljene datoteke (ide u naziv datoteke). */
  brojPohrane: number;
  /** Datum i vrijeme objave, lokalno vrijeme (Europe/Zagreb): "YYYY-MM-DDTHH:mm". */
  objavljeno: string;
  /** Trenutne cijene u centima; usluga bez cijene nije u ponudi u toj verziji. */
  cijene: Partial<Record<Sifra, number>>;
  /** Usluge na akciji: naziv posebnog oblika prodaje (npr. "Black Friday"). */
  akcije?: Partial<Record<Sifra, string>>;
};

const cijeneNaReferentniDatum = Object.fromEntries(
  USLUGE.map((u) => [u.sifra, u.bazna]),
) as Record<Sifra, number>;

export const CJENICI: CjenikVerzija[] = [
  {
    brojPohrane: 1,
    objavljeno: "2026-11-16T15:00",
    // Cijene se nisu mijenjale od 10.9.2026.
    cijene: cijeneNaReferentniDatum,
  },
  // Primjer sljedeće promjene:
  // {
  //   brojPohrane: 2,
  //   objavljeno: "2027-01-02T07:30",
  //   cijene: { ...cijeneNaReferentniDatum, B: 170000 },
  // },
];

/** Uslužni objekti — za svaki se objavljuje zasebna datoteka cjenika. */
export const USLUZNI_OBJEKTI = [
  { oznaka: "U-01", adresa: "Kolodvorska 83 Osijek" },
  { oznaka: "U-02", adresa: "Drinska 93 Osijek" },
] as const;
