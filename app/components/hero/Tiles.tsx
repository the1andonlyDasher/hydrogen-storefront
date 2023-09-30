import React, { useRef } from "react";
import {
  motion,
  useAnimation,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import { icons } from "./icons";
import { mainTexts } from "./mainTexts";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tile = ({ i, id, children, mainText, fallbacksrc, bgImage }:any) => {
  const tileVariants = {
    start: { scale: 0, opacity: 0 },
    entered: {
      scale: 1,
      opacity: 1,
    },
    exit: { scale: 0, opacity: 0 },
    hover: { scale: 1.2, zIndex: 10 },
    hoverEnd: { scale: 1, zIndex: 1 },
  };
  const tileControls = useAnimation();
  const ref = useRef<any>(!null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
      tileControls.start("entered");
  }, [tileControls]);

  return (
    <motion.div
      ref={ref}
      variants={tileVariants}
      initial="start"
      animate={tileControls}
      style={{backgroundImage:`url('${bgImage}')`, backgroundSize:"cover", backgroundPosition:"top"}}
      exit="exit"
      data-maintext={mainText}
      data-fallbacksrc={fallbacksrc}
      id={id}
      onError={(e) =>{}
      }
      onMouseEnter={(e) => {
        tileControls.start("hover");
      }}
      onMouseLeave={() => {
        tileControls.start("hoverEnd");

      }}
    >
      {children}
    </motion.div>
  );
};



const tiles = (array:any) => {
  const defaultItems = [...Array(array.length)];
  return (
    defaultItems.map((value, i) => 
    <Tile
      key={i}
      id={"tile" + i}
      i={value}
      mainText={mainTexts[i]}
      bgImage={array[i]}
      animate={{
        transition: {
          type: "srping",
          scale: {
            duration: Math.random() * i,
            delay: Math.random() * i,
          },
        },
      }}
    >
      
    </Tile>
 ))
};

export default function Tiles({addClass, gridClass, array, perspective}:any) {

  return (
    <>
    {perspective === true ?(
            <div className={`${addClass} container`}>
            <div className="feature-grid-container grid grid--columns">
              <motion.div className={`grid ${gridClass}`}>{tiles(array)}</motion.div>
            </div>
          </div>
    ) :(
      <div className={`${addClass} container`}>
      <div className=" grid grid--columns">
        <motion.div className={`grid ${gridClass}`}>{tiles(array)}</motion.div>
      </div>
    </div>
    )}

    </>
  );
}
