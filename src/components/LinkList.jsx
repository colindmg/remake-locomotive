import PropTypes from "prop-types";
import { useState } from "react";
import FloatingCard from "./FloatingCard";

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
        <FloatingCard
          link={props.links[currentLinkIndex]}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          currentLinkIndex={currentLinkIndex}
        />
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
