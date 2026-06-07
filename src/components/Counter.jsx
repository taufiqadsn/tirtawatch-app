"use client";
// COMPONENT: Counter — angka menghitung naik saat terlihat.
import { useEffect, useRef, useState } from "react";

export default function Counter({ target = 0, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const step = Math.max(1, Math.round(target / 45));
            let cur = 0;
            const t = setInterval(() => {
              cur += step;
              if (cur >= target) {
                cur = target;
                clearInterval(t);
              }
              setVal(cur);
            }, 22);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}
