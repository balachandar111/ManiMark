import { useEffect, useRef, useState } from "react";
import "./AnimatedCursor.css";

/**
 * Floating "cursor" that visits each target element in order, forever:
 * YouTube -> Facebook -> Instagram -> Website -> Location, then loops.
 *
 * Positions are measured live from the DOM (via getBoundingClientRect),
 * so it stays lined up with the icons across screen sizes and re-measures
 * on window resize — no hard-coded pixel paths.
 *
 * Props:
 *  - containerRef: ref to the positioned (relative) ancestor the cursor is
 *    absolutely placed inside.
 *  - targetRefs: ordered array of refs to the elements to visit.
 *  - stepMs: time (ms) between stops, including travel time.
 */
export default function AnimatedCursor({ containerRef, targetRefs, stepMs = 1700 }) {
  const cursorRef = useRef(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);
  const [ready, setReady] = useState(false);

  const getPoint = (el) => {
    const container = containerRef.current;
    if (!container || !el) return null;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    return {
      x: eRect.left - cRect.left + eRect.width / 2,
      y: eRect.top - cRect.top + eRect.height / 2,
    };
  };

  const moveTo = (el, withClick = true) => {
    const cursor = cursorRef.current;
    const point = getPoint(el);
    if (!cursor || !point) return;
    cursor.style.left = `${point.x}px`;
    cursor.style.top = `${point.y}px`;
    if (withClick) {
      cursor.classList.remove("hp-cursor-click");
      void cursor.offsetWidth; // restart the ping animation
      cursor.classList.add("hp-cursor-click");
    }
  };

  useEffect(() => {
    const els = targetRefs.map((r) => r.current).filter(Boolean);
    if (els.length < 2) return undefined;

    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.transition = "none";
      moveTo(els[0], false);
      requestAnimationFrame(() => {
        if (cursor) cursor.style.transition = "";
        setReady(true);
      });
    }

    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      indexRef.current = (indexRef.current + 1) % els.length;
      moveTo(els[indexRef.current]);
      timeoutRef.current = setTimeout(step, stepMs);
    };

    timeoutRef.current = setTimeout(step, stepMs);

    const handleResize = () => moveTo(els[indexRef.current], false);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, targetRefs, stepMs]);

  return (
    <div
      className={`hp-cursor ${ready ? "hp-cursor-visible" : ""}`}
      ref={cursorRef}
      aria-hidden="true"
    >
      <span className="hp-cursor-ring" />
      <svg viewBox="0 0 24 24" className="hp-cursor-arrow" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 2.5 19.5 10 12.6 12.1 10 19.5 4 2.5Z"
          fill="#2a1420"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}