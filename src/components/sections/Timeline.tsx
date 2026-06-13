"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  n: number;
  title: string;
  sub: string;
  duration: string;
};

const steps: Step[] = [
  { n: 1, title: "Upis", sub: "Prijava i papirologija", duration: "1 dan" },
  { n: 2, title: "Liječnički", sub: "Pregled kod doktora", duration: "1 dan" },
  {
    n: 3,
    title: "Propisi",
    sub: "Predavanja i ispit",
    duration: "2–3 tjedna",
  },
  {
    n: 4,
    title: "Vožnja",
    sub: "Min. 35 sati nastave",
    duration: "4–6 tjedana",
  },
  { n: 5, title: "Prva pomoć", sub: "Tečaj i ispit", duration: "1 dan" },
  { n: 6, title: "Ispit vožnje", sub: "Položi i kreni!", duration: "Završno" },
];

const ink = "#003f87";
const navySoft = "#0056b3";
const accent = "#ffe08b";
const accentDeep = "#f1c100";

export default function Timeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(
    typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let started = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          started = false;
          setInView(false);
          return;
        }
        if (!started && entry.intersectionRatio >= 0.4) {
          started = true;
          setInView(true);
        }
      },
      { threshold: [0, 0.4], rootMargin: "0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proces"
      className="relative py-20 md:py-28 bg-surface-container-low overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase">
            Preciznost u pokretu
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mt-2 leading-tight">
            Kako do vozačke u{" "}
            <span className="text-primary-container italic">6 koraka</span>
          </h2>
          <p className="text-on-surface-variant mt-4 max-w-xl mx-auto">
            Bez stresa — vodimo te kroz cijeli proces, od upisa do položenog
            ispita.
          </p>
        </div>

        <DesktopSerpentine active={inView} />
        <MobileSerpentine active={inView} />

        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-sm font-bold tracking-widest uppercase text-on-surface-variant">
            ~10 do 12 tjedana do vozačke
          </span>
          <a
            href="#upis"
            className="pilot-gradient text-on-primary px-6 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-all"
          >
            Upiši se
          </a>
        </div>
      </div>
    </section>
  );
}

function DesktopSerpentine({ active: running }: { active: boolean }) {
  const W = 1200;
  const H = 820;
  const rowY = [240, 460, 680];
  const leftX = 180;
  const rightX = W - 180;

  const nodePos = [
    { x: leftX, y: rowY[0] },
    { x: rightX, y: rowY[0] },
    { x: rightX, y: rowY[1] },
    { x: leftX, y: rowY[1] },
    { x: leftX, y: rowY[2] },
    { x: rightX, y: rowY[2] },
  ];

  const pathD =
    `M ${nodePos[0].x} ${nodePos[0].y}` +
    ` L ${nodePos[1].x} ${nodePos[1].y}` +
    ` C ${rightX + 90} ${rowY[0]}, ${rightX + 90} ${rowY[1]}, ${nodePos[2].x} ${nodePos[2].y}` +
    ` L ${nodePos[3].x} ${nodePos[3].y}` +
    ` C ${leftX - 90} ${rowY[1]}, ${leftX - 90} ${rowY[2]}, ${nodePos[4].x} ${nodePos[4].y}` +
    ` L ${nodePos[5].x} ${nodePos[5].y}`;

  const [active, setActive] = useState(0);
  const [carT, setCarT] = useState(0);
  const [pathLen, setPathLen] = useState(0);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [carPos, setCarPos] = useState({
    x: nodePos[0].x,
    y: nodePos[0].y,
    angle: 0,
  });

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const start = performance.now();
    const dur = 14000;
    const tick = (now: number) => {
      const t = ((now - start) % dur) / dur;
      setCarT(t);
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        if (len > 0) {
          setPathLen(len);
          const p1 = path.getPointAtLength(t * len);
          const p2 = path.getPointAtLength(Math.min(len, t * len + 1));
          const angle =
            (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
          setCarPos({ x: p1.x, y: p1.y, angle });

          let bestI = 0;
          let bestD = Infinity;
          nodePos.forEach((n, i) => {
            const d = (n.x - p1.x) ** 2 + (n.y - p1.y) ** 2;
            if (d < bestD) {
              bestD = d;
              bestI = i;
            }
          });
          if (bestD < 80 * 80) setActive(bestI);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // nodePos is stable across renders within this component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <div className="hidden md:block relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute inset-0">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0"
        >
          <defs>
            <pattern
              id="tl-grid-d"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#0E162808"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="tl-road-d" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={ink} />
              <stop offset="100%" stopColor={navySoft} />
            </linearGradient>
            <filter
              id="tl-glow-d"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width={W} height={H} fill="url(#tl-grid-d)" />

          <path
            d={pathD}
            fill="none"
            stroke="#0E162810"
            strokeWidth="58"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0,6)"
          />
          <path
            d={pathD}
            fill="none"
            stroke="url(#tl-road-d)"
            strokeWidth="50"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeDasharray="14 18"
            strokeLinecap="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke={accentDeep}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={
              pathLen ? `${carT * pathLen} 99999` : "0 99999"
            }
            opacity="0.55"
            filter="url(#tl-glow-d)"
          />

          {nodePos.map((p, i) => {
            const s = steps[i];
            const isActive = i === active;
            const isPast = i < active;
            const fill = isActive ? accent : isPast ? ink : "#ffffff";
            const textColor = isActive ? ink : isPast ? "#ffffff" : ink;
            return (
              <g key={i} transform={`translate(${p.x} ${p.y})`}>
                {isActive && (
                  <circle
                    r="36"
                    fill="none"
                    stroke={accent}
                    strokeWidth="6"
                    opacity="0.35"
                  />
                )}
                <circle
                  r="32"
                  fill={fill}
                  stroke={isActive ? "#ffffff" : ink}
                  strokeWidth="4"
                  style={{ transition: "all 0.4s" }}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="24"
                  fontWeight="800"
                  fill={textColor}
                  fontFamily="var(--font-headline)"
                >
                  {s.n}
                </text>
              </g>
            );
          })}

          <g
            transform={`translate(${carPos.x} ${carPos.y}) rotate(${carPos.angle})`}
          >
            <CarTopDown />
          </g>
        </svg>

        {nodePos.map((p, i) => {
          const s = steps[i];
          const isActive = i === active;
          const xPct = (p.x / W) * 100;
          const yPct = (p.y / H) * 100;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                transform: "translate(-50%, 0)",
                pointerEvents: "none",
              }}
            >
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-[200px] rounded-2xl px-4 py-3 text-center shadow-md transition-all bg-surface-container-lowest border ${
                  isActive
                    ? "border-tertiary-fixed-dim shadow-xl"
                    : "border-outline-variant/40"
                }`}
                style={{ bottom: "56px" }}
              >
                <div className="font-headline text-[11px] font-bold tracking-widest uppercase text-tertiary">
                  {s.duration}
                </div>
                <div className="font-headline text-lg font-extrabold text-primary leading-tight mt-1">
                  {s.title}
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  {s.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function MobileSerpentine({ active: running }: { active: boolean }) {
  const PW = 360;
  const PH = 720;
  const padTop = 40;
  const padBottom = 40;
  const usableH = PH - padTop - padBottom;
  const stepGap = usableH / (steps.length - 1);
  const centerX = PW / 2;
  const swing = 70;

  const nodePos = steps.map((_, i) => ({
    x: centerX + (i % 2 === 0 ? -swing : swing),
    y: padTop + i * stepGap,
  }));

  const pathD = (() => {
    let d = `M ${nodePos[0].x} ${nodePos[0].y}`;
    for (let i = 1; i < nodePos.length; i++) {
      const a = nodePos[i - 1];
      const b = nodePos[i];
      const cy1 = a.y + (b.y - a.y) * 0.55;
      const cy2 = a.y + (b.y - a.y) * 0.45;
      d += ` C ${a.x} ${cy1}, ${b.x} ${cy2}, ${b.x} ${b.y}`;
    }
    return d;
  })();

  const [active, setActive] = useState(0);
  const [carT, setCarT] = useState(0);
  const [pathLen, setPathLen] = useState(0);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [carPos, setCarPos] = useState({
    x: nodePos[0].x,
    y: nodePos[0].y,
    angle: 90,
  });

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) % 12000) / 12000;
      setCarT(t);
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        if (len > 0) {
          setPathLen(len);
          const p1 = path.getPointAtLength(t * len);
          const p2 = path.getPointAtLength(Math.min(len, t * len + 1));
          setCarPos({
            x: p1.x,
            y: p1.y,
            angle: (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI,
          });
          let bestI = 0;
          let bestD = Infinity;
          nodePos.forEach((n, i) => {
            const d = (n.x - p1.x) ** 2 + (n.y - p1.y) ** 2;
            if (d < bestD) {
              bestD = d;
              bestI = i;
            }
          });
          if (bestD < 50 * 50) setActive(bestI);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <div className="md:hidden relative w-full max-w-sm mx-auto">
      <div className="relative" style={{ aspectRatio: `${PW} / ${PH}` }}>
        <svg
          viewBox={`0 0 ${PW} ${PH}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0"
        >
          <defs>
            <linearGradient id="tl-road-m" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ink} />
              <stop offset="100%" stopColor={navySoft} />
            </linearGradient>
            <filter
              id="tl-glow-m"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={pathD}
            fill="none"
            stroke="#0E162810"
            strokeWidth="34"
            strokeLinecap="round"
            transform="translate(0,4)"
          />
          <path
            d={pathD}
            fill="none"
            stroke="url(#tl-road-m)"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeDasharray="8 11"
            strokeLinecap="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke={accentDeep}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={pathLen ? `${carT * pathLen} 99999` : "0 99999"}
            opacity="0.55"
            filter="url(#tl-glow-m)"
          />

          {nodePos.map((p, i) => {
            const s = steps[i];
            const isActive = i === active;
            const isPast = i < active;
            const fill = isActive ? accent : isPast ? ink : "#ffffff";
            const textColor = isActive ? ink : isPast ? "#ffffff" : ink;
            return (
              <g key={i} transform={`translate(${p.x} ${p.y})`}>
                {isActive && (
                  <circle
                    r="22"
                    fill="none"
                    stroke={accent}
                    strokeWidth="4"
                    opacity="0.35"
                  />
                )}
                <circle
                  r="18"
                  fill={fill}
                  stroke={isActive ? "#ffffff" : ink}
                  strokeWidth="2.5"
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="13"
                  fontWeight="800"
                  fill={textColor}
                  fontFamily="var(--font-headline)"
                >
                  {s.n}
                </text>
              </g>
            );
          })}

          <g
            transform={`translate(${carPos.x} ${carPos.y}) rotate(${carPos.angle + 90})`}
          >
            <CarTopDownMobile />
          </g>
        </svg>

        {nodePos.map((p, i) => {
          const s = steps[i];
          const isActive = i === active;
          const cardOnRight = i % 2 === 0;
          const yPct = (p.y / PH) * 100;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${yPct}%`,
                [cardOnRight ? "left" : "right"]: "8px",
                transform: "translateY(-50%)",
                width: "44%",
                pointerEvents: "none",
              }}
            >
              <div
                className={`rounded-xl px-3 py-2 shadow-sm bg-surface-container-lowest border transition-all ${
                  isActive
                    ? "border-tertiary-fixed-dim shadow-md"
                    : "border-outline-variant/40"
                } ${cardOnRight ? "text-left" : "text-right"}`}
              >
                <div className="font-headline text-[10px] font-bold tracking-widest uppercase text-tertiary">
                  {s.duration}
                </div>
                <div className="font-headline text-sm font-extrabold text-primary leading-tight mt-0.5">
                  {s.title}
                </div>
                <div className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                  {s.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <span className="text-xs font-semibold text-on-surface-variant">
          Korak {active + 1}: {steps[active].title}
        </span>
      </div>
    </div>
  );
}

function CarTopDown() {
  return (
    <g transform="translate(-28 -16)">
      <ellipse cx="28" cy="29" rx="22" ry="3" fill="#0E162844" />
      <rect x="4" y="6" width="48" height="20" rx="6" fill={accentDeep} />
      <rect x="38" y="9" width="10" height="14" rx="2" fill="#0E1628" opacity="0.85" />
      <rect x="9" y="9" width="10" height="14" rx="2" fill="#0E1628" opacity="0.85" />
      <rect x="22" y="9" width="12" height="14" rx="2" fill="#0E1628" opacity="0.4" />
      <circle cx="51" cy="11" r="1.5" fill="#fff" />
      <circle cx="51" cy="21" r="1.5" fill="#fff" />
    </g>
  );
}

function CarTopDownMobile() {
  return (
    <g transform="translate(-11 -18)">
      <ellipse cx="11" cy="34" rx="9" ry="2" fill="#0E162844" />
      <rect x="0" y="2" width="22" height="32" rx="5" fill={accentDeep} />
      <rect x="2" y="5" width="18" height="8" rx="2" fill="#0E1628" opacity="0.85" />
      <rect x="2" y="23" width="18" height="8" rx="2" fill="#0E1628" opacity="0.85" />
      <rect x="2" y="14" width="18" height="8" rx="2" fill="#0E1628" opacity="0.4" />
      <circle cx="4" cy="3.5" r="0.8" fill="#fff" />
      <circle cx="18" cy="3.5" r="0.8" fill="#fff" />
    </g>
  );
}
