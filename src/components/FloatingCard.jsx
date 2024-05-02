import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const FloatingCard = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);
  const cardImgRef = useRef(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // ANIMATION ENTRÉE ET SORTIE
  useGSAP(() => {
    if (props.animationType === "enter") {
      setIsFirstRender(false);
      gsap.fromTo(
        cardRef.current,
        {
          duration: 0.5,
          opacity: 0,
          scale: 0.5,
          delay: 0.1,
          ease: "power1.out",
        },
        {
          opacity: 1,
          scale: 1,
        }
      );

      gsap.fromTo(
        cardImgRef.current,
        {
          duration: 0.4,
          height: 0,
          delay: 0.2,
          ease: "power1.out",
        },
        {
          height: "auto",
        }
      );
    } else if (props.animationType === "leave" && !isFirstRender) {
      gsap.to(cardRef.current, {
        duration: 0.5,
        opacity: 0,
        delay: 0.1,
        ease: "power1.out",
      });
      gsap.to(cardImgRef.current, {
        duration: 0.4,
        height: 0,
        delay: 0,
        ease: "power1.out",
      });
    }
  }, [props.animationType]);

  // ANIMATION DE SUIVI DE LA SOURIS
  useGSAP(() => {
    gsap.to(cardRef.current, {
      duration: 0.2,
      left: `${props.mouseX + 50}px`,
      bottom: `${window.innerHeight - props.mouseY - 150}px`,
      ease: "none",
      overwrite: "auto",
    });
  }, [props.mouseX, props.mouseY]);

  // ANIMATION CHANGEMENT D'IMAGE
  useEffect(() => {
    if (props.animationType === "leave") {
      return;
    }
    setCurrentImageIndex(0);

    let delay = 200;
    if (props.animationType === "change") {
      delay = 0;
    }
    const timeout = setTimeout(() => {
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
      return () => {
        clearInterval(timer);
      };
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.link.images.length, props.currentLinkIndex, props.animationType]);

  return (
    <div
      ref={cardRef}
      style={{
        transition: "bottom 0.2s ease-out, left 0.2s ease-out",
      }}
      className="opacity-40 fixed z-50 w-64 bg-stone-900 p-2 rounded-sm flex flex-col items-start pointer-events-none"
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
  animationType: PropTypes.string,
};

export default FloatingCard;
