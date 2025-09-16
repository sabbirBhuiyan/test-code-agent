import React from 'react';

export default function AiAgentsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mt-10 text-gray-800">
        Welcome to the World of AI Agents
      </h1>
      <p className="text-lg text-gray-700 mt-5 text-center leading-relaxed max-w-2xl">
        Discover the power of autonomous AI agents that can help you with a variety of tasks. Our platform allows you to create, manage, and deploy intelligent agents to automate your workflows.
      </p>
      <button className="mt-10 px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-lg transition-colors duration-300">
        Get Started
      </button>
    </div>
  );
}
