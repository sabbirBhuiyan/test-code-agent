
import { useState } from 'react';

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  const generatePastelColor = () => {
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div
      style={{ backgroundColor }}
      className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-center">AI Agent's first page</h1>
        <p className="text-center leading-relaxed">
          This is so cool! GEMINI CLI built this entire page and even submitted this PR without any human intervention, besides running the command.
        </p>
        <button
          onClick={() => setBackgroundColor(generatePastelColor())}
          className="bg-brand-color text-white font-medium py-2 px-4 rounded hover:bg-brand-color-dark"
        >
          Change BG Color
        </button>
      </main>
    </div>
  );
}
