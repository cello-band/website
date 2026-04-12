import concertsData from "#/concerts.json";

interface Concert {
  date: string;
  time: string;
  title: string;
  venue: string;
}

export function AnnouncementBar() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcoming = (concertsData as Concert[])
    .filter((c) => new Date(c.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcoming.length === 0) return null;

  const next = upcoming[0];
  const concertDate = new Date(next.date);
  const diffDays = Math.ceil(
    (concertDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  const countdown =
    diffDays === 0
      ? "Heute!"
      : diffDays === 1
        ? "Morgen!"
        : `In ${diffDays} Tagen`;

  const dateStr = concertDate.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
  });

  return (
    <a
      href="#concerts"
      className="block bg-gradient-to-r from-cello-orange to-cello-amber text-white text-center text-sm font-medium py-2.5 px-4 hover:brightness-110 transition-all duration-300"
    >
      <span className="inline-flex items-center gap-2 flex-wrap justify-center">
        <span className="whitespace-nowrap">Konzert am {dateStr}</span>
        <span className="whitespace-nowrap">· {next.venue}</span>
        <span className="whitespace-nowrap font-bold">· {countdown}</span>
        <span>→</span>
      </span>
    </a>
  );
}
