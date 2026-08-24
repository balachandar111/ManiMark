import { useEffect, useRef, useState } from "react";
import "./Homepage.css";

function AnimatedCursor({
  containerRef,
  targetRefs,
  stepMs = 1700,
}) {
  const cursorRef = useRef(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);
  const [ready, setReady] = useState(false);

  const getPoint = (element) => {
    const container = containerRef.current;

    if (!container || !element) {
      return null;
    }

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    return {
      x:
        elementRect.left -
        containerRect.left +
        elementRect.width / 2,
      y:
        elementRect.top -
        containerRect.top +
        elementRect.height / 2,
    };
  };

  const moveTo = (element, withClick = true) => {
    const cursor = cursorRef.current;
    const point = getPoint(element);

    if (!cursor || !point) {
      return;
    }

    cursor.style.left = `${point.x}px`;
    cursor.style.top = `${point.y}px`;

    if (withClick) {
      cursor.classList.remove("hp-cursor-click");

      // Restart the ripple animation.
      void cursor.offsetWidth;

      cursor.classList.add("hp-cursor-click");
    }
  };

  useEffect(() => {
    const elements = targetRefs
      .map((ref) => ref.current)
      .filter(Boolean);

    if (elements.length < 2) {
      return undefined;
    }

    const cursor = cursorRef.current;

    indexRef.current = 0;

    if (cursor) {
      cursor.style.transition = "none";
      moveTo(elements[0], false);

      requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transition = "";
        }

        setReady(true);
      });
    }

    let cancelled = false;

    const step = () => {
      if (cancelled) {
        return;
      }

      indexRef.current =
        (indexRef.current + 1) % elements.length;

      moveTo(elements[indexRef.current]);

      timeoutRef.current = setTimeout(step, stepMs);
    };

    timeoutRef.current = setTimeout(step, stepMs);

    const handleResize = () => {
      moveTo(elements[indexRef.current], false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [targetRefs, stepMs]);

  return (
    <div
      ref={cursorRef}
      className={`hp-cursor ${
        ready ? "hp-cursor-visible" : ""
      }`}
      aria-hidden="true"
    >
      <span className="hp-cursor-ring" />

      <svg
        viewBox="0 0 24 24"
        className="hp-cursor-arrow"
        xmlns="http://www.w3.org/2000/svg"
      >
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

const Homepage = () => {
  const homepageRef = useRef(null);

  const youtubeRef = useRef(null);
  const facebookRef = useRef(null);
  const instagramRef = useRef(null);
  const websiteRef = useRef(null);
  const locationRef = useRef(null);

  const cursorTargets = [
    youtubeRef,
    facebookRef,
    instagramRef,
    websiteRef,
    locationRef,
  ];

  return (
    <main
      ref={homepageRef}
      className="homepage-container"
    >
      {/* Background decoration */}
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <div className="decorative-shape">
        <div className="decorative-inner-circle" />
      </div>

      {/* Header */}
      <header className="header-section">
        <div className="logo-wrapper">
          <img
            src="/assets/manimark-logo.png"
            alt="Arcot Mani Mark logo"
            className="logo-img"
          />
        </div>

        <div className="title-wrapper">
          <h1>
            ARCOT MANIMARK
            <span>FOODS PRIVATE LTD.,</span>
          </h1>
        </div>
      </header>

      {/* Main card */}
      <section className="main-card">
        <h2>CONNECT WITH US !</h2>

        <div className="social-row">
          {/* YouTube */}
          <a
            ref={youtubeRef}
            href="#youtube"
            className="social-icon youtube-icon"
            aria-label="YouTube"
          >
            <svg
              viewBox="0 0 24 24"
              className="icon-svg"
              fill="currentColor"
            >
              <path d="M21.58 6.19a2.75 2.75 0 0 0-1.77-1.77C18.25 4 12 4 12 4s-6.25 0-7.81.42a2.75 2.75 0 0 0-1.77 1.77C2 7.75 2 12 2 12s0 4.25.42 5.81a2.75 2.75 0 0 0 1.77 1.77C5.75 20 12 20 12 20s6.25 0 7.81-.42a2.75 2.75 0 0 0 1.77-1.77C22 16.25 22 12 22 12s0-4.25-.42-5.81ZM9.7 15.5v-7l6 3.5-6 3.5Z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            ref={facebookRef}
            href="#facebook"
            className="social-icon facebook-icon"
            aria-label="Facebook"
          >
            <svg
              viewBox="0 0 24 24"
              className="icon-svg"
              fill="currentColor"
            >
              <path d="M14.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.25-1.6 1.65-1.6h1.65V4.8c-.3 0-1.3-.13-2.5-.13-2.5 0-4.2 1.52-4.2 4.3V11H8v3h3.1v8h3.4Z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            ref={instagramRef}
            href="#instagram"
            className="social-icon instagram-icon"
            aria-label="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              className="icon-svg instagram-svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
              />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.4"
                cy="6.7"
                r="0.8"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>

          {/* Website */}
          <a
            ref={websiteRef}
            href="#website"
            className="social-icon website-icon"
            aria-label="Website"
          >
            <svg
              viewBox="0 0 24 24"
              className="icon-svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9.5" />
              <path d="M2.5 12h19M12 2.5c2.3 2.6 3.5 5.8 3.5 9.5s-1.2 6.9-3.5 9.5c-2.3-2.6-3.5-5.8-3.5-9.5s1.2-6.9 3.5-9.5Z" />
            </svg>
          </a>
        </div>

        <h2>REACH US !</h2>

        {/* Location */}
        <a
          ref={locationRef}
          className="address-box"
          href="https://www.google.com/maps/search/?api=1&query=Arcot+Manimark+Foods+Narayanapuram+Tamil+Nadu+632507"
          target="_blank"
          rel="noreferrer"
          aria-label="Open location in Google Maps"
        >
          <div className="address-icon-wrapper">
            <svg
              className="address-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
            </svg>
          </div>

          <p>
            S.F.No. 870/5, Narayanapuram
            <br />
            Village, Kannamangalam Road,
            <br />
            Kavanoor Post, Arcot Taluk,
            <br />
            Ranipet District, Tamil Nadu -
            <br />
            632507
          </p>
        </a>
      </section>

      {/* Product image */}
      <div className="product-strip">
        <img
          src="/assets/product-strip.png"
          alt="Peanut candy chikki"
          className="product-img"
        />
      </div>

      {/* Embedded animated cursor */}
      <AnimatedCursor
        containerRef={homepageRef}
        targetRefs={cursorTargets}
        stepMs={1700}
      />
    </main>
  );
};

export default Homepage;