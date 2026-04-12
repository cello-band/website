import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Header } from "#/components/Header";
import { Hero } from "#/components/Hero";
import { Concerts } from "#/components/Concerts";
import { About } from "#/components/About";
import { Music } from "#/components/Music";
import { Repertoire } from "#/components/Repertoire";
import { Booking } from "#/components/Booking";
import { Footer } from "#/components/Footer";
import { ExpandCarouselsProvider } from "#/components/ImageCycler";

export const Route = createFileRoute("/")({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>) => ({
    ...("preview" in search ? { preview: true as const } : {}),
    ...("expandCarousels" in search ? { expandCarousels: true as const } : {}),
  }),
});

function HomePage() {
  const { preview, expandCarousels } = useSearch({ from: "/" }) as { preview?: true; expandCarousels?: true };
  return (
    <ExpandCarouselsProvider value={!!expandCarousels}>
      <Header />
      <main>
        <Hero />
        <Concerts />
        <About />
        <Music />
        {preview && <Repertoire />}
        <Booking />
      </main>
      <Footer />
    </ExpandCarouselsProvider>
  );
}
