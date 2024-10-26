import React, { useState } from 'react';
import { Film, Clapperboard, MapPin, Star, Camera, ArrowLeft, ChevronRight } from 'lucide-react';
import { image } from 'framer-motion/client';

const LocationDetail = ({ location, onBack }) => (
  <div className="bg-gradient-to-br from-slate-900 to-gray-800 p-6 rounded-lg shadow-xl max-w-md text-gray-100 border border-blue-500">
    <div className="mb-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Overview
      </button>
      <div className="mb-6 bg-blue-500 px-3 py-1 rounded-md text-sm font-mono inline-block">
        LOCATION DETAILS: CLASSIFIED
      </div>
      <h2 className="text-3xl font-bold text-blue-400">{location.title}</h2>
    </div>

    <div className="space-y-4">
      <div className="relative h-48 bg-black/50 rounded-lg overflow-hidden">
        <img 
          src={location.image}
          alt={location.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-black/30 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="font-bold text-blue-400 mb-2">Scene Details</h3>
        <p className="text-gray-300 leading-relaxed">{location.description}</p>
      </div>

      <div className="bg-black/30 p-4 rounded-lg border-l-4 border-yellow-500">
        <h3 className="font-bold text-yellow-400 mb-2">Technical Specs</h3>
        <ul className="text-gray-300 space-y-2">
          {location.specs.map((spec, index) => (
            <li key={index} className="flex items-start gap-2">
              <Star className="w-4 h-4 mt-1 text-yellow-500" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const TransformersOverlay = ({ onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const locations = [
    {
      id: 1,
      title: 'Trump Tower - Base Jump Sequence',
      description: 'One of the most spectacular stunts in the film features wing-suited pilots jumping from the tower. The sequence required extensive coordination with the city and utilized cutting-edge aerial cinematography.',
      specs: [
        'Filmed over 3 nights',
        'Height: 1,389 feet',
        'Required 4 different camera teams',
        'Used real military wing-suit pilots'
      ]
    },
    {
      id: 2,
      title: 'Wacker Drive - Major Battle Scenes',
      description: 'This iconic Chicago street was transformed into a war zone, featuring intense combat between Autobots and Decepticons. The location offered perfect sight lines for capturing the city\'s architectural beauty amidst the chaos.',
      specs: [
        'Closed for 14 days straight',
        'Used over 30 stunt vehicles',
        'Required rebuilding portions of the street',
        'Involved 200+ extras'
      ],
      image:"public/images/East_Wacker.webp"
    },
    {
      id: 3,
      title: 'Michigan Avenue Bridge - Epic Robot Showdown',
      description: 'The historic bridge served as the backdrop for the climactic battle. Its unique architecture and surrounding cityscape provided the perfect setting for the final confrontation.',
      specs: [
        'Bridge closed for 7 days',
        'Used practical explosions',
        'Coordinated with river traffic',
        'Required special permits for aerial shots'
      ]
    }
  ];

  const overlayStyle = `
    bg-gradient-to-br from-slate-900 to-gray-800 
    p-6 rounded-lg shadow-xl max-w-md text-gray-100 
    border border-blue-500
    mt-16 mx-4
    `;


  if (selectedLocation) {
    return <LocationDetail location={selectedLocation} onBack={() => setSelectedLocation(null)} />;
  }

  return (
    <div className={overlayStyle}>
      <div className="mb-6">
        <div className="mb-6 bg-blue-500 px-3 py-1 rounded-md text-sm font-mono inline-block">
          LOCATION FILE: CLASSIFIED
        </div>
        <h2 className="text-3xl font-bold text-blue-400 flex items-center gap-2">
          <Film className="w-8 h-8" />
          Dark of the Moon
          <span className="text-sm font-normal bg-blue-500 px-2 py-1 rounded ml-2">2011</span>
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-black/30 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-blue-400 flex items-center gap-2 mb-2">
            <Clapperboard className="w-5 h-5" />
            Production Details
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Michael Bay transformed Chicago into a battleground for the epic clash between Autobots and Decepticons, 
            utilizing the city's iconic architecture as a backdrop for some of the most spectacular action sequences in the film.
          </p>
        </div>

        <div className="bg-black/30 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-yellow-400 flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5" />
            Key Filming Locations
          </h3>
          <ul className="space-y-2 text-gray-300">
            {locations.map((location) => (
              <li 
                key={location.id} 
                className="relative"
                onMouseEnter={() => setHoveredId(location.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  onClick={() => setSelectedLocation(location)}
                  className={`
                    w-full text-left p-2 rounded-lg flex items-start gap-2
                    transition-all duration-300 
                    border border-blue-500/30
                    bg-black/20
                    ${hoveredId === location.id ? 'bg-blue-500/10 border-blue-400' : ''}
                    group hover:pl-4
                  `}
                >
                  <Star className={`
                    w-4 h-4 mt-1 transition-colors duration-300
                    ${hoveredId === location.id ? 'text-blue-400' : 'text-yellow-500'}
                  `} />
                  <span className={`
                    transition-colors duration-300 flex-1
                    ${hoveredId === location.id ? 'text-blue-400' : 'text-blue-300'}
                  `}>
                    {location.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-400/70 font-mono">ACCESS_DETAILS</span>
                    <ChevronRight className={`
                      w-4 h-4 transition-all duration-300
                      ${hoveredId === location.id ? 'text-blue-400' : 'text-blue-500/50'}
                    `} />
                  </div>
                </button>
                {hoveredId === location.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 animate-pulse bg-blue-500/5 rounded-lg" />
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0" 
                         style={{
                           animation: 'slideY 2s infinite linear'
                         }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black/30 p-4 rounded-lg border-l-4 border-red-500">
          <h3 className="font-bold text-red-400 flex items-center gap-2 mb-2">
            <Camera className="w-5 h-5" />
            Fun Facts
          </h3>
          <ul className="text-gray-300 list-disc list-inside space-y-1 ml-2">
            <li>Largest production ever filmed in Chicago</li>
            <li>Closed major streets for two weeks</li>
            <li>Used over 500 local crew members</li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={onClose} 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          Close File
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400 font-mono">
        ACCESS LEVEL: AUTOBOT CLEARANCE
      </div>
    </div>
  );
};

export default TransformersOverlay;