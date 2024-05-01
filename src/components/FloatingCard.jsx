import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const FloatingCard = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);
  const cardImgRef = useRef(null);

  // ANIMATION ENTRÉE ET SORTIE
  useGSAP(() => {
    gsap.from(cardRef.current, {
      duration: 0.5,
      opacity: 0,
      scale: 0.5,
      delay: 0.1,
      ease: "power1.out",
    });

    gsap.from(cardImgRef.current, {
      duration: 0.4,
      height: 0,
      delay: 0.2,
      ease: "power1.out",
    });

    return () => {
      gsap.to(cardRef.current, {
        duration: 0.5,
        opacity: 0,
        scale: 0.5,
        ease: "power1.in",
      });
    };
  }, []);

  // ANIMATION DE SUIVI DE LA SOURIS
  useGSAP(() => {
    gsap.to(cardRef.current, {
      duration: 0.2,
      left: `${props.mouseX + 50}px`,
      bottom: `${window.innerHeight - props.mouseY - 50}px`,
      ease: "none",
      overwrite: "auto",
    });
  }, [props.mouseX, props.mouseY]);

  // ANIMATION CHANGEMENT D'IMAGE
  useEffect(() => {
    setCurrentImageIndex(0);

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= props.link.images.length) {
          clearInterval(timer);
          return prevIndex;
        }
        return nextIndex;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [props.link.images.length, props.currentLinkIndex]);

  return (
    <div
      ref={cardRef}
      style={{
        transition: "bottom 0.2s ease-out, left 0.2s ease-out",
      }}
      className="fixed w-64 bg-stone-900 p-2 rounded-sm flex flex-col items-start pointer-events-none"
    >
      <img
        ref={cardImgRef}
        src={props.link.images[currentImageIndex]}
        alt={props.link.name}
        className="w-full h-full object-cover object-center mb-2"
      />
      <h3 className="text-white text-lg font-light">
        {props.link.name} by{" "}
        <span className="underline decoration-1 underline-offset-4 ">
          {props.link.artist}
        </span>
      </h3>
    </div>
  );
};

FloatingCard.propTypes = {
  mouseX: PropTypes.number.isRequired,
  mouseY: PropTypes.number.isRequired,
  link: PropTypes.shape({
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  currentLinkIndex: PropTypes.number.isRequired,
};

export default FloatingCard;
