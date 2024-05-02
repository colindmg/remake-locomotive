import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FloatingCard from "./FloatingCard";

const LinkList = (props) => {
  // Lien que l'on est actuellement en train de survoler
  const [currentLinkIndex, setCurrentLinkIndex] = useState(-1);
  const [previousLinkIndex, setPreviousLinkIndex] = useState(0);
  const [animationType, setAnimationType] = useState(null);

  useEffect(() => {
    // console.log(previousLinkIndex, "->", currentLinkIndex);
    if (previousLinkIndex === -1) {
      setAnimationType("enter");
      console.log("enter");
    } else if (currentLinkIndex === -1) {
      setAnimationType("leave");
      console.log("leave");
    } else {
      setAnimationType("change");
      console.log("change");
    }
  }, [previousLinkIndex, currentLinkIndex]);

  return (
    <>
      {/* LISTE DE LIENS */}
      <div className="flex px-10 flex-col items-start w-full">
        <h2 className="text-stone-900 text-lg uppercase tracking-widest font-normal">
          covers
        </h2>
        {props.links.map((link, index) => (
          // LIEN
          <div
            onMouseEnter={() => {
              setPreviousLinkIndex(currentLinkIndex);
              setCurrentLinkIndex(index);
            }}
            onMouseLeave={() => {
              setPreviousLinkIndex(currentLinkIndex);
              setCurrentLinkIndex(-1);
            }}
            key={link.name}
            className={`w-full flex group items-center justify-between border-t-2 px-5 py-3 border-stone-900 ${
              index == props.links.length - 1 ? " border-b-2" : ""
            }`}
          >
            <div className="relative">
              <h2 className="text-[80px] font-display text-stone-900">
                {link.name}
              </h2>
              <h2 className="absolute top-0 text-[80px] font-display text-stone-900">
                {link.name}
              </h2>
            </div>

            {link.icon && (
              <img
                src={link.icon}
                alt={link.name}
                className="h-2/4 opacity-0 object-cover object-center  translate-y-7 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
              />
            )}
          </div>
        ))}
        <h2 className="text-stone-900 font-normal self-end font-display italic mt-2">
          colindmg
        </h2>
      </div>

      {/* DIV D'IMAGE FLOTTANTE */}
      <FloatingCard
        link={
          currentLinkIndex !== -1
            ? props.links[currentLinkIndex]
            : props.links[previousLinkIndex]
        }
        mouseX={props.mousePosition.x}
        mouseY={props.mousePosition.y}
        currentLinkIndex={currentLinkIndex}
        animationType={animationType}
      />
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
  mousePosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default LinkList;
