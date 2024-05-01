import LinkList from "./components/LinkList";

import {
  Mobius1,
  Mobius2,
  Mobius3,
  Mobius4,
  Mobius5,
  Sherpa1,
  Sherpa2,
  Sherpa3,
  Sherpa4,
  Sherpa5,
} from "./assets";

const albumLinks = [
  {
    name: "Möbius",
    artist: "Rounhaa",
    images: [Mobius1, Mobius2, Mobius3, Mobius4, Mobius5],
  },
  {
    name: "Sherpa",
    artist: "Ajna",
    images: [Sherpa1, Sherpa2, Sherpa3, Sherpa4, Sherpa5],
  },
];

// Mémo Jauge de pixelisation des images sur PixelIt
// 1 : 2
// 2 : 3
// 3 : 5
// 4 : 10
// 5 : Originale

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-white flex flex-col justify-center">
        <LinkList links={albumLinks} />
      </div>
    </>
  );
}

export default App;
