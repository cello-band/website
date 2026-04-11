import { useState } from "react";
import { bandPhoto1, bandCircle } from "#media";

const sections = [
  {
    title: "Gründung",
    content:
      "Die Cello.Band wurde im Frühjahr 2019 von vier Cellisten des KIT-Sinfonieorchesters in Karlsruhe gegründet. Erste Auftritte fanden im selben Jahr bei der Campus-Klassik-Bühne, dem Uni-Fest am KIT und dem Chaos Computer Club in Karlsruhe statt. 2020 wurde die Besetzung um zwei weitere feste Mitglieder aus dem KIT-Sinfonieorchester ergänzt. Durch berufsbedingten Wegzug einiger Musiker erhielt das Ensemble im Herbst 2023 erneut Zuwachs, aktuell besteht die Cello.Band aus fünf CellistInnen, drei davon gehören zu den Gründungsmitgliedern.",
  },
  {
    title: "Was wir spielen",
    content:
      "Von klassischen Meisterwerken über leidenschaftlichen Tango bis hin zu kraftvollen Rock-Arrangements — unser Repertoire kennt keine Grenzen. Wir spielen Filmmusik, Cross-Over und eigene Arrangements, die das Cello in all seinen Facetten zeigen.",
  },
  {
    title: "Auftritte",
    content:
      "Von Gala-Veranstaltungen bis hin zu privaten Feiern bieten wir flexible Buchungsmöglichkeiten für jeden Anlass. Ob als Quartett oder Quintett — wir passen unser Programm individuell an Ihre Wünsche an.",
  },
];

export function About() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={bandPhoto1} alt="Die Cello.Band" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white hidden lg:block">
              <img src={bandCircle} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-cello-orange font-medium text-sm uppercase tracking-wider mb-2">
                Über uns
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-cello-dark">
                Fünf Cellist:innen,
                <br />
                <span className="text-cello-orange">eine Leidenschaft</span>
              </h2>
            </div>

            <div className="space-y-3">
              {sections.map((section, i) => (
                <div key={section.title} className="border border-cello-gray rounded-xl overflow-hidden">
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-cello-gray/50 transition-colors"
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  >
                    <span className="font-serif text-lg font-semibold text-cello-dark">
                      {section.title}
                    </span>
                    <svg
                      className={`w-5 h-5 text-cello-orange transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-4 text-cello-muted leading-relaxed">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
