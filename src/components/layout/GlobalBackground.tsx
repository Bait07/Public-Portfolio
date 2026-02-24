import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

/* ── Syntax-highlighted code tokens ─────────────────────────────────── */
type Token = { t: string; c: string };

const C = {
  kw:    "var(--code-kw)",    // keywords
  str:   "var(--code-str)",   // strings
  cmt:   "var(--code-cmt)",   // comments
  tag:   "var(--code-tag)",   // JSX tags
  punct: "var(--code-punct)", // punctuation
  fn:    "var(--code-fn)",    // function / component names
  prop:  "var(--code-prop)",  // JSX props
  val:   "var(--code-val)",   // values: true/false/numbers
  plain: "var(--code-plain)", // plain identifiers
  type:  "var(--code-type)",  // TypeScript types
};

const TOKEN_LINES: Token[][] = [
  [{t:"import ",c:C.kw},{t:"{ ",c:C.punct},{t:"motion",c:C.plain},{t:" }",c:C.punct},{t:" from ",c:C.kw},{t:"'framer-motion'",c:C.str}],
  [{t:"import ",c:C.kw},{t:"{ ",c:C.punct},{t:"useState",c:C.plain},{t:" }",c:C.punct},{t:" from ",c:C.kw},{t:"'react'",c:C.str}],
  [],
  [{t:"interface ",c:C.kw},{t:"CardProps",c:C.type},{t:" {",c:C.punct}],
  [{t:"  title",c:C.plain},{t:": ",c:C.punct},{t:"string",c:C.type}],
  [{t:"  live",c:C.plain},{t:"?: ",c:C.punct},{t:"boolean",c:C.type}],
  [{t:"}",c:C.punct}],
  [],
  [{t:"// animated project card",c:C.cmt}],
  [{t:"const ",c:C.kw},{t:"Card",c:C.fn},{t:" = ({",c:C.punct}],
  [{t:"  title",c:C.plain},{t:", ",c:C.punct},{t:"live",c:C.plain},{t:" = ",c:C.punct},{t:"false",c:C.val},{t:",",c:C.punct}],
  [{t:"}: ",c:C.punct},{t:"CardProps",c:C.type},{t:") => {",c:C.punct}],
  [{t:"  ",c:C.plain},{t:"const ",c:C.kw},{t:"[open, ",c:C.plain},{t:"setOpen",c:C.fn},{t:"] =",c:C.punct}],
  [{t:"    ",c:C.plain},{t:"useState",c:C.plain},{t:"(",c:C.punct},{t:"false",c:C.val},{t:")",c:C.punct}],
  [],
  [{t:"  ",c:C.plain},{t:"return",c:C.kw},{t:" (",c:C.punct}],
  [{t:"    ",c:C.plain},{t:"<motion.article",c:C.tag}],
  [{t:"      ",c:C.plain},{t:"initial",c:C.prop},{t:"={{ ",c:C.punct},{t:"opacity",c:C.plain},{t:": ",c:C.punct},{t:"0",c:C.val},{t:", ",c:C.punct},{t:"y",c:C.plain},{t:": ",c:C.punct},{t:"20",c:C.val},{t:" }}",c:C.punct}],
  [{t:"      ",c:C.plain},{t:"whileInView",c:C.prop},{t:"={{ ",c:C.punct},{t:"opacity",c:C.plain},{t:": ",c:C.punct},{t:"1",c:C.val},{t:", ",c:C.punct},{t:"y",c:C.plain},{t:": ",c:C.punct},{t:"0",c:C.val},{t:" }}",c:C.punct}],
  [{t:"      ",c:C.plain},{t:"className",c:C.prop},{t:"=",c:C.punct},{t:'"liquid-glass p-6"',c:C.str}],
  [{t:"    >",c:C.tag}],
  [{t:"      ",c:C.plain},{t:"<h3>",c:C.tag},{t:"{",c:C.punct},{t:"title",c:C.plain},{t:"}",c:C.punct},{t:"</h3>",c:C.tag}],
  [{t:"      ",c:C.plain},{t:"{",c:C.punct},{t:"live",c:C.plain},{t:" && ",c:C.kw},{t:"<span>",c:C.tag},{t:"↗",c:C.val},{t:"</span>",c:C.tag},{t:"}",c:C.punct}],
  [{t:"    ",c:C.plain},{t:"</motion.article>",c:C.tag}],
  [{t:"  )",c:C.punct}],
  [{t:"}",c:C.punct}],
  [],
  [{t:"export default ",c:C.kw},{t:"Card",c:C.fn}],
];

/* ── Constellation data ─────────────────────────────────────────────── */
const DOTS = [
  { cx: "8%",  cy: "18%", r: 2.5 }, { cx: "22%", cy: "5%",  r: 2 },
  { cx: "38%", cy: "32%", r: 3   }, { cx: "52%", cy: "12%", r: 2 },
  { cx: "68%", cy: "25%", r: 2.5 }, { cx: "84%", cy: "8%",  r: 2 },
  { cx: "14%", cy: "58%", r: 2   }, { cx: "32%", cy: "70%", r: 3 },
  { cx: "48%", cy: "78%", r: 2   }, { cx: "62%", cy: "62%", r: 2.5 },
  { cx: "78%", cy: "82%", r: 2   }, { cx: "91%", cy: "55%", r: 3 },
  { cx: "5%",  cy: "88%", r: 2   }, { cx: "44%", cy: "92%", r: 2.5 },
];
const EDGES: [number, number][] = [
  [0,1],[1,3],[3,5],[0,6],[6,7],[7,8],[8,9],[9,11],
  [2,3],[2,7],[4,5],[4,9],[10,11],[12,13],
];

/* Linear interpolation clamped to [inMin, inMax] */
function lerp(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (inMax <= inMin) return outMin;
  return outMin + Math.max(0, Math.min(1, (v - inMin) / (inMax - inMin))) * (outMax - outMin);
}

export function GlobalBackground() {
  const { scrollY } = useScroll();
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  /* Refs for DOM-measured values */
  const posRef = useRef({ symEnd: 0, expEnd: 0 });
  const vwRef  = useRef(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const measure = () => {
      vwRef.current = window.innerWidth;
      const expEl   = document.getElementById("experience");
      posRef.current = {
        symEnd: document.body.scrollHeight - window.innerHeight,
        /* scrollY where the Experience section leaves view completely */
        expEnd: expEl ? expEl.offsetTop + expEl.offsetHeight : 0,
      };
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ── Hero CodeBlock transforms — zoom rush 3D (scrollY 0 → vh×0.85) */
  /* rotateX + rotateY juntos crean un tumble diagonal — el bloque viene */
  /* desde una esquina del espacio, no frontal plano.                    */
  const codeScale   = useTransform(scrollY, [0, vh * 0.85], [1, 7]);
  const codeRotateX = useTransform(scrollY, [0, vh * 0.85], [0, -55]);
  const codeRotateY = useTransform(scrollY, [0, vh * 0.85], [0, 65]);
  /* Fade: empieza a desaparecer en 40%, invisible en 65% del scroll */
  const codeOpacity = useTransform(scrollY, [0, vh * 0.25, vh * 0.45], [0.55, 0.20, 0]);

  /* ── Constellation transforms (About → Experience) ─────────────── */
  /* All four use expEnd so they cover the full Experience section.   */
  const constelY = useTransform(scrollY, (v) => {
    const { expEnd } = posRef.current;
    const end = (expEnd > 0 ? expEnd : vh * 6) + vh;
    return -Math.min(1, Math.max(0, v / end)) * 260;
  });
  const constelOpacity = useTransform(scrollY, (v) => {
    const { expEnd } = posRef.current;
    const end = expEnd > 0 ? expEnd : vh * 6;
    if (v < vh * 0.55) return 0;
    if (v < vh * 1.1)  return lerp(v, vh * 0.55, vh * 1.1, 0, 1);
    /* fade out over the last 0.6 vh before Experience ends */
    if (v < end - vh * 0.5) return 1;
    if (v < end + vh * 0.1) return lerp(v, end - vh * 0.5, end + vh * 0.1, 1, 0);
    return 0;
  });
  const constelScale = useTransform(scrollY, (v) => {
    const { expEnd } = posRef.current;
    const end = expEnd > 0 ? expEnd : vh * 6;
    if (v < vh * 0.55) return 1;
    return 1 + Math.min(1, Math.max(0, (v - vh * 0.55) / (end - vh * 0.55))) * 0.6;
  });
  const constelRotateX = useTransform(scrollY, (v) => {
    const { expEnd } = posRef.current;
    const end = expEnd > 0 ? expEnd : vh * 6;
    if (v < vh * 0.55) return 0;
    return Math.min(1, Math.max(0, (v - vh * 0.55) / (end - vh * 0.55))) * 30;
  });

  /* ── </> symbol transforms — appears at Experience→Projects boundary */
  /*
   * Hidden during Hero, About and Experience. Fades in as Experience
   * ends and travels diagonally (zigzag) through Projects → Contact.
   * Travel is normalized so t=0 = expEnd and t=1 = page end.
   */
  const symOpacity = useTransform(scrollY, (v) => {
    const { symEnd, expEnd } = posRef.current;
    if (symEnd === 0 || expEnd === 0) return 0;
    /* Fade in: last 0.3 vh of Experience → first 0.3 vh of Projects */
    const fadeIn    = expEnd - vh * 0.3;
    const fadeInEnd = expEnd + vh * 0.3;
    if (v < fadeIn)    return 0;
    if (v < fadeInEnd) return lerp(v, fadeIn, fadeInEnd, 0, 0.12);
    /* Fade out near page end */
    const t = Math.max(0, Math.min(1, v / symEnd));
    return t < 0.85 ? 0.12 : lerp(t, 0.85, 1.0, 0.12, 0);
  });
  const symX = useTransform(scrollY, (v) => {
    const { symEnd, expEnd } = posRef.current;
    if (symEnd === 0 || expEnd === 0) return 0;
    const xRange   = vwRef.current * 0.55;
    const isMobile = vwRef.current < 768;
    /* Normalize travel: 0 at expEnd → 1 at page end */
    const t = Math.max(0, Math.min(1, (v - expEnd) / (symEnd - expEnd)));
    if (isMobile) {
      return lerp(t, 0, 0.85, 0, -xRange);
    }
    /* Desktop: two-phase zigzag over Projects → Contact */
    if (t <= 0.45) return lerp(t, 0,    0.45, 0,       -xRange);
    if (t <= 0.85) return lerp(t, 0.45, 0.85, -xRange,  xRange * 0.35);
    return lerp(t, 0.85, 1.0, xRange * 0.35, 0);
  });
  const symY = useTransform(scrollY, (v) => {
    const { symEnd, expEnd } = posRef.current;
    if (symEnd === 0 || expEnd === 0) return 0;
    const t = Math.max(0, Math.min(1, (v - expEnd) / (symEnd - expEnd)));
    return t * 120;
  });
  /* One full rotation from Experience end to page end */
  const symRotateY = useTransform(scrollY, (v) => {
    const { symEnd, expEnd } = posRef.current;
    if (symEnd === 0 || expEnd === 0) return 0;
    const t = Math.max(0, Math.min(1, (v - expEnd) / (symEnd - expEnd)));
    return t * 360;
  });

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: "900px" }}
      aria-hidden
    >
      {/* ── Hero CodeBlock (fixed — no section clipping on scroll) ─── */}
      <div
        className="absolute left-[4%] top-1/2 pointer-events-none select-none"
        style={{ transform: "translateY(-50%)", perspective: "350px" }}
        aria-hidden
      >
        <motion.div
          style={{ scale: codeScale, rotateX: codeRotateX, rotateY: codeRotateY, opacity: codeOpacity, transformOrigin: "center center" }}
        >
          <div
            className="font-mono leading-relaxed"
            style={{ fontSize: "clamp(9px, 1.1vw, 13px)", fontWeight: 400 }}
          >
            {TOKEN_LINES.map((tokens, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{
                  color: "var(--code-ln)",
                  userSelect: "none",
                  minWidth: "2ch",
                  marginRight: "1.2em",
                  textAlign: "right",
                  fontSize: "0.85em",
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{ whiteSpace: "pre" }}>
                  {tokens.map((tok, j) => (
                    <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Constellation layer (About → Experience) */}
      <motion.div
        style={{
          y: constelY,
          opacity: constelOpacity,
          scale: constelScale,
          rotateX: constelRotateX,
          transformOrigin: "center center",
        }}
        className="absolute inset-0"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={DOTS[a].cx} y1={DOTS[a].cy}
              x2={DOTS[b].cx} y2={DOTS[b].cy}
              style={{ stroke: "rgb(102 126 234 / 0.22)", strokeWidth: 1 }}
            />
          ))}
          {DOTS.map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              style={{ fill: "rgb(102 126 234 / 0.38)" }}
            />
          ))}
        </svg>
      </motion.div>

      {/* ── </> traveling symbol (Hero → Contact) ──────────────────── */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "22%",
          fontSize: "clamp(180px, 28vw, 360px)",
          fontFamily: "monospace",
          fontWeight: 700,
          lineHeight: 1,
          color: "rgba(102,126,234,1)",
        }}
      >
        <motion.div
          style={{
            x: symX,
            y: symY,
            opacity: symOpacity,
            rotateY: symRotateY,
            transformOrigin: "center center",
          }}
        >
          {"</>"}
        </motion.div>
      </div>
    </div>
  );
}
