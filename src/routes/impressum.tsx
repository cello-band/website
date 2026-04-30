import { createFileRoute, Link } from "@tanstack/react-router";
import { logo } from "#media";

export const Route = createFileRoute("/impressum")({
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Cello.Band Logo"
              className="h-12"
            />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium tracking-wide uppercase text-cello-text hover:text-cello-orange transition-colors"
          >
            Zurück zur Startseite
          </Link>
        </nav>
      </header>

      <main className="pt-32 pb-24 min-h-screen bg-cello-gray">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cello-dark mb-12">
            Impressum
          </h1>

          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
            <section>
              <h2 className="font-serif text-xl font-semibold text-cello-dark mb-3">
                Angaben gemäß § 5 DDG
              </h2>
              <address className="not-italic text-cello-muted leading-relaxed">
                Henning Dieterichs
                <br />
                Scheideggstr. 56
                <br />
                8002 Zürich
                <br />
                Schweiz
              </address>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-cello-dark mb-3">
                Kontakt
              </h2>
              <p className="text-cello-muted leading-relaxed">
                E-Mail:{" "}
                <a
                  href="mailto:info@cello.band"
                  className="text-cello-orange hover:underline"
                >
                  info@cello.band
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-cello-dark mb-3">
                Haftungsausschluss
              </h2>
              <h3 className="font-semibold text-cello-text mt-4 mb-2">
                Haftung für Inhalte
              </h3>
              <p className="text-cello-muted leading-relaxed text-sm">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen.
              </p>
              <h3 className="font-semibold text-cello-text mt-4 mb-2">
                Haftung für Links
              </h3>
              <p className="text-cello-muted leading-relaxed text-sm">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-cello-dark text-white/60 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          Die Cello.Band
        </div>
      </footer>
    </>
  );
}
