import React from 'react';

const LeftSection = () => {
    return (
        <div className="w-1/4 bg-gray-200 p-4 overflow-auto">
            <img src="/images/architect.png" alt="Architect" className="mb-4 rounded-full shadow-2xl transform transition duration-300 hover:scale-110 hover:shadow-3xl hover:rotate-2" />
            <div className="text-lg relative bg-white p-4 rounded-lg shadow-lg before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                <h2 className="text-xl font-bold mb-2">Information</h2>
                <p className="mb-2">This is a placeholder image with some descriptive text below it.</p>
                <p>Feel free to replace this with any content you like.</p>
            </div>
        </div>
    );
};

export default LeftSection;
