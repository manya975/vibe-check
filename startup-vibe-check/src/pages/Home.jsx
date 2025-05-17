import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const Home = () => {
  const navigate = useNavigate();
  const [vibeCounts, setVibeCounts] = useState({});

  useEffect(() => {
    const vibesRef = ref(db, 'results');
    const unsubscribe = onValue(vibesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const counts = {};
      Object.entries(data).forEach(([vibe, obj]) => {
        counts[vibe] = obj.count || 0;
      });
      setVibeCounts(counts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-pink-300 to-indigo-400 text-white px-4 overflow-auto">
      <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Startup Vibe Check 🚀</h1>
      <p className="mb-6 text-lg drop-shadow-md">Find out what kind of founder you are!</p>
      <button
        onClick={() => navigate('/quiz')}
        className="bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-200 mb-8"
      >
        Start Quiz
      </button>

      <div className="bg-white bg-opacity-20 rounded-lg p-6 w-full max-w-md text-black shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Live Vibe Stats</h2>
        {Object.keys(vibeCounts).length === 0 ? (
          <p>Loading vibes...</p>
        ) : (
          Object.entries(vibeCounts).map(([vibe, count]) => (
            <p key={vibe} className="mb-2 text-lg">
              <strong>{vibe}:</strong> {count} {count === 1 ? 'person' : 'people'} got this vibe
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;