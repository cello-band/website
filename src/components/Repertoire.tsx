import { useState, useMemo, useRef } from "react";
import {
  repertoire,
  categoryLabels,
  statusLabels,
  type RepertoireCategory,
  type RepertoireStatus,
} from "#/repertoire";

const categories = Object.keys(categoryLabels) as RepertoireCategory[];

const categoryDotColors: Record<RepertoireCategory, string> = {
  klassik: "bg-amber-300",
  film: "bg-sky-300",
  tango: "bg-rose-300",
  pop: "bg-emerald-300",
};

const statusOrder: RepertoireStatus[] = ["active", "sextet", "rehearsed", "planned"];

export function Repertoire() {
  const [activeCategory, setActiveCategory] = useState<RepertoireCategory | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let pieces = repertoire;

    // Status filter: by default show only active + sextet
    if (!showAll) {
      pieces = pieces.filter((p) => p.status === "active" || p.status === "sextet");
    }

    // Category filter
    if (activeCategory) {
      pieces = pieces.filter((p) => p.category === activeCategory);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      pieces = pieces.filter(
        (p) => p.title.toLowerCase().includes(q) || p.composer.toLowerCase().includes(q)
      );
    }

    // Sort by status order, then alphabetically by title
    return [...pieces].sort((a, b) => {
      const si = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      if (si !== 0) return si;
      return a.title.localeCompare(b.title, "de");
    });
  }, [activeCategory, showAll, search]);

  const counts = useMemo(() => {
    const base = showAll ? repertoire : repertoire.filter((p) => p.status === "active" || p.status === "sextet");
    const all = search.trim()
      ? base.filter((p) => {
          const q = search.toLowerCase();
          return p.title.toLowerCase().includes(q) || p.composer.toLowerCase().includes(q);
        })
      : base;
    const result: Record<string, number> = { all: all.length };
    for (const c of categories) {
      result[c] = all.filter((p) => p.category === c).length;
    }
    return result;
  }, [showAll, search]);

  const activeCount = repertoire.filter((p) => p.status === "active" || p.status === "sextet").length;

  // Height limit: collapsed shows ~400px of grid content, expanded shows all
  const isSearching = search.trim().length > 0;
  const shouldLimitHeight = !expanded && !isSearching;

  return (
    <section id="repertoire" className="py-24 bg-cello-orange relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-white/70 font-medium text-sm uppercase tracking-wider mb-2">
            Repertoire
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {repertoire.length}+ Stücke für Cello-Ensemble
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Von Bach und Vivaldi über Piazzollas Tangos bis zu Star Wars, Bohemian Rhapsody
            und Apocalyptica – entdecken Sie unser vielseitiges Programm.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === null
                  ? "bg-white text-cello-orange shadow-lg"
                  : "bg-white/15 text-white hover:bg-white/25"
              }`}
            >
              Alle
              <span className="ml-1.5 opacity-70">{counts.all}</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-white text-cello-orange shadow-lg"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {categoryLabels[cat]}
                <span className="ml-1.5 opacity-70">{counts[cat]}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Stück oder Komponist suchen…"
              className="w-64 pl-10 pr-4 py-2 rounded-full bg-white/15 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:bg-white/25 focus:border-white/40 transition-all text-sm"
            />
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Status toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <span
              className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${
                showAll ? "bg-white/40" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                  showAll ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </span>
            {showAll ? "Gesamtes Repertoire" : `Aktives Programm (${activeCount})`}
          </button>
        </div>

        {/* Grid with height limit */}
        <div className="relative">
          <div
            ref={gridRef}
            className={`transition-[max-height] duration-700 ease-in-out overflow-hidden ${
              shouldLimitHeight ? "max-h-[480px]" : "max-h-[8000px]"
            }`}
          >
            {filtered.length === 0 ? (
              <p className="text-center text-white/60 py-12 text-lg">
                Keine Stücke gefunden.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filtered.map((piece, i) => (
                  <div
                    key={`${piece.title}-${piece.composer}`}
                    className="group flex items-start gap-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 hover:bg-white/20 hover:border-white/25 transition-all duration-300"
                    style={{ animationDelay: `${Math.min(i * 20, 400)}ms` }}
                  >
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${categoryDotColors[piece.category]}`}
                      title={categoryLabels[piece.category]}
                    />
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm leading-snug truncate">
                        {piece.title}
                      </p>
                      <p className="text-white/50 text-xs truncate">{piece.composer}</p>
                    </div>
                    {piece.status === "sextet" && (
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-white/40 bg-white/10 rounded px-1.5 py-0.5 flex-shrink-0">
                        Sextett
                      </span>
                    )}
                    {piece.status === "rehearsed" && (
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-white/30 bg-white/5 rounded px-1.5 py-0.5 flex-shrink-0">
                        Angespielt
                      </span>
                    )}
                    {piece.status === "planned" && (
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-white/30 bg-white/5 rounded px-1.5 py-0.5 flex-shrink-0">
                        Geplant
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fade overlay + expand button when collapsed */}
          {shouldLimitHeight && filtered.length > 12 && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="h-32 bg-gradient-to-t from-cello-orange to-transparent" />
              <div className="bg-cello-orange text-center pb-2">
                <button
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 text-white font-medium text-sm hover:bg-white/25 border border-white/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Alle {filtered.length} Stücke anzeigen
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="m19 9-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Collapse button when expanded */}
        {expanded && !isSearching && (
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setExpanded(false);
                document.getElementById("repertoire")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="m19 9-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Weniger anzeigen
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-xs text-white/40">
          {categories.map((cat) => (
            <span key={cat} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${categoryDotColors[cat]}`} />
              {categoryLabels[cat]}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
