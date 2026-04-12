import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";

const ExpandCarouselsContext = createContext(false);
export const ExpandCarouselsProvider = ExpandCarouselsContext.Provider;

let globalImageCounter = 0;

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
  const expandCarousels = useContext(ExpandCarouselsContext);
  const [baseNumber] = useState(() => {
    const n = globalImageCounter + 1;
    globalImageCounter += images.length;
    return n;
  });
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideTarget, setSlideTarget] = useState<number | null>(null);
  const touchRef = useRef<{ x: number; y: number; time: number; locked: boolean } | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const prevIdx = (index - 1 + count) % count;
  const nextIdx = (index + 1) % count;

  // Preload adjacent images
  useEffect(() => {
    if (count <= 1) return;
    for (const i of [prevIdx, nextIdx]) {
      const img = new Image();
      img.src = images[i];
    }
  }, [index, count, images, prevIdx, nextIdx]);

  const resetAutoTimer = useCallback(() => {
    clearTimeout(autoTimerRef.current);
    if (count <= 1) return;
    autoTimerRef.current = setTimeout(() => {
      slideTo((index + 1) % count);
    }, interval);
  }, [count, interval, index]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    resetAutoTimer();
    return () => clearTimeout(autoTimerRef.current);
  }, [resetAutoTimer]);

  function slideTo(target: number) {
    if (isAnimating || target === index) return;
    // Non-adjacent targets (dot clicks): instant jump since strip only has prev/current/next
    if (target !== nextIdx && target !== prevIdx) {
      setIndex(target);
      resetAutoTimer();
      return;
    }
    setSlideTarget(target);
    setIsAnimating(true);
    setDragOffset(0);
  }

  function onTransitionEnd() {
    if (slideTarget !== null) {
      // Batch all state updates to avoid a flash frame
      setIndex(slideTarget);
      setSlideTarget(null);
      setIsAnimating(false);
      setDragOffset(0);
    } else {
      setIsAnimating(false);
      setDragOffset(0);
    }
  }

  // Touch handlers
  function onTouchStart(e: React.TouchEvent) {
    if (isAnimating || count <= 1) return;
    clearTimeout(autoTimerRef.current);
    touchRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
      locked: false,
    };
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!touchRef.current || isAnimating) return;
    const dx = e.touches[0].clientX - touchRef.current.x;
    const dy = e.touches[0].clientY - touchRef.current.y;

    // Determine scroll direction lock on first significant movement
    if (!touchRef.current.locked) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      // If mostly vertical, release to native scroll
      if (Math.abs(dy) > Math.abs(dx)) {
        touchRef.current = null;
        return;
      }
      touchRef.current.locked = true;
    }

    e.preventDefault();
    setDragOffset(dx);
  }

  function onTouchEnd() {
    if (!touchRef.current) return;
    const velocity = touchRef.current.time
      ? dragOffset / (Date.now() - touchRef.current.time)
      : 0;
    const threshold = 40;

    if (dragOffset < -threshold || velocity < -0.3) {
      slideTo(nextIdx);
    } else if (dragOffset > threshold || velocity > 0.3) {
      slideTo(prevIdx);
    } else {
      // Snap back
      setDragOffset(0);
    }
    touchRef.current = null;
    resetAutoTimer();
  }

  if (count === 0) return null;

  // Debug mode: show all images side by side with global numbering
  if (expandCarousels) {
    return (
      <div className="flex flex-wrap gap-2">
        {images.map((src, i) => (
          <div key={i} className="relative">
            <img
              src={src}
              alt={i === 0 ? alt : ""}
              className={`${className ?? ""} max-h-48 w-auto`}
            />
            <span className="absolute top-1 left-1 bg-black/70 text-white text-xs font-mono px-1.5 py-0.5 rounded">
              #{baseNumber + i}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Compute the strip transform.
  // Strip layout: [prev] [current] [next]  — default shows current at -100%.
  let offsetPercent = -100;
  if (slideTarget !== null && dragOffset === 0) {
    // Animating to target
    if (slideTarget === nextIdx) offsetPercent = -200;
    else if (slideTarget === prevIdx) offsetPercent = 0;
    else offsetPercent = -100; // dot-click fallback — crossfade handled separately
  }

  const transform =
    dragOffset !== 0
      ? `translateX(calc(-100% + ${dragOffset}px))`
      : `translateX(${offsetPercent}%)`;

  const shouldTransition = isAnimating && dragOffset === 0;

  return (
    <div
      className="relative group overflow-hidden touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* 3-image sliding strip */}
      <div
        className={`flex ${shouldTransition ? "transition-transform duration-400 ease-out" : ""}`}
        style={{ transform }}
        onTransitionEnd={onTransitionEnd}
      >
        <img
          src={images[prevIdx]}
          alt=""
          className={`${className ?? ""} w-full flex-shrink-0 select-none object-cover aspect-[4/3]`}
          draggable={false}
        />
        <img
          src={images[index]}
          alt={alt}
          className={`${className ?? ""} w-full flex-shrink-0 select-none object-cover aspect-[4/3]`}
          draggable={false}
        />
        <img
          src={images[nextIdx]}
          alt=""
          className={`${className ?? ""} w-full flex-shrink-0 select-none object-cover aspect-[4/3]`}
          draggable={false}
        />
      </div>

      {count > 1 && (
        <>
          {/* Prev / Next buttons — always visible on mobile, hover on desktop */}
          <button
            onClick={() => { slideTo(prevIdx); resetAutoTimer(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            aria-label="Vorheriges Bild"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => { slideTo(nextIdx); resetAutoTimer(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            aria-label="Nächstes Bild"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { slideTo(i); resetAutoTimer(); }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
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
