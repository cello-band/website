import { bandComplete } from "#media";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-cello-gray"
    >
      <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center pt-32 pb-24 gap-12">
        {/* Ensemble photo */}
        <div className="relative flex justify-center">
          <img
            src={bandComplete}
            alt="Die Cello.Band – Acht CellistInnen"
            className="w-full max-w-4xl drop-shadow-2xl animate-fade-in-up"
          />
        </div>

        {/* Text */}
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-cello-dark">
            Die Cello.Band
            <br />
            <span className="block h-4 md:h-6" aria-hidden="true" />
            <span className="text-cello-orange italic">Cello</span>
            <span className="text-cello-dark"> neu erleben</span>
          </h1>

          <p className="text-lg text-cello-muted max-w-xl leading-relaxed">
            Begleite uns auf einer musikalischen Reise voller Innovation und
            Kreativität durch Karlsruhe und darüber hinaus. Wir schaffen eine
            frische, moderne Interpretation von Cello-Musik.
          </p>

          <a
            href="#about"
            className="inline-flex items-center gap-2 bg-cello-orange text-white px-8 py-3 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-cello-brown transition-colors duration-300"
          >
            Mehr erfahren
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-cello-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
