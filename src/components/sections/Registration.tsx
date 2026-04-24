"use client";

import { useActionState } from "react";
import {
  registerCandidate,
  type RegistrationState,
} from "@/app/actions/register";

const initialState: RegistrationState = { ok: false, message: "" };

const fieldClass =
  "w-full min-w-0 h-12 bg-surface-container-highest border-none rounded-lg px-3 text-base focus:ring-2 focus:ring-primary focus:outline-none transition-all";

const selectClass = `${fieldClass} pr-9 appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23424752%22><path d=%22M7 10l5 5 5-5z%22/></svg>')]`;

const locations: { value: string; label: string }[] = [
  {
    value: "Kolodvorska 83, Osijek",
    label: "Autoškola Pilot – Kolodvorska 83, Osijek",
  },
  {
    value: "Drinska 93, Osijek",
    label: "Autoškola Pilot 2 – Drinska 93, Osijek",
  },
];

const categoryGroups: { label: string; options: string[] }[] = [
  {
    label: "B kategorija – osobna vozila",
    options: ["B – bez prethodne kategorije", "B – posjedujem A1, A2 ili A"],
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
    initialState,
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
            <div className="flex items-start gap-4">
              <div className="bg-primary-fixed rounded-full w-12 h-12 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
              </div>
              <div>
                <div className="font-bold">Telefon</div>
                <div className="flex flex-col gap-1 mt-1">
                  <a
                    href="tel:+385977537422"
                    className="text-sm text-on-surface-variant hover:text-primary"
                  >
                    +385 97 7537422{" "}
                    <span className="opacity-70">(Igor)</span>
                  </a>
                  <a
                    href="tel:+385911003964"
                    className="text-sm text-on-surface-variant hover:text-primary"
                  >
                    +385 91 1003964{" "}
                    <span className="opacity-70">(Predrag)</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary-fixed rounded-full w-12 h-12 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
              </div>
              <div>
                <div className="font-bold">E-mail</div>
                <div className="flex flex-col gap-2 mt-1">
                  <a
                    href="mailto:as.pilot2018@gmail.com"
                    className="text-sm text-on-surface-variant hover:text-primary"
                  >
                    as.pilot2018@gmail.com
                  </a>
                  <a
                    href="mailto:aspilot.osijek@gmail.com"
                    className="text-sm text-on-surface-variant hover:text-primary"
                  >
                    aspilot.osijek@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-fixed rounded-full w-12 h-12 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  share
                </span>
              </div>
              <div>
                <div className="font-bold">Društvene mreže</div>
                <div className="flex gap-3 mt-2">
                  <a
                    href="https://www.instagram.com/autoskolapilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 shrink-0 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary-fixed transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 2.2c3.2 0 3.584.012 4.849.07 1.17.053 1.805.249 2.227.415.56.217.96.477 1.38.896.42.42.679.82.896 1.381.166.422.362 1.057.415 2.227.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.053 1.17-.249 1.805-.415 2.227a3.717 3.717 0 0 1-.896 1.381 3.717 3.717 0 0 1-1.38.896c-.423.166-1.058.362-2.228.415-1.265.058-1.644.07-4.849.07-3.205 0-3.584-.012-4.849-.07-1.17-.053-1.805-.249-2.227-.415a3.717 3.717 0 0 1-1.381-.896 3.717 3.717 0 0 1-.896-1.381c-.166-.422-.362-1.057-.415-2.227-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.053-1.17.249-1.805.415-2.227.217-.56.477-.96.896-1.38.42-.42.82-.679 1.381-.896.422-.166 1.057-.362 2.227-.415C8.416 2.212 8.796 2.2 12 2.2zm0 1.802c-3.152 0-3.504.012-4.74.068-1.143.052-1.765.241-2.178.4-.547.213-.938.468-1.349.879-.41.41-.666.802-.879 1.349-.16.413-.348 1.035-.4 2.178-.056 1.236-.068 1.588-.068 4.74 0 3.152.012 3.504.068 4.74.052 1.143.24 1.765.4 2.178.213.547.469.938.879 1.349.411.41.802.666 1.349.879.413.16 1.035.348 2.178.4 1.236.056 1.588.068 4.74.068 3.152 0 3.504-.012 4.74-.068 1.143-.052 1.765-.24 2.178-.4a3.632 3.632 0 0 0 1.349-.879c.41-.411.666-.802.879-1.349.16-.413.348-1.035.4-2.178.056-1.236.068-1.588.068-4.74 0-3.152-.012-3.504-.068-4.74-.052-1.143-.241-1.765-.4-2.178a3.632 3.632 0 0 0-.879-1.349 3.632 3.632 0 0 0-1.349-.879c-.413-.16-1.035-.348-2.178-.4-1.236-.056-1.588-.068-4.74-.068zm0 3.068a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86zm0 8.128a3.198 3.198 0 1 0 0-6.396 3.198 3.198 0 0 0 0 6.396zm6.28-8.336a1.152 1.152 0 1 1-2.304 0 1.152 1.152 0 0 1 2.304 0z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/pilot.osijek/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 shrink-0 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary-fixed transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M13.5 21.95V13.5h2.83l.42-3.3H13.5V8.1c0-.96.27-1.61 1.64-1.61h1.75V3.54a23.6 23.6 0 0 0-2.55-.13c-2.53 0-4.26 1.54-4.26 4.37v2.42H7.25v3.3h2.83v8.45h3.42z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-surface-container-lowest p-5 sm:p-8 rounded-2xl shadow-xl border border-outline-variant/30">
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
              <form action={formAction} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 min-w-0">
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
                      className={fieldClass}
                      required
                    />
                    {state.errors?.name && (
                      <p className="text-xs text-error">{state.errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2 min-w-0">
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
                      className={fieldClass}
                      required
                    />
                    {state.errors?.email && (
                      <p className="text-xs text-error">{state.errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 min-w-0">
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
                    className={fieldClass}
                    required
                  />
                  {state.errors?.phone && (
                    <p className="text-xs text-error">{state.errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2 min-w-0">
                  <label
                    htmlFor="location"
                    className="text-sm font-bold text-primary"
                  >
                    Lokacija autoškole
                  </label>
                  <select
                    id="location"
                    name="location"
                    defaultValue=""
                    className={selectClass}
                    required
                  >
                    <option value="" disabled>
                      Odaberi lokaciju
                    </option>
                    {locations.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                  {state.errors?.location && (
                    <p className="text-xs text-error">
                      {state.errors.location}
                    </p>
                  )}
                </div>

                <div className="space-y-2 min-w-0">
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
                    className={selectClass}
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
                    className="w-full min-w-0 bg-surface-container-highest border-none rounded-lg p-3 text-base focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
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
                  aria-live="polite"
                  className="pilot-gradient text-white w-full py-4 rounded-lg font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg disabled:opacity-80 disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  {pending ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="inline-flex flex-col gap-[3px] bg-black/30 p-[3px] rounded"
                      >
                        <span className="traffic-light traffic-red block w-2.5 h-2.5 rounded-full" />
                        <span className="traffic-light traffic-yellow block w-2.5 h-2.5 rounded-full" />
                        <span className="traffic-light traffic-green block w-2.5 h-2.5 rounded-full" />
                      </span>
                      <span>Slanje…</span>
                      <style jsx>{`
                        .traffic-light {
                          background: rgba(255, 255, 255, 0.2);
                          animation: traffic 1.5s infinite;
                        }
                        .traffic-red {
                          animation-name: traffic-red;
                        }
                        .traffic-yellow {
                          animation-name: traffic-yellow;
                          animation-delay: 0.5s;
                        }
                        .traffic-green {
                          animation-name: traffic-green;
                          animation-delay: 1s;
                        }
                        @keyframes traffic-red {
                          0%,
                          25% {
                            background: #ff5252;
                            box-shadow: 0 0 6px #ff5252;
                          }
                          40%,
                          100% {
                            background: rgba(255, 255, 255, 0.2);
                            box-shadow: none;
                          }
                        }
                        @keyframes traffic-yellow {
                          0%,
                          25% {
                            background: #ffd600;
                            box-shadow: 0 0 6px #ffd600;
                          }
                          40%,
                          100% {
                            background: rgba(255, 255, 255, 0.2);
                            box-shadow: none;
                          }
                        }
                        @keyframes traffic-green {
                          0%,
                          25% {
                            background: #69f0ae;
                            box-shadow: 0 0 6px #69f0ae;
                          }
                          40%,
                          100% {
                            background: rgba(255, 255, 255, 0.2);
                            box-shadow: none;
                          }
                        }
                        @media (prefers-reduced-motion: reduce) {
                          .traffic-light {
                            animation: none;
                          }
                        }
                      `}</style>
                    </>
                  ) : (
                    "Pošalji prijavu"
                  )}
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
