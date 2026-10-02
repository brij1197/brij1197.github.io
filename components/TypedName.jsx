"use client";
import { useEffect, useState } from "react";
import { animation } from "@/content/animation";

export default function TypedName({ name }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let index = 0;
    const letters = [...name];
    const finish = () => {
      clearTimeout(timer);
      setText(name);
    };
    const type = () => {
      index += 1;
      setText(letters.slice(0, index).join(""));
      if (index < letters.length)
        timer = setTimeout(type, animation.typingInterval);
    };
    setText("");
    if (preference.matches || !letters.length) finish();
    else timer = setTimeout(type, animation.typingDelay);
    const changed = () => {
      if (preference.matches) finish();
    };
    preference.addEventListener("change", changed);
    window.addEventListener("pagehide", finish);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", changed);
      window.removeEventListener("pagehide", finish);
    };
  }, [name]);
  return (
    <span className="name-slot" aria-hidden="true">
      <span className="name-spacer">{name}</span>
      <span className="name-live">
        <span id="typed-name">{text}</span>
        <span className="typing-cursor" />
      </span>
    </span>
  );
}
