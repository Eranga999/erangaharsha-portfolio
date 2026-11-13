import { useEffect, useRef } from "react";
import "./hero-artwork.css";

const cx = 300,
  cy = 260,
  radius = 116;
const seeds = [
  [-72, -66],
  [4, -85],
  [74, -52],
  [-91, 4],
  [-30, -26],
  [43, -10],
  [94, 27],
  [-63, 68],
  [1, 42],
  [61, 86],
  [-10, 103],
  [8, 0],
  [-103, -48],
  [105, -12],
  [-42, 92],
  [42, 108],
];
type Point = [number, number];
// Voronoi cuts form irregular, perfectly fitting fragments of the same shaded sphere.
const fragments = seeds.map(([sx, sy], index) => {
  let polygon: Point[] = [
    [-130, -130],
    [130, -130],
    [130, 130],
    [-130, 130],
  ];
  seeds.forEach(([ox, oy], other) => {
    if (other === index) return;
    const nx = ox - sx,
      ny = oy - sy,
      limit = (ox * ox + oy * oy - sx * sx - sy * sy) / 2;
    const next: Point[] = [];
    polygon.forEach((a, i) => {
      const b = polygon[(i + 1) % polygon.length];
      const da = a[0] * nx + a[1] * ny - limit,
        db = b[0] * nx + b[1] * ny - limit;
      if (da <= 0) next.push(a);
      if (da <= 0 !== db <= 0) {
        const t = da / (da - db);
        next.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    });
    polygon = next;
  });
  const angle = Math.atan2(sy, sx);
  return {
    sx,
    sy,
    polygon: polygon.map(([x, y]) => x + cx + "," + (y + cy)).join(" "),
    dx: Math.cos(angle) * (80 + (index % 3) * 16),
    dy: Math.sin(angle) * (73 + (index % 3) * 12),
    spin: (index % 2 ? 1 : -1) * (18 + index * 3),
  };
});
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};
export default function HeroArtwork() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current!;
    const ball = el.querySelector<SVGGElement>("[data-ball]")!;
    const shards = [...el.querySelectorAll<SVGGElement>("[data-shard]")];
    const cursors = [...el.querySelectorAll<SVGGElement>("[data-cursor]")];
    const shadow = el.querySelector<SVGEllipseElement>("[data-shadow]")!;
    const ring = el.querySelector<SVGCircleElement>("[data-ring]")!;
    const desktop = matchMedia("(min-width: 901px)");
    let frame = 0,
      last = 0,
      elapsed = 0;
    function render(time: number, still = false) {
      const t = still ? 8.6 : time % 18;
      const phase =
        t < 2.7
          ? "bounce"
          : t < 5
            ? "burst"
            : t < 14.5
              ? "rebuild"
              : "complete";
      el.dataset.phase = phase;
      const fade = still ? 1 : Math.min(clamp(t / 0.25), clamp((18 - t) / 0.4));
      el.style.opacity = String(fade);
      let y = 0,
        x = 0,
        sx = 1,
        sy = 1;
      if (t < 0.85) {
        const p = t / 0.85;
        y = -390 + 430 * p * p;
        x = 95 * (1 - p);
      } else if (t < 1.05) {
        const p = (t - 0.85) / 0.2;
        sx = 1 + 0.18 * Math.sin(p * Math.PI);
        sy = 1 - 0.19 * Math.sin(p * Math.PI);
        y = 40 + radius * (1 - sy);
      } else if (t < 1.9) {
        const p = (t - 1.05) / 0.85;
        y = 40 - 125 * Math.sin(p * Math.PI);
      } else if (t < 2.1) {
        const p = (t - 1.9) / 0.2;
        sx = 1 + 0.09 * Math.sin(p * Math.PI);
        sy = 1 - 0.1 * Math.sin(p * Math.PI);
        y = 40 + radius * (1 - sy);
      } else if (t < 2.7) {
        const p = (t - 2.1) / 0.6;
        y = 40 * (1 - smooth(p)) - 25 * Math.sin(p * Math.PI);
      } else if (t >= 14.5) {
        y = -5 * Math.sin((t - 14.5) * 1.6);
      }
      const assembled = t < 2.85 || t >= 14.5;
      ball.style.opacity = assembled ? "1" : "0";
      ball.setAttribute(
        "transform",
        "translate(" +
          (cx + x) +
          " " +
          (cy + y) +
          ") scale(" +
          sx +
          " " +
          sy +
          ") translate(" +
          -cx +
          " " +
          -cy +
          ")",
      );
      shadow.setAttribute(
        "rx",
        String(assembled ? 85 + Math.max(-55, y * 0.3) : 130),
      );
      shadow.style.opacity = String(
        assembled ? Math.max(0.08, 0.27 + y * 0.002) : 0.14,
      );
      const blast = clamp((t - 2.85) / 0.65),
        burst = 1 - Math.pow(1 - blast, 3);
      const wave = clamp((t - 2.85) / 0.8);
      ring.setAttribute("r", String(116 + wave * 116));
      ring.style.opacity = String(
        t >= 2.85 && t < 3.65 ? (1 - wave) * 0.35 : 0,
      );
      fragments.forEach((p, i) => {
        const carry = smooth((t - 5.15 - i * 0.17) / 2.55),
          amount = burst * (1 - carry);
        const dx = p.dx * amount,
          dy = p.dy * amount,
          angle = p.spin * amount;
        shards[i].style.opacity = assembled ? "0" : "1";
        shards[i].setAttribute(
          "transform",
          "translate(" +
            dx +
            " " +
            dy +
            ") rotate(" +
            angle +
            " " +
            (cx + p.sx) +
            " " +
            (cy + p.sy) +
            ")",
        );
        const arrive = smooth((t - 4.15 - i * 0.055) / 0.8),
          leave = smooth((t - 13.9 - i * 0.02) / 0.55);
        const offset = (1 - arrive + leave) * 55,
          side = i % 2 ? 1 : -1;
        cursors[i].setAttribute(
          "transform",
          "translate(" +
            (cx + p.sx + dx + offset * side) +
            " " +
            (cy + p.sy + dy - offset) +
            ")",
        );
        cursors[i].style.opacity = String(still ? 0.72 : arrive * (1 - leave));
        cursors[i].querySelector("circle")!.style.opacity = String(
          arrive * (1 - carry) * 0.7,
        );
      });
    }
    function tick(now: number) {
      elapsed += last ? Math.min((now - last) / 1000, 0.08) : 0;
      last = now;
      render(elapsed);
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      if (desktop.matches) frame = requestAnimationFrame(tick);
    }
    desktop.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      desktop.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div className="hero-artwork sphere-artwork" ref={root} aria-hidden="true">
      <svg viewBox="0 0 600 520" fill="none" className="sphere-scene">
        <defs>
          <radialGradient id="pearl" cx=".32" cy=".22" r=".78">
            <stop stopColor="#ffffff" />
            <stop offset=".3" stopColor="#f5f5ef" />
            <stop offset=".62" stopColor="#d9dcd6" />
            <stop offset=".84" stopColor="#8d958b" />
            <stop offset="1" stopColor="#394338" />
          </radialGradient>
          <radialGradient id="pearl-sheen" cx=".3" cy=".2" r=".65">
            <stop stopColor="#fff" stopOpacity=".8" />
            <stop offset=".4" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ground-shadow">
            <stop stopColor="#000" stopOpacity=".9" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sphere-halo">
            <stop stopColor="#c8dd9d" stopOpacity=".075" />
            <stop offset="1" stopColor="#c8dd9d" stopOpacity="0" />
          </radialGradient>
          <g id="whole-pearl">
            <circle cx={cx} cy={cy} r={radius} fill="url(#pearl)" />
            <circle cx={cx} cy={cy} r={radius} fill="url(#pearl-sheen)" />
            <circle
              cx={cx}
              cy={cy}
              r={radius - 0.5}
              stroke="#ffffff"
              strokeOpacity=".16"
            />
          </g>
          {fragments.map((p, i) => (
            <clipPath key={i} id={"pearl-cut-" + i}>
              <polygon points={p.polygon} />
            </clipPath>
          ))}
        </defs>
        <ellipse cx="300" cy="280" rx="265" ry="235" fill="url(#sphere-halo)" />
        <ellipse
          data-shadow
          cx="300"
          cy="425"
          rx="85"
          ry="22"
          fill="url(#ground-shadow)"
        />
        <circle
          data-ring
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#e3fc77"
          strokeWidth="1"
          opacity="0"
        />
        <g data-ball>
          <use href="#whole-pearl" />
        </g>
        {fragments.map((p, i) => (
          <g key={i} data-shard opacity="0" className="pearl-fragment">
            <g clipPath={"url(#pearl-cut-" + i + ")"}>
              <use href="#whole-pearl" />
              <polygon
                points={p.polygon}
                stroke="#fff"
                strokeWidth="1"
                strokeOpacity=".3"
              />
            </g>
          </g>
        ))}
        {fragments.map((_, i) => (
          <g key={i} data-cursor opacity="0" className="pearl-cursor">
            <path
              className="cursor-ray"
              d="M18 0L40 -13"
              stroke={i % 3 === 0 ? "#e3fc77" : "#e8eee1"}
              strokeWidth="1.5"
              strokeDasharray="3 4"
              strokeLinecap="round"
            />
            <circle
              r="12"
              stroke={
                i % 4 === 0
                  ? "#e3fc77"
                  : i % 4 === 1
                    ? "#b6a0f4"
                    : i % 4 === 2
                      ? "#8bd5bc"
                      : "#f1c39c"
              }
              strokeWidth="1"
              fill="#e3fc7710"
            />
            <path
              d="M0 0L3.5 21l5.5-6 6 10 4-2.5-6-10 9-2Z"
              fill={
                i % 4 === 0
                  ? "#e3fc77"
                  : i % 4 === 1
                    ? "#b6a0f4"
                    : i % 4 === 2
                      ? "#8bd5bc"
                      : "#f1c39c"
              }
              stroke="#20271c"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
