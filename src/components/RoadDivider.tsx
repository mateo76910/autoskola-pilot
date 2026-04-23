"use client";

/**
 * Infinite-scrolling road with a dashed centerline and a car driving along it.
 * Pure CSS — no JS scroll listeners, no IntersectionObserver.
 * Place between sections as a visual punctuation.
 */
export default function RoadDivider({
  direction = "ltr",
}: {
  direction?: "ltr" | "rtl";
}) {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-16 md:h-20 overflow-hidden bg-surface"
    >
      {/* Asphalt */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 md:h-12 bg-gradient-to-b from-[#2a2f38] to-[#1a1e25]" />

      {/* Dashed centerline */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] road-dash"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #f1c100 0 24px, transparent 24px 56px)",
        }}
      />

      {/* Car */}
      <div
        className={`absolute top-1/2 -translate-y-[130%] ${
          direction === "ltr" ? "road-car-ltr" : "road-car-rtl"
        }`}
      >
        <svg
          width="56"
          height="24"
          viewBox="0 0 56 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={direction === "rtl" ? "scale-x-[-1]" : ""}
        >
          <path
            d="M4 17 L4 12 Q4 10 6 10 L14 10 L18 5 Q19 3 22 3 L38 3 Q40 3 41 5 L44 10 L50 10 Q54 10 54 14 L54 17 Z"
            fill="#003f87"
          />
          <path
            d="M18 5 Q19 3 22 3 L30 3 L30 10 L16.5 10 Z M31 3 L38 3 Q40 3 41 5 L44 10 L31 10 Z"
            fill="#acc7ff"
            opacity="0.85"
          />
          <rect x="2" y="15" width="6" height="3" rx="1" fill="#f1c100" />
          <rect x="48" y="15" width="6" height="3" rx="1" fill="#ba1a1a" />
          <circle cx="14" cy="18" r="4" fill="#1a1e25" />
          <circle cx="14" cy="18" r="1.5" fill="#6b7280" />
          <circle cx="42" cy="18" r="4" fill="#1a1e25" />
          <circle cx="42" cy="18" r="1.5" fill="#6b7280" />
        </svg>
      </div>

      <style jsx>{`
        .road-dash {
          animation: road-scroll 1.2s linear infinite;
        }
        .road-car-ltr {
          animation: car-ltr 9s linear infinite;
        }
        .road-car-rtl {
          animation: car-rtl 9s linear infinite;
        }
        @keyframes road-scroll {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -56px 0;
          }
        }
        @keyframes car-ltr {
          from {
            left: -80px;
          }
          to {
            left: 100%;
          }
        }
        @keyframes car-rtl {
          from {
            left: 100%;
          }
          to {
            left: -80px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .road-dash,
          .road-car-ltr,
          .road-car-rtl {
            animation: none;
          }
          .road-car-ltr,
          .road-car-rtl {
            left: 50%;
            transform: translate(-50%, -130%);
          }
        }
      `}</style>
    </div>
  );
}
