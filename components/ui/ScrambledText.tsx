"use client";

import React, { useEffect, useRef, useState, CSSProperties, ReactNode } from 'react';
import { gsap } from 'gsap';
import './ScrambledText.css';

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:!@#$%^&*()_+-=~',
  className = '',
  style = {},
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const [textString, setTextString] = useState<string>('');

  useEffect(() => {
    if (typeof children === 'string') {
      setTextString(children);
    } else if (rootRef.current) {
      setTextString(rootRef.current.innerText || '');
    }
  }, [children]);

  useEffect(() => {
    if (!rootRef.current || !textString) return;

    const charElements = Array.from(rootRef.current.querySelectorAll<HTMLSpanElement>('.scramble-char'));
    charsRef.current = charElements;

    const handlePointerMove = (e: PointerEvent) => {
      charsRef.current.forEach((charEl) => {
        const originalChar = charEl.dataset.original;
        if (!originalChar || originalChar === ' ') return;

        const rect = charEl.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          charEl.classList.add('scrambling');
          const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          charEl.innerText = randomChar;

          gsap.to(charEl, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            ease: 'none',
            onComplete: () => {
              charEl.innerText = originalChar;
              charEl.classList.remove('scrambling');
            },
          });
        }
      });
    };

    const container = rootRef.current;
    container.addEventListener('pointermove', handlePointerMove);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, [textString, radius, duration, speed, scrambleChars]);

  const renderScrambledChars = (text: string) => {
    return Array.from(text).map((char, idx) => {
      if (char === '\n') return <br key={`br-${idx}`} />;
      if (char === ' ') {
        return (
          <span key={`space-${idx}`} className="inline">
            {'\u00A0'}
          </span>
        );
      }

      return (
        <span
          key={`char-${idx}`}
          className="scramble-char"
          data-original={char}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div
      ref={rootRef}
      className={`text-block-scramble font-body text-slate-700 text-base sm:text-lg leading-relaxed font-normal ${className}`.trim()}
      style={style}
    >
      <p className="inline">{renderScrambledChars(textString || (typeof children === 'string' ? children : ''))}</p>
    </div>
  );
}
