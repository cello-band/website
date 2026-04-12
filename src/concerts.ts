import flyerKleineKirche2026 from "#media/img/2026.04.15-flyer.png";
import flyerNeckargemuend2026 from "#media/img/2026.10.18-flyer.jpg";

export type ConcertKind =
  | "concert"
  | "church"
  | "streetmusic-tour"
  | "festival"
  | "vernissage";

export interface Concert {
  date: string;
  endDate?: string;
  time?: string;
  title: string;
  venue: string;
  kind: ConcertKind;
  description?: string;
  program?: string[];
  flyerUrl?: string;
}

export const concerts: Concert[] = [
  // ──────────────────────────────────────
  //  UPCOMING
  // ──────────────────────────────────────
  {
    date: "2026-04-15",
    time: "19:30",
    title: "Penderecki · Pütz · Tansman",
    venue: "Kleine Kirche Karlsruhe",
    kind: "concert",
    description:
      "Ein Abend mit Werken von Penderecki, Pütz und Tansman — drei Komponisten, die das Cello-Ensemble auf ganz unterschiedliche Weise herausfordern.",
    program: [
      "Krzysztof Penderecki – Quartett für Celli",
      "Eduard Pütz – Blues Fantasy",
      "Alexandre Tansman – Suite für vier Celli",
    ],
    flyerUrl: flyerKleineKirche2026,
  },
  {
    date: "2026-10-18",
    title: "Konzert in Neckargemünd",
    venue: "Ökumenisches Kirchenzentrum Arche, Neckargemünd",
    kind: "concert",
    description: "Unser zweites Konzert in Neckargemünd — im Rahmen der Reihe Klangraumkonzerte.",
    flyerUrl: flyerNeckargemuend2026,
  },

  // ──────────────────────────────────────
  //  2025
  // ──────────────────────────────────────
  {
    date: "2025-11-16",
    title: "Gottesdienst",
    venue: "Ev. Stadtkirche, Karlsruhe",
    kind: "church",
    program: [
      "Edward Elgar – Nimrod",
      "Arnold Matz – Intermezzo",
      "Franz Schubert – Ständchen",
      "Georg Friedrich Händel – Sarabande",
    ],
  },
  {
    date: "2025-05-31",
    time: "20:00",
    title: "Concerto – Die Cello.Band",
    venue: "Chiesa dell'Annunziata, San Lucido, Italien",
    kind: "concert",
    description:
      "Ein Konzertabend in einer historischen Kirche in Kalabrien — Höhepunkt einer einwöchigen Probenfreizeit in Süditalien.",
    program: [
      "Antonio Vivaldi – Doppelkonzert für zwei Celli",
      "Georg Friedrich Händel – Dixit Dominus",
      "Johann Sebastian Bach – Erbarme dich, mein Gott",
      "George Gershwin – Ein Porträt",
      "Richard Wagner – Isoldes Liebestod",
      "Georges Bizet – Carmen-Suite",
      "Felix Mendelssohn – Denn er hat seinen Engeln befohlen (Zugabe)",
    ],
  },
  {
    date: "2025-05-29",
    title: "Straßenmusik San Lucido",
    venue: "San Lucido, Kalabrien, Italien",
    kind: "streetmusic-tour",
  },
  {
    date: "2025-04-27",
    title: "Gottesdienst",
    venue: "Ev. Stadtkirche, Karlsruhe",
    kind: "church",
  },

  // ──────────────────────────────────────
  //  2024
  // ──────────────────────────────────────
  {
    date: "2024-11-24",
    title: "Gottesdienst – Totensonntag",
    venue: "Kleine Kirche, Karlsruhe",
    kind: "church",
    program: [
      "Richard Wagner – Tannhäuser-Ouvertüre",
      "Georg Friedrich Händel – Sarabande",
      "Astor Piazzolla – Adios Nonino",
    ],
  },
  {
    date: "2024-11-25",
    time: "17:00",
    title: "KIT International Excellence Award",
    venue: "KIT Campus Süd, Karlsruhe",
    kind: "concert",
    description: "Musikalische Umrahmung der Preisverleihung.",
  },
  {
    date: "2024-11-17",
    time: "18:00",
    title: "Konzert in Neckargemünd",
    venue: "Ökumenisches Kirchenzentrum Arche, Neckargemünd",
    kind: "concert",
    description: "Unser erstes abendfüllendes Konzertprogramm mit Werken von der Barockzeit bis heute.",
    program: [
      "Franz Schubert – Ständchen",
      "Johann Sebastian Bach – Chaconne",
      "Johann Sebastian Bach – Erbarme dich, mein Gott",
      "Samuel Barber – Adagio for Strings",
      "José Elizondo – Danzas Latinoamericanas",
      "George Gershwin – Ein Porträt",
      "Casino Royale",
      "Josef Rheinberger – Abendlied (Zugabe)",
    ],
  },
  {
    date: "2024-09-15",
    title: "Eck Kultur Dörfle Fest",
    venue: "Karlsruhe",
    kind: "festival",
  },
  {
    date: "2024-08-24",
    title: "Straßenmusik Leipzig",
    venue: "Leipzig",
    kind: "streetmusic-tour",
  },
  {
    date: "2024-04-14",
    title: "Schützenfest Weingarten – Matinee",
    venue: "Weingarten bei Karlsruhe",
    kind: "festival",
  },
  {
    date: "2024-06-16",
    time: "11:00",
    title: "Watthalden Festival",
    venue: "Watthaldenpark, Ettlingen",
    kind: "festival",
    description: "Open-Air-Konzert auf der überdachten Bühne im Watthaldenpark.",
    program: [
      "Dmitri Schostakowitsch – Walzer Nr. 2",
      "Henry Mancini – The Pink Panther",
      "Apocalyptica – Path",
      "Metallica – Nothing Else Matters",
      "Lalo Schifrin – Mission Impossible",
    ],
  },
  {
    date: "2024-05-05",
    title: "Gottesdienst",
    venue: "Ev. Stadtkirche, Karlsruhe",
    kind: "church",
    program: [
      "Felix Mendelssohn – Vespergesang",
      "Antonio Vivaldi – Frühling, 2. Satz",
      "Antonio Vivaldi – Frühling, 3. Satz",
    ],
  },

  // ──────────────────────────────────────
  //  2023
  // ──────────────────────────────────────
  {
    date: "2023-12-10",
    title: "Atempause-Gottesdienst",
    venue: "Kleine Kirche, Karlsruhe",
    kind: "church",
    program: [
      "Morten Lauridsen – O magnum Mysterium",
      "Sheryl Smith – Phantasy Quintet (Auszüge)",
      "Michael Praetorius – Es ist ein Ros entsprungen",
    ],
  },
  {
    date: "2023-04-16",
    title: "Gottesdienst",
    venue: "Ev. Stadtkirche, Karlsruhe",
    kind: "church",
    program: [
      "Anton Bruckner – Locus Iste",
      "Astor Piazzolla – Fuga y Misterio",
      "Leonard Cohen – Hallelujah",
      "Georg Friedrich Händel – Sarabande",
    ],
  },

  // ──────────────────────────────────────
  //  2022
  // ──────────────────────────────────────
  {
    date: "2022-11-20",
    title: "Gottesdienst – Ewigkeitssonntag",
    venue: "Kleine Kirche, Karlsruhe",
    kind: "church",
    program: [
      "Edvard Grieg – Air & Sarabande",
      "Franz Schubert – Ave Maria",
      "Engelbert Humperdinck – Hänsel und Gretel",
    ],
  },
  {
    date: "2022-10-29",
    title: "Vernissage",
    venue: "Galerie OH, Karlsruhe",
    kind: "vernissage",
  },
  {
    date: "2022-08-27",
    time: "19:00",
    title: "Pfarrgartenkonzert",
    venue: "Ev. Gemeinde Grünwettersbach",
    kind: "concert",
    description: "Open-Air-Konzert im Pfarrhausgarten — unser erstes gebuchtes Konzert mit sechs Celli.",
    program: [
      "Antonio Vivaldi – Concerto (drei Sätze)",
      "Richard Wagner – Lohengrin",
      "Astor Piazzolla – Tangos",
      "Queen – Bohemian Rhapsody",
      "Josef Rheinberger – Abendlied",
    ],
  },
  {
    date: "2022-07-30",
    endDate: "2022-07-31",
    title: "Straßenmusik München",
    venue: "Odeonsplatz & Hofgarten, München",
    kind: "streetmusic-tour",
    description: "Zweitägige Straßenmusik-Tour durch München mit offiziellem Genehmigungsschein.",
  },
  {
    date: "2022-06-19",
    title: "Gottesdienst",
    venue: "Ev. Stadtkirche, Karlsruhe",
    kind: "church",
    program: [
      "Georg Friedrich Händel – Sarabande",
      "Johann Sebastian Bach – Air",
      "Jorge Cardoso – Una Cancion",
      "Astor Piazzolla – La Muerte del Angel",
    ],
  },
  {
    date: "2022-04-23",
    title: "Vernissage",
    venue: "Galerie OH, Karlsruhe",
    kind: "vernissage",
  },

  // ──────────────────────────────────────
  //  2021
  // ──────────────────────────────────────
  {
    date: "2021-12-12",
    title: "Gottesdienst – 3. Advent",
    venue: "Ev. Stadtkirche, Karlsruhe",
    kind: "church",
    description: "Erstmals live auf YouTube gestreamt.",
    program: [
      "Franz Schubert – Ave Maria",
      "Joseph Haydn – Trio (3. Satz)",
      "Engelbert Humperdinck – Hänsel und Gretel",
    ],
  },
  {
    date: "2021-09-24",
    endDate: "2021-09-25",
    title: "Straßenmusik Zürich",
    venue: "Zürich, Schweiz",
    kind: "streetmusic-tour",
    description: "Unser erster internationaler Ausflug — zwei Tage Straßenmusik in Zürich.",
  },

  // ──────────────────────────────────────
  //  2020
  // ──────────────────────────────────────
  {
    date: "2020-11-22",
    title: "Gottesdienst – Ewigkeitssonntag",
    venue: "Ev. Stadtkirche, Karlsruhe",
    kind: "church",
    description: "Erstes Konzert als vollständiges Sextett.",
    program: [
      "Johann Sebastian Bach – Air",
      "Antonio Vivaldi – Konzert (1. & 2. Satz)",
      "Josef Rheinberger – Abendlied",
    ],
  },
  {
    date: "2020-09-13",
    title: "Gottesdienst",
    venue: "Ev. Stadtkirche, Karlsruhe",
    kind: "church",
    description: "Unser erster Gottesdienst.",
    program: [
      "Anton Bruckner – Locus Iste",
      "Gabriel Fauré – Pavane",
      "Johann Sebastian Bach – Air",
      "Astor Piazzolla – Adios Nonino",
    ],
  },
  {
    date: "2020-09-12",
    title: "Eckkulturdörfle",
    venue: "Z10, Karlsruhe",
    kind: "festival",
    program: [
      "John Williams – Star Wars",
      "Dmitri Schostakowitsch – Walzer Nr. 2",
      "Lalo Schifrin – Mission Impossible",
      "The Beatles – Let it Be",
      "Ángel Villoldo – El Choclo",
      "Henry Mancini – The Pink Panther",
    ],
  },

  // ──────────────────────────────────────
  //  2019
  // ──────────────────────────────────────
  {
    date: "2019-06-29",
    title: "KIT Unifest",
    venue: "Karlsruhe",
    kind: "festival",
    description: "Unser erstes Festival — auf der großen Bühne beim Unifest am KIT.",
  },
  {
    date: "2019-06-21",
    time: "19:00",
    title: "Offene Bühne KIT",
    venue: "Festsaal Mensa, KIT, Karlsruhe",
    kind: "concert",
    description: "Unser allererstes öffentliches Konzert.",
  },
];
