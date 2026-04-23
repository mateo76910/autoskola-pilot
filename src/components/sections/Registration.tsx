"use client";

import { useActionState } from "react";
import {
  registerCandidate,
  type RegistrationState,
} from "@/app/actions/register";

const initialState: RegistrationState = { ok: false, message: "" };

const categoryGroups: { label: string; options: string[] }[] = [
  {
    label: "B kategorija – osobna vozila",
    options: [
      "B – bez prethodne kategorije",
      "B – posjedujem A1, A2 ili A",
      "B – plaćanje na rate",
    ],
  },
  {
    label: "A kategorije – motocikli",
    options: [
      "AM – bez prethodne kategorije",
      "A1 – bez prethodne kategorije",
      "A1 – posjedujem B",
      "A2 – bez prethodne kategorije",
      "A2 – posjedujem B",
      "A2 – posjedujem A1",
      "A – bez prethodne kategorije",
      "A – posjedujem B",
      "A – posjedujem A1",
      "A – posjedujem A2",
    ],
  },
  {
    label: "C kategorija – teretna vozila",
    options: ["C – posjedujem B", "C – posjedujem C1"],
  },
];

export default function Registration() {
  const [state, formAction, pending] = useActionState(
    registerCandidate,
    initialState
  );

  return (
    <section className="py-24 bg-surface-container" id="upis">
      <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
            Upis
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-primary mt-2 mb-6 leading-tight">
            Spremni za prvu vožnju?
          </h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            Ispunite obrazac i javit ćemo Vam se u roku od 24 sata kako bismo
            dogovorili termin upisa i početka obuke.
          </p>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-primary-fixed p-3 rounded-full">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
              </div>
              <div>
                <div className="font-bold">Telefon</div>
                <a
                  href="tel:+38512345678"
                  className="text-sm text-on-surface-variant hover:text-primary"
                >
                  +385 1 234 5678
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-fixed p-3 rounded-full">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
              </div>
              <div>
                <div className="font-bold">E-mail</div>
                <a
                  href="mailto:info@pilot-autoskola.hr"
                  className="text-sm text-on-surface-variant hover:text-primary"
                >
                  info@pilot-autoskola.hr
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-fixed p-3 rounded-full">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>
              </div>
              <div>
                <div className="font-bold">Radno vrijeme</div>
                <div className="text-sm text-on-surface-variant">
                  Pon – Pet: 08 – 20h, Sub: 09 – 14h
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-outline-variant/30">
            {state.ok ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary mx-auto flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined filled">
                    check_circle
                  </span>
                </div>
                <h3 className="font-headline font-extrabold text-2xl text-primary mb-2">
                  Prijava zaprimljena
                </h3>
                <p className="text-on-surface-variant max-w-md mx-auto">
                  {state.message}
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-bold text-primary"
                    >
                      Ime i prezime
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ivan Horvat"
                      className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      required
                    />
                    {state.errors?.name && (
                      <p className="text-xs text-error">{state.errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-bold text-primary"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="ivan@primjer.hr"
                      className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      required
                    />
                    {state.errors?.email && (
                      <p className="text-xs text-error">
                        {state.errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-bold text-primary"
                    >
                      Broj telefona
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+385 91 234 5678"
                      className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      required
                    />
                    {state.errors?.phone && (
                      <p className="text-xs text-error">
                        {state.errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="text-sm font-bold text-primary"
                    >
                      Kategorija
                    </label>
                    <select
                      id="category"
                      name="category"
                      defaultValue=""
                      className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      required
                    >
                      <option value="" disabled>
                        Odaberi kategoriju
                      </option>
                      {categoryGroups.map((g) => (
                        <optgroup key={g.label} label={g.label}>
                          {g.options.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {state.errors?.category && (
                      <p className="text-xs text-error">
                        {state.errors.category}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="date"
                    className="text-sm font-bold text-primary"
                  >
                    Željeni datum početka obuke
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                    required
                  />
                  {state.errors?.date && (
                    <p className="text-xs text-error">{state.errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-bold text-primary"
                  >
                    Napomena (opcionalno)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Dodatne informacije ili pitanja…"
                    className="w-full bg-surface-container-highest border-none rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                  />
                </div>

                {state.message && !state.ok && (
                  <p
                    className="text-sm text-error bg-error-container px-4 py-2 rounded-lg"
                    role="alert"
                  >
                    {state.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="pilot-gradient text-white w-full py-4 rounded-lg font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg disabled:opacity-70 disabled:hover:scale-100"
                >
                  {pending ? "Slanje…" : "Pošalji prijavu"}
                </button>

                <p className="text-xs text-on-surface-variant text-center">
                  Slanjem obrasca pristajete da Vas kontaktiramo u svrhu upisa.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
