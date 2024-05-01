import PropTypes from "prop-types";
import { useState } from "react";

const LinkList = (props) => {
  // Lien que l'on est actuellement en train de survoler
  const [currentLinkIndex, setCurrentLinkIndex] = useState(-1);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      {/* LISTE DE LIENS */}
      <div
        onMouseMove={handleMouseMove}
        className="flex px-10 flex-col items-start w-full"
      >
        <h2 className="text-stone-900 text-lg uppercase tracking-widest font-normal">
          covers
        </h2>
        {props.links.map((link, index) => (
          // LIEN
          <div
            onMouseEnter={() => setCurrentLinkIndex(index)}
            onMouseLeave={() => setCurrentLinkIndex(-1)}
            key={link.name}
            className={`w-full flex items-center border-t-2 px-5 py-3 border-stone-900 ${
              index === 0 ? "" : "border-b-2"
            }`}
          >
            <h2 className="text-[80px] font-display text-stone-900">
              {link.name}
            </h2>
          </div>
        ))}
        <h2 className="text-stone-900 uppercase tracking-widest font-normal self-end">
          @colindmg
        </h2>
      </div>

      {/* DIV D'IMAGE FLOTTANTE */}
      {currentLinkIndex !== -1 && (
        <div
          style={{
            position: "fixed",
            left: `${mousePosition.x + 50}px`,
            top: `${mousePosition.y - 250}px`,
            transition: "top 0.2s ease-out, left 0.2s ease-out",
          }}
          className="w-64 bg-stone-900 p-2 rounded-sm flex flex-col items-start pointer-events-none"
        >
          <img
            src={props.links[currentLinkIndex].images[0]}
            alt={props.links[currentLinkIndex].name}
            className="w-full h-full object-cover mb-2"
          />
          <h3 className="text-white text-lg font-light">
            {props.links[currentLinkIndex].name} by{" "}
            <span className="underline decoration-1 underline-offset-4 ">
              {props.links[currentLinkIndex].artist}
            </span>
          </h3>
        </div>
      )}
    </>
  );
};

LinkList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

export default LinkList;
