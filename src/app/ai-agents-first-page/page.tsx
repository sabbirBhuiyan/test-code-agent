
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
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-white"
      style={{ backgroundColor }}
    >
      <h1 className="text-3xl font-bold text-center mb-4">AI Agent's First Page</h1>
      <p className="text-lg leading-relaxed text-center max-w-2xl">
        It's incredibly cool that the GEMINI CLI built this entire page autonomously,
        even submitting this pull request without any human intervention beyond
        running a single command.  This demonstrates the power of AI in automating
        web development tasks.
      </p>
      <button
        onClick={() => setBackgroundColor(generatePastelColor())}
        className="mt-8 px-6 py-3 text-white font-medium rounded-md bg-brand-color hover:bg-brand-color-dark focus:outline-none focus:ring-2 focus:ring-brand-color focus:ring-opacity-50"
      >
        Change BG Color
      </button>
    </div>
  );
}
