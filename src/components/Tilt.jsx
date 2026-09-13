import { useEffect, useRef } from "react";

// Pointer-driven 3D tilt for cards.
//
// The rotation is published as CSS custom properties (`--tilt-x`, `--tilt-y`,
// `--tilt-lx`, `--tilt-ly`) and the actual `transform` lives in the stylesheet.
// That split is deliberate: the stylesheet can then withhold the effect on
// touch/coarse pointers and under `prefers-reduced-motion` without this
// component knowing anything about it, and the same properties drive the glare
// highlight. Writing transforms from JS instead would hard-code the effect and
// need a second channel for the highlight.
export default function Tilt({
  children,
  className = "",
  as: Tag = "div",
  max = 9, // peak rotation in degrees at the card's edge
  ...rest
}) {
  const ref = useRef(null);
  // rAF-coalesced: pointermove can fire several times per frame, and each write
  // to a custom property invalidates style on the subtree.
  const frame = useRef(0);
  const pending = useRef(null);

  // A tilt left mid-transition would otherwise stick after unmount.
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const flush = () => {
    frame.current = 0;
    const el = ref.current;
    const next = pending.current;
    if (!el || !next) return;
    el.style.setProperty("--tilt-x", `${next.rx.toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${next.ry.toFixed(2)}deg`);
    el.style.setProperty("--tilt-lx", `${next.lx.toFixed(1)}%`);
    el.style.setProperty("--tilt-ly", `${next.ly.toFixed(1)}%`);
  };

  const handleMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    // -1..1 from the card's centre.
    const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pending.current = {
      // Pointing below centre tips the card's top toward the viewer, which is
      // why rotateX takes -py.
      rx: -py * max,
      ry: px * max,
      lx: ((px + 1) / 2) * 100,
      ly: ((py + 1) / 2) * 100,
    };
    if (!frame.current) frame.current = requestAnimationFrame(flush);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    pending.current = null;
    // Clear rather than zero the properties, so the card falls back to the
    // stylesheet's resting values and eases back via its own transition.
    el.style.removeProperty("--tilt-x");
    el.style.removeProperty("--tilt-y");
    el.style.removeProperty("--tilt-lx");
    el.style.removeProperty("--tilt-ly");
  };

  return (
    // `rest` is spread first so the props below always win: a caller passing
    // its own onPointerMove would otherwise silently disable the tilt.
    <Tag
      {...rest}
      ref={ref}
      className={`tilt ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </Tag>
  );
}
