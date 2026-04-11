import { bandPhoto1, bandCircle, photoHouseConcert, photoEarlyLineup, photoFormalHall, photoVillaRehearsal } from "#media";
import { ImageCycler } from "./ImageCycler";

export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageCycler
                images={[bandPhoto1, photoHouseConcert, photoEarlyLineup, photoFormalHall, photoVillaRehearsal]}
                alt="Die Cello.Band"
                className="w-full h-auto"
                interval={5000}
              />
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
                Acht Cellist:innen,
                <br />
                <span className="text-cello-orange">eine Leidenschaft</span>
              </h2>
            </div>

            <div className="space-y-4 text-cello-muted leading-relaxed">
              <p>
                Die Cello.Band wurde Anfang 2019 als Celloquartett von vier Musikern des
                KIT-Sinfonieorchesters in Karlsruhe gegründet. Schon wenige Wochen nach der
                ersten Probe spielte die Band beim Chaos Computer Club, auf der
                Campus-Klassik-Bühne und beim Uni-Fest am KIT.
              </p>
              <p>
                2020 wuchs das Quartett zum Sextett, und mit der größeren Besetzung
                wuchsen auch die klanglichen Möglichkeiten. 2023 kamen zwei weitere
                Mitglieder dazu.
              </p>
              <p>
                Heute besteht die Cello.Band aus acht CellistInnen — vier davon gehören zu
                den Gründungsmitgliedern. Unser Programm reicht von Bachs Chaconne über
                Piazzollas Tangos und Filmmusik-Klassiker wie James Bond und Star Wars bis
                hin zu zeitgenössischer Celloensemble-Literatur von Penderecki, Tansman und
                Matz. Je nach Anlass spielen wir als Quartett, Quintett, Sextett oder im
                vollen Oktett.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
