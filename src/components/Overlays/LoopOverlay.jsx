import React, { useState } from 'react';
import { Train, Building, Clock, Map, ArrowLeft, ChevronRight, Bookmark } from 'lucide-react';

const LocationDetail = ({ location, onBack }) => (
  <div className="bg-gradient-to-br from-zinc-900 to-gray-900 p-6 rounded-lg shadow-xl max-w-md text-gray-100 border border-orange-500">
    <div className="mb-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Loop Guide
      </button>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${location.lineColor}`} />
        <span className="text-sm text-orange-400">{location.line} Line</span>
      </div>
      <h2 className="text-2xl font-bold text-orange-400">{location.title}</h2>
    </div>

    <div className="space-y-4">
      <div className="relative h-48 bg-black/50 rounded-lg overflow-hidden">
        <img 
          src="/api/placeholder/400/320"
          alt={location.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-black/30 p-4 rounded-lg border-l-4 border-orange-500">
        <h3 className="font-bold text-orange-400 mb-2">About This Stop</h3>
        <p className="text-gray-300 leading-relaxed">{location.description}</p>
      </div>

      <div className="bg-black/30 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="font-bold text-blue-400 mb-2">What to Discover</h3>
        <ul className="text-gray-300 space-y-2">
          {location.discoveries.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Bookmark className="w-4 h-4 mt-1 text-blue-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const LoopOverlay = ({ onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const locations = [
    {
      id: 1,
      title: 'State/Lake Station',
      line: 'Brown',
      lineColor: 'bg-amber-700',
      description: 'Where historic theaters meet modern city life. The iconic Chicago Theatre sign serves as a beacon for the entertainment district, while architectural marvels surround you at every turn.',
      discoveries: [
        'Chicago Theatre marquee photo spot',
        'Historic Reliance Building',
        'Block Thirty Seven shopping',
        'Vintage theater architecture'
      ]
    },
    {
      id: 2,
      title: 'Washington/Wabash',
      line: 'Green',
      lineColor: 'bg-green-600',
      description: 'A modernist marvel offering stunning views of Millennium Park and the historic Jewelers Row. The station\'s undulating waves mirror Cloud Gate\'s artistic influence.',
      discoveries: [
        'Millennium Park vista point',
        'Historic Jewelers Row District',
        'Contemporary station architecture',
        'Marshall Field Building views'
      ]
    },
    {
      id: 3,
      title: 'Clark/Lake Hub',
      line: 'Blue',
      lineColor: 'bg-blue-600',
      description: 'The Loop\'s busiest intersection of train lines offers unique perspectives of downtown\'s layered architecture and the famous Thompson Center.',
      discoveries: [
        'Thompson Center\'s postmodern design',
        'Multi-level train viewing',
        'Art Deco buildings',
        'Underground Pedway access'
      ]
    }
  ];

  if (selectedLocation) {
    return <LocationDetail location={selectedLocation} onBack={() => setSelectedLocation(null)} />;
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-gray-900 p-6 rounded-lg shadow-xl max-w-md text-gray-100 border border-orange-500">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Train className="w-5 h-5 text-orange-400" />
          <span className="text-sm text-orange-400 font-medium">ELEVATED EXPLORER</span>
        </div>
        <h2 className="text-2xl font-bold text-orange-400">Loop Highlights</h2>
        <p className="text-gray-400 text-sm mt-1">Discover the city from unique L perspectives</p>
      </div>

      <div className="space-y-4 mb-6">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => setSelectedLocation(location)}
            onMouseEnter={() => setHoveredId(location.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="w-full text-left"
          >
            <div className={`p-3 rounded-lg transition-all duration-300 border border-orange-500/30 
              ${hoveredId === location.id ? 'bg-orange-500/10 border-orange-400' : 'bg-black/20'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${location.lineColor}`} />
                <span className={`text-sm transition-colors duration-300
                  ${hoveredId === location.id ? 'text-orange-400' : 'text-orange-500/70'}`}>
                  {location.line} Line
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`font-medium transition-colors duration-300
                  ${hoveredId === location.id ? 'text-orange-400' : 'text-gray-300'}`}>
                  {location.title}
                </span>
                <ChevronRight className={`w-5 h-5 transition-colors duration-300
                  ${hoveredId === location.id ? 'text-orange-400' : 'text-orange-500/50'}`} />
              </div>
            </div>
          </button>
        ))}
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors"
      >
        Exit Explorer
      </button>

      <div className="mt-4 text-center text-xs text-gray-400">
        Best viewing times: 9AM-11AM | 3PM-5PM
      </div>
    </div>
  );
};

export default LoopOverlay;