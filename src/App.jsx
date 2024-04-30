import LinkList from "./LinkList";

const albumLinks = [
  {
    name: "Möbius",
    artist: "Rounhaa",
    images: [],
  },
  {
    name: "Sherpa",
    artist: "Ajna",
    images: [],
  },
];

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
