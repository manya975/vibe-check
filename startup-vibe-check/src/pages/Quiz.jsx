import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: "What's your leadership style?",
    options: [
      { text: "Visionary", vibe: "Visionary" },
      { text: "Collaborative", vibe: "Collaborator" },
      { text: "Analytical", vibe: "Analyst" },
      { text: "Risk Taker", vibe: "RiskTaker" }
    ],
  },
  {
    question: "How do you handle failure?",
    options: [
      { text: "Learn and adapt", vibe: "Visionary" },
      { text: "Seek feedback", vibe: "Collaborator" },
      { text: "Analyze data", vibe: "Analyst" },
      { text: "Push forward boldly", vibe: "RiskTaker" }
    ],
  },
  // Add more questions if you want
];

const Quiz = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [vibeScores, setVibeScores] = useState({});

  const handleAnswer = (vibe) => {
    setVibeScores((prev) => ({
      ...prev,
      [vibe]: (prev[vibe] || 0) + 1,
    }));

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // Calculate highest vibe
      const highestVibe = Object.entries(vibeScores).reduce(
        (max, entry) => (entry[1] > max[1] ? entry : max),
        ['', 0]
      )[0];

      // In case of tie or empty, fallback:
      const finalVibe = highestVibe || Object.keys(vibeScores)[0] || 'Visionary';

      navigate(`/result/${finalVibe}`);
    }
  };

  const currentQuestion = questions[current];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-blue-500 text-white p-4">
      <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-md">{currentQuestion.question}</h2>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        {currentQuestion.options.map(({ text, vibe }) => (
          <button
            key={text}
            onClick={() => handleAnswer(vibe)}
            className="bg-white text-black rounded-lg py-3 shadow-md hover:bg-gray-200 transition-colors"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;