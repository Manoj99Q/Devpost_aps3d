import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <button
        className="bg-white text-blue-500 font-bold py-2 px-4 rounded"
        onClick={() => navigate('/play')}
      >
        Play
      </button>
    </div>
  );
};

export default LandingPage;
