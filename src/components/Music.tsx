export function Music() {
  return (
    <section id="music" className="py-24 bg-cello-gray">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-cello-orange font-medium text-sm uppercase tracking-wider mb-2">
            Reinhören
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cello-dark">
            Unsere <span className="text-cello-orange">Musik</span>
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1270822345&color=%23C86A1F&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
              title="Adios Nonino – Astor Piazzola – Cello.Band"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2300883116&color=%23C86A1F&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
              title="Wilhelm Tell – Cello.Band"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://soundcloud.com/cello-band"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cello-orange font-medium hover:text-cello-brown transition-colors duration-300"
          >
            Mehr auf SoundCloud
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
