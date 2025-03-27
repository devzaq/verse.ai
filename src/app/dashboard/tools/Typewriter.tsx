import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
}

const Typewriter = ({ text, delay = 100 }: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  return (
    <span>
      {displayText.split(" ").map((word, i) => (
        <span key={i}>
          {word === "AI" ? <span className="text-blue-400">{word}</span> : word}{" "}
        </span>
      ))}
    </span>
  );
};

export default Typewriter;
