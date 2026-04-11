import { stickerRepertoire, stickerMedia, stickerNews, stickerBuchung } from "#media";

const genres = [
  {
    title: "Klassik",
    description: "Virtuosität und Leidenschaft",
    image: stickerRepertoire,
  },
  {
    title: "Filmmusik",
    description: "Cello-Geschichten für die Leinwand",
    image: stickerMedia,
  },
  {
    title: "Tango",
    description: "Leidenschaft in jedem Ton",
    image: stickerNews,
  },
  {
    title: "Rock",
    description: "Kraftvolle Riffs, unverkennbare Beats",
    image: stickerBuchung,
  },
];

export function Repertoire() {
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
        <div className="text-center mb-16">
          <p className="text-white/70 font-medium text-sm uppercase tracking-wider mb-2">
            Repertoire
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Unsere musikalische Reise
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Von klassischen Meisterwerken bis zu modernen Klängen — unsere musikalische
            Reise vereint Leidenschaft und Virtuosität.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.title}
              className="group relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center hover:bg-white/20 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-white/10 p-2">
                <img src={genre.image} alt={genre.title} className="w-full h-full object-contain" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">{genre.title}</h3>
              <p className="text-white/70 text-sm">{genre.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
