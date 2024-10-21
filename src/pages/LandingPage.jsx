import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
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
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full bg-blue-500">
            <h1 className="text-4xl font-bold text-white mb-8">Welcome to the 3D Model Viewer</h1>
            <button 
                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow"
                onClick={() => navigate('/play')}
            >
                Play
            </button>
        </div>
    );
};

export default LandingPage;
