"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#kategorije", label: "Kategorije" },
  { href: "#cjenik", label: "Cjenik" },
  { href: "#instruktori", label: "Instruktori" },
  { href: "#faq", label: "Česta pitanja" },
  { href: "#lokacije", label: "Lokacije" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-surface/80 glass-nav shadow-sm"
      aria-label="Glavna navigacija"
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-2xl font-bold tracking-tighter text-primary font-headline"
          onClick={() => setOpen(false)}
          aria-label="Pilot Autoškola – naslovnica"
        >
          <Image
            src="/logo.png"
            alt=""
            width={50}
            height={50}
            priority
            className="h-16 w-16 rounded-md object-contain"
          />
          <span>Autoškola Pilot</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center font-headline font-semibold tracking-tight">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#upis"
          className="hidden md:inline-flex bg-tertiary-fixed text-on-tertiary-fixed px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform duration-200 active:scale-95"
        >
          Upiši se
        </a>

        <button
          type="button"
          aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-primary hover:bg-surface-container-high active:scale-95 transition"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">
            {open ? "Zatvori izbornik" : "Otvori izbornik"}
          </span>
          <span aria-hidden="true" className="relative block w-6 h-5">
            <span
              className={`absolute left-0 block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 block h-[2px] w-6 rounded-full bg-current transition-all duration-200 ${
                open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-outline-variant/30 bg-surface/95 glass-nav px-6 py-6 flex flex-col gap-1 font-headline font-semibold">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${80 + i * 40}ms` : "0ms",
                }}
                className={`py-3 px-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-300 ${
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#upis"
              onClick={() => setOpen(false)}
              style={{
                transitionDelay: open ? `${80 + links.length * 40}ms` : "0ms",
              }}
              className={`mt-3 inline-flex justify-center bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              Upiši se
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
