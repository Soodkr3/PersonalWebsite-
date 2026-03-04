import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

/**
 * TargetCursor — replaces the default browser cursor with an animated
 * crosshair (4 corner brackets that spin) + a centre dot.
 *
 * On hover over elements matching `targetSelector` the corners snap to
 * the element's bounding box and spinning pauses.
 *
 * Props:
 *   targetSelector    — CSS selector for interactive targets (default ".cursor-target")
 *   spinDuration      — seconds for one full 360° rotation (default 2)
 *   hideDefaultCursor — hide the browser cursor (default true)
 */
function TargetCursor({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
}) {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const spinTlRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const activeTargetRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    if (!wrapper || !dot) return;

    if (hideDefaultCursor) document.body.style.cursor = "none";

    // Start spinning animation
    spinTlRef.current = gsap.timeline({ repeat: -1 }).to(wrapper, {
      rotation: 360,
      duration: spinDuration,
      ease: "none",
    });

    // ── Mouse tracking ───────────────────────────────────────────────
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // If not locked to a target, follow mouse
      if (!activeTargetRef.current) {
        gsap.to(wrapper, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out",
        });
      }
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "none",
      });
    };

    // ── Target hover ─────────────────────────────────────────────────
    const PADDING = 8;

    const onTargetEnter = (e) => {
      const target = e.currentTarget;
      activeTargetRef.current = target;
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const w = rect.width + PADDING * 2;
      const h = rect.height + PADDING * 2;

      spinTlRef.current?.pause();
      gsap.to(wrapper, {
        x: cx,
        y: cy,
        width: w,
        height: h,
        rotation: 0,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const onTargetLeave = () => {
      activeTargetRef.current = null;
      gsap.to(wrapper, {
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        width: 36,
        height: 36,
        duration: 0.25,
        ease: "power3.out",
        onComplete: () => spinTlRef.current?.resume(),
      });
    };

    // Update position if target element moves (e.g. on scroll)
    const onScroll = () => {
      const target = activeTargetRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      gsap.set(wrapper, { x: cx, y: cy });
    };

    // ── Click effect ─────────────────────────────────────────────────
    const onClick = () => {
      gsap.timeline()
        .to(dot, { scale: 0.4, duration: 0.1 })
        .to(dot, { scale: 1, duration: 0.2, ease: "back.out(2.5)" });
    };

    // ── Attach listeners ─────────────────────────────────────────────
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = document.querySelectorAll(targetSelector);
    targets.forEach((t) => {
      t.addEventListener("mouseenter", onTargetEnter);
      t.addEventListener("mouseleave", onTargetLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onTargetEnter);
        t.removeEventListener("mouseleave", onTargetLeave);
      });
      spinTlRef.current?.kill();
      if (hideDefaultCursor) document.body.style.cursor = "";
    };
  }, [targetSelector, spinDuration, hideDefaultCursor]);

  return (
    <>
      {/* Crosshair wrapper — translated so (0,0) is the centre */}
      <div ref={wrapperRef} className="target-cursor" aria-hidden="true">
        <span className="target-cursor__corner tc-tl" />
        <span className="target-cursor__corner tc-tr" />
        <span className="target-cursor__corner tc-bl" />
        <span className="target-cursor__corner tc-br" />
      </div>
      {/* Centre dot — tracks mouse directly */}
      <div ref={dotRef} className="target-cursor__dot" aria-hidden="true" />
    </>
  );
}

export default TargetCursor;
