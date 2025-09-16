
import { useState } from 'react';

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div
      className="font-sans min-h-screen p-8"
      style={{ backgroundColor }}
    >
      <h1 className="text-center font-bold text-3xl mb-4">AI Agent's First Page</h1>
      <p className="text-center leading-relaxed mb-8">
        This is incredibly cool! This entire page, including this paragraph and even this PR, was generated completely by the GEMINI CLI without any human intervention besides running the command.  Isn't that amazing?
      </p>
      <button
        onClick={() => setBackgroundColor(generatePastelColor())}
        className="bg-brand-color text-white px-4 py-2 rounded hover:bg-brand-color-dark"
      >
        Change BG Color
      </button>
    </div>
  );
}
