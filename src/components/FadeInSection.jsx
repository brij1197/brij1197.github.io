import React, { useState, useRef, useEffect, useCallback } from "react";

export default function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  const setupObserver = useCallback(() => {
    const current = domRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(current);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 0px 0px"
      }
    );
    observer.observe(current);
    return () => observer.unobserve(current);
  }, []);

  useEffect(() => {
    setupObserver();
  }, [setupObserver]);

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${props.delay}` }}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
