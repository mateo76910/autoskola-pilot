export const faqItems = [
  {
    q: "S koliko godina se mogu upisati?",
    a: "B kategorija – sa navršenih 17 godina i 6 mjeseci; A1 kategorija – sa navršenih 15 godina i 6 mjeseci; A2 kategorija – sa navršenih 17 godina i 6 mjeseci; A kategorija – sa navršenih 24 godine, osim ako prethodno posjedujete A2 kategoriju (2 godine nakon položene A2 kategorije).",
  },
  {
    q: "Što je potrebno za upis?",
    a: "Osobna iskaznica i liječničko uvjerenje.",
  },
  {
    q: "Koliko vrijedi liječničko uvjerenje?",
    a: "Liječničko uvjerenje za autoškolu vrijedi 15 mjeseci.",
  },
  {
    q: "Koliko traje obuka?",
    a: "Obuka se sastoji od predavanja iz propisa (PPSP), prve pomoći i minimalno 35 sati vožnje. Sve skupa može biti gotovo za dva mjeseca ukoliko svaki ispit položite iz prvog pokušaja. Zbog čekanja na ispitne rokove od strane HAK-a, u prosjeku traje oko tri mjeseca.",
  },
  {
    q: "Gdje se polažu ispiti?",
    a: "Svi ispiti (propisi i prva pomoć) polažu se u nadležnom HAK-ovom ispitnom centru.",
  },
  {
    q: "Koliko puta mogu pasti ispit?",
    a: "Nema ograničenja u broju pokušaja, ali se svaki ponovni izlazak plaća.",
  },
  {
    q: "Što ako padnem ispit iz vožnje?",
    a: "Potrebno je odvoziti minimalno 3 dodatna sata vožnje prije ponovnog izlaska na ispit.",
  },
  {
    q: "Kako izgleda test iz propisa?",
    a: "Ispit se rješava na računalu, sadrži 38 pitanja, a za prolaz morate imati barem 90 % točnih odgovora. Pazite – pitanja o raskrižjima moraju biti 100 % točna.",
  },
  {
    q: "Mogu li promijeniti instruktora?",
    a: "Ukoliko to želite, u svakom trenutku obuke možete tražiti promjenu instruktora.",
  },
  {
    q: "Položili ste vozački ispit, ali niste vozili neko vrijeme – možete li uzeti kondicijske sate?",
    a: "Naravno, možete uzeti koliko god sati želite, dok ne vratite sigurnost i samopouzdanje za samostalnu vožnju.",
  },
  {
    q: "Mogu li se ispisati iz autoškole i nastaviti polaganje u drugoj?",
    a: "Da. Ako selite u drugi grad ili niste zadovoljni uslugom, imate pravo ispisati se i nastaviti osposobljavanje u drugoj autoškoli.",
  },
];

export default function Faq() {
  return (
    <section className="py-24 bg-surface" id="faq">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
            Pojašnjenja
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-primary mt-2">
            Česta pitanja
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4">
            Sve što trebate znati prije upisa, o tijeku obuke i polaganju
            ispita.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <details
              key={item.q}
              className="group bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-hidden"
              open={idx === 0}
            >
              <summary className="flex justify-between items-center gap-4 p-6 cursor-pointer list-none">
                <span className="font-bold text-primary">{item.q}</span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary shrink-0">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0 text-on-surface-variant leading-relaxed border-t border-outline-variant/30">
                <p className="pt-4">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
