import React from 'react';

const LeftSection = () => {
    return (
        <div className="w-1/4 bg-gray-200 p-4 overflow-auto">
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="mb-4 rounded shadow" />
            <div className="text-lg">
                <h2 className="text-xl font-bold mb-2">Information</h2>
                <p className="mb-2">This is a placeholder image with some descriptive text below it.</p>
                <p>Feel free to replace this with any content you like.</p>
            </div>
        </div>
    );
};

export default LeftSection;
