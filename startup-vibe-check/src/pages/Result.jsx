import { onValue, ref, runTransaction } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';

const Result = () => {
  const { vibe } = useParams();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const hasRunTransaction = useRef(false); // 👈 Prevent double run

  useEffect(() => {
    if (!vibe || hasRunTransaction.current) return;
    hasRunTransaction.current = true;

    const resultRef = ref(db, `results/${vibe}`);

    // Run the transaction to increment count
    runTransaction(resultRef, (currentData) => {
      if (currentData === null) {
        return { count: 1 };
      } else {
        return { count: (currentData.count || 0) + 1 };
      }
    }).catch((error) => {
      console.error('Transaction failed: ', error);
    });

    // Subscribe to value updates
    const unsubscribe = onValue(resultRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data?.count || 0);
    });

    return () => unsubscribe();
  }, [vibe]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-yellow-50 p-4">
      <h1 className="text-3xl font-bold mb-4">You're a {vibe} 🧠</h1>
      <img
        src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${vibe}`}
        className="w-32 h-32 mb-4 mx-auto"
        alt="avatar"
      />
      <p className="mb-4">{count} {count === 1 ? 'person' : 'people'} got this vibe!</p>
      <a
        href={`https://twitter.com/intent/tweet?text=I got the ${vibe} founder vibe! What's yours?&url=${window.location.href}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-blue-600 underline"
      >
        Share on Twitter
      </a>

      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Result;
