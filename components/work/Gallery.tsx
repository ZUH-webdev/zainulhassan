"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Shot = { src: string; alt: string };

/** Scroll-snap screenshot strip; each shot opens a native <dialog> lightbox (Esc, backdrop click and arrow keys work). */
export default function Gallery({ shots }: { shots: Shot[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const show = (i: number) => {
    setOpen(i);
    if (!dialog.current?.open) dialog.current?.showModal();
  };
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length));
  const current = open === null ? null : shots[open];

  return (
    <>
      <ul className="lm-gal" aria-label="Screenshots">
        {shots.map((s, i) => (
          <li key={s.src}>
            <button type="button" className="lm-shot" onClick={() => show(i)} aria-label={`Enlarge: ${s.alt}`}>
              <Image src={s.src} alt={s.alt} fill sizes="(max-width: 767px) 85vw, 560px" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="lm-lb"
        aria-label="Screenshot viewer"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <figure>
            <div className="lm-lb-img">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" />
            </div>
            <figcaption>{current.alt}</figcaption>
          </figure>
        )}
        <div className="lm-lb-bar mono">
          {shots.length > 1 && (
            <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot">
              ←
            </button>
          )}
          {open !== null && shots.length > 1 && (
            <span>
              {open + 1} / {shots.length}
            </span>
          )}
          {shots.length > 1 && (
            <button type="button" onClick={() => step(1)} aria-label="Next screenshot">
              →
            </button>
          )}
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" autoFocus>
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}
