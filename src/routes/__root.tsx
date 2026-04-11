import type { ReactNode } from "react";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Die Cello.Band – Klassik & Cross-Over" },
      {
        name: "description",
        content:
          "Professionelles Cello-Ensemble aus Karlsruhe. Klassik, Filmmusik, Tango und Rock – für Gala-Veranstaltungen, Konzerte und private Feiern.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body className="bg-white text-cello-text font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
