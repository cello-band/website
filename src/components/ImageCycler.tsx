import { useState, useEffect, useCallback } from "react";

export function ImageCycler({
  images,
  alt,
  className,
  interval = 5000,
}: {
  images: string[];
  alt: string;
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const count = images.length;

  const goTo = useCallback(
    (i: number) => {
      setFade(false);
      setTimeout(() => {
        setIndex(i);
        setFade(true);
      }, 300);
    },
    []
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      goTo((index + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [index, count, interval, goTo]);

  if (count === 0) return null;

  return (
    <div className="relative group">
      <img
        src={images[index]}
        alt={alt}
        className={`${className ?? ""} transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />

      {count > 1 && (
        <>
          {/* Prev / Next buttons */}
          <button
            onClick={() => goTo((index - 1 + count) % count)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Vorheriges Bild"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo((index + 1) % count)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Nächstes Bild"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Bild ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
