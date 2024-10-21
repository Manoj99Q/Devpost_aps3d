
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-blue-500">
            <h1 className="text-4xl font-bold text-white mb-8">Welcome</h1>
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
