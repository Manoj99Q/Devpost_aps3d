import { useState, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Play  from './pages/Play'
function App() {
  const scriptRef = useRef(null);

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyArf3RwqKjHgqWU1ep8E6fGG-zEiOwjV10&v=alpha&libraries=maps3d";
      script.async = true;
      document.body.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow overflow-hidden">
        <Play />
      </div>
  </div>
  )
}

export default App
