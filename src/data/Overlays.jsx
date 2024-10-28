import React from "react";
import { Camera, Clock, MapPin, Film, Clapperboard, Star } from "lucide-react";
import TransformersOverlay from "../components/Overlays/TransormersOverlay";
import LoopOverlay from "../components/Overlays/LoopOverlay";
import MonsterShout from "../components/Overlays/MonsterShout";
import { m } from "framer-motion";

const BeanOverlay = ({ onClose }) => (
  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-xl max-w-md">
    <h2 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-2">
      <MapPin className="w-6 h-6" />
      The Bean (Cloud Gate)
    </h2>
    <p className="text-gray-700 mb-4">
      The iconic Cloud Gate sculpture, affectionately known as The Bean, is one
      of Chicago's most popular attractions. This stunning piece of public art
      provides a unique reflection of the city skyline.
    </p>
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
        <Camera className="w-5 h-5" />
        Photo Spots
      </h3>
      <ul className="text-gray-600 space-y-2">
        <li>• Early morning mirror reflection with no crowds</li>
        <li>• Touch the top of the Bean in forced perspective</li>
        <li>• Capture your distorted reflection underneath</li>
      </ul>
    </div>
    <button
      onClick={onClose}
      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-full"
    >
      Close
    </button>
  </div>
);

const WillisOverlay = ({ onClose }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-xl max-w-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
      <MapPin className="w-6 h-6" />
      Willis Tower Skydeck
    </h2>
    <p className="text-gray-700 mb-4">
      Step out onto The Ledge — glass boxes extending 4.3 feet out from the
      103rd floor. Experience breathtaking views of Chicago from 1,353 feet in
      the air.
    </p>
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Best Times
      </h3>
      <ul className="text-gray-600 space-y-2">
        <li>• 30 minutes before sunset for best views</li>
        <li>• Early morning to avoid crowds</li>
        <li>• Clear winter days for maximum visibility</li>
      </ul>
    </div>
    <button
      onClick={onClose}
      className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg w-full"
    >
      Close
    </button>
  </div>
);

const NavyPierOverlay = ({ onClose }) => (
  <div className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-lg shadow-xl max-w-md">
    <h2 className="text-2xl font-bold text-cyan-800 mb-3 flex items-center gap-2">
      <MapPin className="w-6 h-6" />
      Navy Pier
    </h2>
    <p className="text-gray-700 mb-4">
      A 3,300-foot-long pier packed with entertainment, restaurants, and
      attractions. Home to the iconic Centennial Wheel and stunning views of
      Lake Michigan.
    </p>
    <div className="bg-cyan-50 p-4 rounded-lg mb-4">
      <h3 className="font-semibold text-cyan-800 mb-2 flex items-center gap-2">
        <Camera className="w-5 h-5" />
        Photo Opportunities
      </h3>
      <ul className="text-gray-600 space-y-2">
        <li>• Sunset from the Centennial Wheel</li>
        <li>• Chicago skyline from the pier's edge</li>
        <li>• Fireworks on Wednesday & Saturday nights</li>
      </ul>
    </div>
    <div className="bg-yellow-50 p-4 rounded-lg mb-4">
      <h3 className="font-semibold text-yellow-800 mb-2">Must Try</h3>
      <ul className="text-gray-600 space-y-2">
        <li>• Garrett's Chicago Mix Popcorn</li>
        <li>• Architectural boat tours</li>
        <li>• Crystal Gardens indoor botanical park</li>
      </ul>
    </div>
    <button
      onClick={onClose}
      className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg w-full"
    >
      Close
    </button>
  </div>
);

const Overlays = {
  bean: BeanOverlay,
  willis: WillisOverlay,
  navyPier: NavyPierOverlay,
  bumblebee: TransformersOverlay,
  loop: LoopOverlay,
  monsterShout: MonsterShout,
};

export default Overlays;
