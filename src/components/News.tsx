const newsItems = [
  {
    date: "2024",
    title: "Neue Besetzung",
    text: "Die Cello.Band besteht aktuell aus acht CellistInnen. Nach dem Zuwachs proben wir nun an neuem Repertoire und bereiten kommende Auftritte vor.",
  },
  {
    date: "2023",
    title: "Ensemble wächst",
    text: "Im Herbst 2023 erhielt das Ensemble erneut Zuwachs, um die durch berufsbedingten Wegzug entstandenen Lücken zu füllen.",
  },
  {
    date: "2020",
    title: "Erweiterung",
    text: "2020 wurde die Besetzung um zwei weitere feste Mitglieder aus dem KIT-Sinfonieorchester ergänzt.",
  },
];

export function News() {
  return (
    <section id="news" className="py-24 bg-cello-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-cello-orange font-medium text-sm uppercase tracking-wider mb-2">
            News
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cello-dark">
            Aktuelles
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.title}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-2 bg-gradient-to-r from-cello-orange to-cello-amber" />
              <div className="p-8">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-cello-orange bg-cello-orange/10 px-3 py-1 rounded-full mb-4">
                  {item.date}
                </span>
                <h3 className="font-serif text-xl font-bold text-cello-dark mb-3">{item.title}</h3>
                <p className="text-cello-muted leading-relaxed text-sm">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
