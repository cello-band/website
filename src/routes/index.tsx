import { createFileRoute } from "@tanstack/react-router";
import { Header } from "#/components/Header";
import { Hero } from "#/components/Hero";
import { About } from "#/components/About";
import { Repertoire } from "#/components/Repertoire";
import { News } from "#/components/News";
import { Booking } from "#/components/Booking";
import { Footer } from "#/components/Footer";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Repertoire />
        <News />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
