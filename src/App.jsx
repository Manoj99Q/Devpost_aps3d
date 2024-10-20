import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Play from './pages/Play'
import Map3DModelTest from './components/Map3DModelTest'

function App() {
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      const script = document.createElement('script');
      script.innerHTML = `
        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=\`https://maps.\${c}apis.com/maps/api/js?\`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
          key: "AIzaSyArf3RwqKjHgqWU1ep8E6fGG-zEiOwjV10",
          v: "alpha",
          libraries: "maps3d"
        });
      `;
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();

    return () => {
      const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js?"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow overflow-hidden">
        <Play />
      </div>
      {/* <Map3DModelTest /> */}
    </div>
  )
}

export default App
