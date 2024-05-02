import { useState } from "react";
import LinkList from "./components/LinkList";

import {
  Hermite1,
  Hermite2,
  Hermite3,
  Hermite4,
  Hermite5,
  Mobius1,
  Mobius2,
  Mobius3,
  Mobius4,
  Mobius5,
  MobiusIcon,
  Sherpa1,
  Sherpa2,
  Sherpa3,
  Sherpa4,
  Sherpa5,
  SherpaIcon,
} from "./assets";

const albumLinks = [
  {
    name: "Möbius",
    artist: "Rounhaa",
    images: [Mobius1, Mobius2, Mobius3, Mobius4, Mobius5],
    icon: MobiusIcon,
  },
  {
    name: "Sherpa",
    artist: "Ajna",
    images: [Sherpa1, Sherpa2, Sherpa3, Sherpa4, Sherpa5],
    icon: SherpaIcon,
  },
  {
    name: "L'Hermite",
    artist: "Ajna",
    images: [Hermite1, Hermite2, Hermite3, Hermite4, Hermite5],
  },
];

// Mémo Jauge de pixelisation des images sur PixelIt
// 1 : 2
// 2 : 3
// 3 : 5
// 4 : 10
// 5 : Originale

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        className="w-screen h-screen cursor-none bg-white flex flex-col justify-center"
      >
        <LinkList links={albumLinks} mousePosition={mousePosition} />
        <div
          className="absolute z-30 bg-stone-900 w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
      </div>
    </>
  );
}

export default App;
