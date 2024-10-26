import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import LinkList from "./components/LinkList";
gsap.registerPlugin(useGSAP);

import {
  Hermite1,
  Hermite2,
  Hermite3,
  Hermite4,
  Hermite5,
  HermiteIcon,
  HermiteWhite,
  Mobius1,
  Mobius2,
  Mobius3,
  Mobius4,
  Mobius5,
  MobiusIcon,
  MobiusWhite,
  Sherpa1,
  Sherpa2,
  Sherpa3,
  Sherpa4,
  Sherpa5,
  SherpaIcon,
  SherpaWhite,
} from "./assets";

const albumLinks = [
  {
    name: "Sherpa",
    artist: "Ajna",
    images: [Sherpa1, Sherpa2, Sherpa3, Sherpa4, Sherpa5],
    icon: SherpaIcon,
  },
  {
    name: "Möbius",
    artist: "Rounhaa",
    images: [Mobius1, Mobius2, Mobius3, Mobius4, Mobius5],
    icon: MobiusIcon,
  },
  {
    name: "L'Hermite",
    artist: "Ajna",
    images: [Hermite1, Hermite2, Hermite3, Hermite4, Hermite5],
    icon: HermiteIcon,
  },
];

function App() {
  const mainPageRef = useRef(null);
  const logosRef = useRef([]);
  const loadingProgressText = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [entryAnimHasEnded, setEntryAnimHasEnded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    const imageUrls = [
      ...albumLinks.flatMap((album) => album.images),
      SherpaWhite,
      MobiusWhite,
      HermiteWhite,
      ...albumLinks.map((album) => album.icon),
    ];

    let loadedCount = 0;

    imageUrls.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setLoadingProgress((loadedCount / imageUrls.length) * 100);
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  useGSAP(() => {
    if (!imagesLoaded) {
      // ANIMATION DES LOGOS
      gsap.fromTo(
        logosRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.2,
          ease: "power1.out",
        }
      );
    } else {
      const tl = gsap.timeline();
      // ANIMATION D'ENTRÉE DE LA PAGE
      tl.fromTo(
        mainPageRef.current,
        {
          scale: 0.5,
          x: window.innerWidth,
        },
        {
          scale: 0.5,
          x: 0,
          duration: 1.5,
          delay: 1.5,
          ease: "power1.out",
          onStart: () => {
            // DISPARITION DES LOGOS DANS L'AUTRE SENS
            gsap.to(logosRef.current, {
              opacity: 0,
              delay: 0.3,
              duration: 0.3,
              stagger: -0.2,
              ease: "power1.out",
            });

            gsap.to(loadingProgressText.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power1.out",
            });
          },
        }
      ).to(mainPageRef.current, {
        scale: 1,
        duration: 1,
        ease: "power1.out",
        onComplete: () => {
          setEntryAnimHasEnded(true);
        },
      });
    }
  }, [imagesLoaded]);

  return (
    <>
      {!entryAnimHasEnded && (
        <div className="fixed flex items-center justify-center gap-7 h-screen w-screen bg-stone-900 z-50">
          <img
            ref={(el) => (logosRef.current[0] = el)}
            className="h-16"
            src={SherpaWhite}
            alt="Sherpa"
          />
          <img
            ref={(el) => (logosRef.current[1] = el)}
            className="h-16"
            src={MobiusWhite}
            alt="Möbius"
          />
          <img
            ref={(el) => (logosRef.current[2] = el)}
            className="h-16"
            src={HermiteWhite}
            alt="Hermite"
          />
        </div>
      )}

      <p
        ref={loadingProgressText}
        className="font-display text-4xl fixed z-[1000] bottom-10 left-10 text-white"
      >
        {loadingProgress}
      </p>

      <div
        ref={mainPageRef}
        onMouseMove={handleMouseMove}
        className={`fixed w-screen h-screen z-[100] bg-white flex flex-col justify-center ${
          entryAnimHasEnded ? "cursor-none" : "cursor-default"
        }`}
      >
        <LinkList links={albumLinks} mousePosition={mousePosition} />

        <div
          className={`opacity-0 absolute z-30 bg-stone-900 w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 ${
            entryAnimHasEnded ? "opacity-100" : ""
          }`}
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
