import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start">
          <Link
            href="/"
            className="text-lg font-bold text-primary mb-2 font-headline"
          >
            Pilot Autoškola
          </Link>
          <div className="text-sm text-on-surface-variant">
            © {new Date().getFullYear()} Pilot Autoškola. Preciznost u pokretu.
          </div>
        </div>

        <div className="flex flex-wrap gap-6 md:gap-8 text-sm justify-center">
          <a
            href="#cjenik"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Cjenik
          </a>
          <a
            href="#faq"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Česta pitanja
          </a>
          <a
            href="#lokacije"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Lokacije
          </a>
          <a
            href="#upis"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Kontakt
          </a>
        </div>

      </div>
    </footer>
  );
}
