import React from 'react';
import { Home, User, Mail } from 'lucide-react';
import { useMarkers } from '../contexts/MarkerContext';
import markersDict from '../data/markers';

const Navbar = () => {
  const { addMarker } = useMarkers();
  return (
    <nav className="bg-gray-900 p-4 shadow-lg border-b-4 border-yellow-400">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-yellow-400 text-2xl font-bold font-medieval transform hover:scale-105 transition-transform duration-300">
          MapQuest
        </div>
        <div className="space-x-6 flex"  onClick={()=>{
            console.log("clicked");
            addMarker(markersDict.bean);
           }}>
          <a href="#" className="text-yellow-200 hover:text-white transition-colors duration-300 flex items-center"
          >
            <Home size={20} className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </a>
          <a href="#" className="text-yellow-200 hover:text-white transition-colors duration-300 flex items-center">
            <User size={20} className="mr-1" />
            <span className="hidden sm:inline">About</span>
          </a>
          <a href="#" className="text-yellow-200 hover:text-white transition-colors duration-300 flex items-center">
            <Mail size={20} className="mr-1" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
