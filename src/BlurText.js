import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * BlurText — animates text in/out with a blur + slide effect using
 * Framer Motion. Visibility is driven by IntersectionObserver so the
 * animation replays whenever the element enters the viewport.
 *
 * Props:
 *   text          — string to animate
 *   delay         — ms between each word / letter
 *   animateBy     — "words" | "letters"
 *   direction     — "top" | "bottom"  (direction the text slides from)
 *   threshold     — IntersectionObserver threshold (0–1)
 *   rootMargin    — IntersectionObserver rootMargin string
 *   stepDuration  — framer-motion transition duration (seconds)
 *   className     — class applied to the wrapper <span>
 *   onAnimationComplete — callback fired after the last item animates in
 */
function BlurText({
  text = "",
  delay = 100,
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
  stepDuration = 0.35,
  className = "",
}) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  const items = animateBy === "words" ? text.split(" ") : text.split("");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const yOffset = direction === "top" ? -20 : 20;

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: "inline" }}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: yOffset, filter: "blur(8px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: yOffset, filter: "blur(8px)" }
          }
          transition={{
            duration: stepDuration,
            delay: inView ? i * (delay / 1000) : 0,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          onAnimationComplete={
            i === items.length - 1 && inView && onAnimationComplete
              ? onAnimationComplete
              : undefined
          }
          style={{
            display: "inline-block",
            willChange: "transform, opacity, filter",
          }}
        >
          {item}
          {animateBy === "words" && i < items.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

export default BlurText;
