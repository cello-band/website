import { useState } from "react";
import { concerts, type Concert } from "#/concerts";

function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateRange(c: Concert): string {
  if (c.endDate) {
    const s = new Date(c.date);
    const e = new Date(c.endDate);
    if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
      return `${s.getDate()}.–${e.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}`;
    }
    return `${formatDateShort(c.date)} – ${formatDateShort(c.endDate)}`;
  }
  return new Date(c.date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Compact program summary — e.g. "Elgar, Matz, Schubert, Händel" */
function programSummary(program?: string[]): string | null {
  if (!program || program.length === 0) return null;
  const names = program.map((p) => {
    // strip "(Zugabe)" and extract last name before "–"
    const clean = p.replace(/\(Zugabe\)/i, "").trim();
    const dashIdx = clean.indexOf("–");
    if (dashIdx === -1) return clean;
    const composer = clean.slice(0, dashIdx).trim();
    // Get last name (last word), handle "Johann Sebastian Bach" → "Bach"
    const parts = composer.split(/\s+/);
    return parts[parts.length - 1];
  });
  // deduplicate while preserving order
  const unique = [...new Set(names)];
  return unique.join(", ");
}

const INITIAL_COUNT = 5;
const LOAD_MORE_COUNT = 10;

export function Concerts() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcoming = concerts
    .filter((c) => new Date(c.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = concerts
    .filter((c) => new Date(c.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const visiblePast = past.slice(0, visibleCount);
  const hiddenCount = past.length - visibleCount;
  const canShowMore = hiddenCount > 0;
  const canCollapse = visibleCount > INITIAL_COUNT;

  return (
    <section id="concerts" className="py-24 bg-cello-cream/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-cello-orange font-medium text-sm uppercase tracking-wider mb-2">
            Konzerte
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cello-dark">
            Termine
          </h2>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="mb-16 space-y-6">
            {upcoming.map((concert) => (
              <article
                key={concert.date + concert.title}
                className="relative overflow-hidden rounded-2xl border-2 border-cello-orange/20 bg-white shadow-lg"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Flyer or placeholder */}
                  <div className="sm:w-56 md:w-64 flex-shrink-0">
                    {concert.flyerUrl ? (
                      <img
                        src={concert.flyerUrl}
                        alt={`Flyer: ${concert.title}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full min-h-40 bg-gradient-to-br from-cello-brown/80 to-cello-orange/70 flex flex-col items-center justify-center p-6 text-white/90">
                        <span className="font-serif text-3xl font-bold leading-none">
                          {new Date(concert.date).getDate()}.
                        </span>
                        <span className="text-sm mt-1 uppercase tracking-wider">
                          {new Date(concert.date).toLocaleDateString("de-DE", { month: "long" })}
                        </span>
                        <span className="text-sm opacity-75">
                          {new Date(concert.date).getFullYear()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-cello-orange animate-pulse" />
                      <span className="text-xs font-medium uppercase tracking-wider text-cello-orange">
                        Nächstes Konzert
                      </span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-cello-dark mb-2">
                      {concert.title}
                    </h3>
                    <p className="text-sm text-cello-muted mb-1">
                      {formatDateRange(concert)}
                      {concert.time && <> · {concert.time} Uhr</>}
                    </p>
                    <p className="text-sm text-cello-muted mb-3">{concert.venue}</p>
                    {concert.description && (
                      <p className="text-sm text-cello-text leading-relaxed">
                        {concert.description}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Past concerts — timeline */}
        {past.length > 0 && (
          <div>
            <h3 className="font-serif text-xl font-bold text-cello-dark mb-8">
              Vergangene Öffentliche Auftritte
            </h3>

            {/* Grid timeline: [date] [line+dot] [content] */}
            <div className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[4rem_auto_1fr] gap-x-0 items-start">
              {visiblePast.map((concert, i) => {
                const summary = programSummary(concert.program);
                const year = new Date(concert.date).getFullYear();
                const prevYear = i > 0 ? new Date(visiblePast[i - 1].date).getFullYear() : null;
                const showYear = year !== prevYear;
                const isLast = i === visiblePast.length - 1 && !canShowMore;

                return (
                  <div key={concert.date + concert.title} className="contents">
                    {/* Year separator row — spans all 3 columns */}
                    {showYear && (
                      <>
                        {/* Empty left cell */}
                        <div />
                        {/* Line segment */}
                        <div className="flex justify-center">
                          <div className="w-px bg-cello-orange/20 h-5" />
                        </div>
                        {/* Year label + fading line */}
                        <div className="flex items-center gap-3 py-2 pl-3">
                          <span className="text-xs font-bold text-cello-orange tracking-wide">{year}</span>
                          <div className="h-px max-w-40 flex-1 bg-gradient-to-r from-cello-orange/25 to-transparent" />
                        </div>
                      </>
                    )}

                    {/* Concert row */}
                    {/* Date cell — right-aligned */}
                    <div className="hidden sm:flex justify-end items-start pt-[7px] pr-3">
                      <span className="text-xs text-cello-muted whitespace-nowrap">
                        {new Date(concert.date).toLocaleDateString("de-DE", { day: "numeric", month: "short" }).replace(".", "")}
                      </span>
                    </div>
                    <div className="sm:hidden" />

                    {/* Dot + line segment cell */}
                    <div className="flex flex-col items-center">
                      <div className="w-px bg-cello-orange/20 h-2.5" />
                      <div className="w-1.5 h-1.5 rounded-full bg-cello-orange/30 flex-shrink-0 group-hover:bg-cello-orange transition-colors" />
                      {(!isLast || canShowMore) && (
                        <div className="w-px bg-cello-orange/20 flex-1 min-h-2.5" />
                      )}
                    </div>

                    {/* Content cell */}
                    <div className="pb-2 pl-3">
                      <div className="sm:hidden text-[11px] text-cello-muted mb-0.5">
                        {formatDateShort(concert.date)}
                      </div>
                      <p className="text-sm text-cello-dark leading-snug">
                        <span className="font-semibold">{concert.title}</span>
                        <span className="text-cello-muted"> · {concert.venue}</span>
                      </p>
                      {summary && (
                        <p className="text-xs text-cello-muted/60 mt-0.5 italic truncate">
                          {summary}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Show more / Collapse row */}
              {(canShowMore || canCollapse) && (
                <>
                  <div />
                  <div className="flex flex-col items-center">
                    <div className="w-px bg-cello-orange/10 h-3" />
                    <div className="w-1 h-1 rounded-full bg-cello-orange/15 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-3 pl-3 pt-1">
                    {canShowMore && (
                      <button
                        onClick={() => setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, past.length))}
                        className="text-xs font-medium text-cello-orange hover:text-cello-orange/80 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Mehr anzeigen</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    )}
                    {canShowMore && canCollapse && (
                      <span className="text-cello-muted/30">·</span>
                    )}
                    {canCollapse && (
                      <button
                        onClick={() => setVisibleCount(INITIAL_COUNT)}
                        className="text-xs font-medium text-cello-muted hover:text-cello-orange transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Einklappen</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
