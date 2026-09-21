import { useEffect, useState } from "react";

const TYPE_MS = 60;
const DELETE_MS = 30;
const HOLD_MS = 2000;

export function Typewriter({ phrases }: { phrases: string[] }) {
  const [reduced, setReduced] = useState(true);
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(phrases[0] ?? "");
      return;
    }
    let index = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const phrase = phrases[index] ?? "";
      if (!deleting) {
        char += 1;
        setText(phrase.slice(0, char));
        if (char === phrase.length) {
          deleting = true;
          timer = setTimeout(step, HOLD_MS);
          return;
        }
        timer = setTimeout(step, TYPE_MS);
      } else {
        char -= 1;
        setText(phrase.slice(0, char));
        if (char === 0) {
          deleting = false;
          index = (index + 1) % phrases.length;
        }
        timer = setTimeout(step, DELETE_MS);
      }
    };

    setText("");
    timer = setTimeout(step, TYPE_MS);
    return () => clearTimeout(timer);
  }, [phrases, reduced]);

  return (
    <p
      className="flex h-6 items-center justify-center text-sm tracking-wide sm:h-7 sm:text-base"
      style={{ color: "var(--muted)" }}
      aria-live="polite"
    >
      <span>{text}</span>
      {!reduced && <span className="era-caret" aria-hidden="true" />}
    </p>
  );
}
