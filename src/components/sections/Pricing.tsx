type Row = {
  category: string;
  has: string;
  price: string;
  highlight?: boolean;
};

const categoryB: Row[] = [
  { category: "B", has: "/", price: "1.512,00 €" },
  { category: "B", has: "A1, A2, A", price: "1.288,00 €" },
  { category: "B (plaćanje na rate)", has: "/", price: "1.680,00 €" },
];

const categoryA: Row[] = [
  { category: "AM", has: "/", price: "810,00 €" },
  { category: "A1", has: "/", price: "1.010,00 €" },
  { category: "A1", has: "B", price: "280,00 €" },
  { category: "A2", has: "B", price: "675,00 €" },
  { category: "A2", has: "A1", price: "315,00 €" },
  { category: "A2", has: "/", price: "1.110,00 €" },
  { category: "A", has: "B", price: "750,00 €" },
  { category: "A", has: "A1", price: "350,00 €" },
  { category: "A", has: "A2", price: "250,00 €" },
  { category: "A", has: "/", price: "1.460,00 €" },
];

const categoryC: Row[] = [
  { category: "C", has: "B", price: "1.260,00 €" },
  { category: "C", has: "C1", price: "805,00 €" },
];

function PriceTable({
  title,
  subtitle,
  rows,
  icon,
  accent,
}: {
  title: string;
  subtitle: string;
  rows: Row[];
  icon: string;
  accent: "blue" | "gold" | "teal";
}) {
  const accentMap = {
    blue: "bg-gradient-to-br from-primary to-primary-container",
    gold: "bg-gradient-to-br from-tertiary-container to-tertiary",
    teal: "bg-gradient-to-br from-secondary to-on-secondary-container",
  } as const;

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border-b border-outline-variant/30 bg-surface-container-low">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-sm ${accentMap[accent]}`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h3 className="font-headline font-extrabold text-xl text-primary leading-tight">
            {title}
          </h3>
          <p className="text-sm text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-fixed">
          <colgroup>
            <col className="w-[22%] sm:w-[28%]" />
            <col className="w-[38%] sm:w-[40%]" />
            <col className="w-[40%] sm:w-[32%]" />
          </colgroup>
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-[10px] sm:text-xs uppercase tracking-wider">
              <th scope="col" className="px-3 py-3 sm:px-6 font-bold">
                Kategorija
              </th>
              <th scope="col" className="px-3 py-3 sm:px-6 font-bold">
                <span className="sm:hidden">Posjeduje</span>
                <span className="hidden sm:inline">Posjeduje kategoriju</span>
              </th>
              <th
                scope="col"
                className="px-3 py-3 sm:px-6 font-bold text-right"
              >
                Cijena
              </th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
            {rows.map((r, i) => (
              <tr
                key={`${r.category}-${r.has}-${i}`}
                className="border-t border-outline-variant/20 hover:bg-surface-container-low/60 transition-colors"
              >
                <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-primary">
                  {r.category}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-on-surface-variant">
                  {r.has}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-extrabold whitespace-nowrap">
                  {r.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section
      className="relative py-24 bg-gradient-to-b from-surface-container-low via-primary-fixed/20 to-surface-container-low overflow-hidden"
      id="cjenik"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-primary-fixed/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-[24rem] h-[24rem] rounded-full bg-tertiary-fixed/30 blur-3xl"
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
            Ulaganje
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-primary mt-2">
            Cjenik
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4">
            Transparentne cijene bez skrivenih troškova. Na jednokratno plaćanje
            odobravamo popust od 10%.
          </p>
        </div>

        {/* Payment methods */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-4 sm:p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
            <div className="md:w-1/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary filled">
                  credit_card
                </span>
                <h3 className="font-headline font-extrabold text-xl text-primary">
                  Mogućnosti plaćanja
                </h3>
              </div>
              <p className="text-on-surface-variant text-sm">
                Obuku možete platiti odjednom ili na rate bez kamata. Uz
                jednokratnu uplatu odobravamo dodatni popust od{" "}
                <span className="font-bold text-primary">10%</span>.
              </p>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left table-fixed">
                <colgroup>
                  <col className="w-[65%] sm:w-[70%]" />
                  <col className="w-[35%] sm:w-[30%]" />
                </colgroup>
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant text-[10px] sm:text-xs uppercase tracking-wider">
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-3 font-bold rounded-l-lg"
                    >
                      Način plaćanja
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-3 font-bold text-right rounded-r-lg"
                    >
                      Broj rata
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm">
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      Uplatnica / transakcijski
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-bold whitespace-nowrap">
                      1 – 6
                    </td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      Premium Visa{" "}
                      <span className="text-[10px] sm:text-xs text-on-surface-variant">
                        (bez kamata)
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-bold whitespace-nowrap">
                      1 – 12
                    </td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      Visa Inspire (PBZ){" "}
                      <span className="text-[10px] sm:text-xs text-on-surface-variant">
                        (bez kamata)
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-bold whitespace-nowrap">
                      1 – 12
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <PriceTable
            title="B kategorija"
            subtitle="Osobna vozila"
            rows={categoryB}
            icon="directions_car"
            accent="blue"
          />
          <PriceTable
            title="A kategorije"
            subtitle="Motocikli – AM, A1, A2 i A"
            rows={categoryA}
            icon="two_wheeler"
            accent="gold"
          />
          <PriceTable
            title="C kategorija"
            subtitle="Teretna vozila"
            rows={categoryC}
            icon="local_shipping"
            accent="teal"
          />
        </div>

        <p className="text-center text-xs text-on-surface-variant mt-8 max-w-2xl mx-auto">
          * Sve cijene su izražene u eurima i uključuju teorijsku i praktičnu
          nastavu propisanu zakonom. Troškovi HAK-a (ispiti, liječničko
          uvjerenje) nisu uključeni.
        </p>
      </div>
    </section>
  );
}
