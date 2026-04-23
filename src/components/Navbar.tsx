"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#kategorije", label: "Kategorije" },
  { href: "#cjenik", label: "Cjenik" },
  { href: "#instruktori", label: "Instruktori" },
  { href: "#faq", label: "Česta pitanja" },
  { href: "#lokacije", label: "Lokacije" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-surface/80 glass-nav shadow-sm"
      aria-label="Glavna navigacija"
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-primary font-headline"
        >
          Pilot Autoškola
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
          aria-label="Otvori izbornik"
          aria-expanded={open}
          className="md:hidden text-primary"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface/95 glass-nav px-6 py-4 flex flex-col gap-4 font-headline font-semibold">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#upis"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center bg-tertiary-fixed text-on-tertiary-fixed px-6 py-2 rounded-lg font-bold"
          >
            Upiši se
          </a>
        </div>
      )}
    </nav>
  );
}
