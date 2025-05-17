import React from 'react';

const QuestionCard = ({ question, options, onSelect }) => (
  <div className="p-4 bg-white rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4">{question}</h2>
    <div className="grid gap-2">
      {options.map((opt, idx) => (
        <button key={idx} onClick={() => onSelect(opt)} className="p-2 bg-blue-100 hover:bg-blue-300 rounded">
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default QuestionCard;