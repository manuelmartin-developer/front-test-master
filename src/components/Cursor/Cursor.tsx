import { useContext, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CursorVariantContext } from "../../contexts/CursorVariantContext";
import { CursorTextContext } from "../../contexts/CursorTextContext";

const Cursor: React.FC = () => {
  // Constants
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const cursorVariants = {
    input: {
      scale: 0.5,
      transition: {
        duration: 0.1,
      },
      backgroundColor: "#fff",
    },
    default: {
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.3,
      },
    },
    gallery: {
      scale: 1.5,
      transition: {
        duration: 0.1,
      },
      backgroundColor: "#fff",
      fontSize: "0.8rem",
      fontWeight: 700,
    },
    hidden: {
      scale: 0,
      transition: {
        duration: 0.3,
        delay: 1,
      },
      backgroundColor: "#fff",
      x: 0,
      y: 0,
    },
  };

  // APP contexts
  const { cursorVariant } = useContext(CursorVariantContext);
  const { cursorText } = useContext(CursorTextContext);

  useEffect(() => {
    const moveCursor = (e: any) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      variants={cursorVariants}
      className="cursor"
      animate={cursorVariant}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <span className="cursorText">{cursorText}</span>
    </motion.div>
  );
};

export default Cursor;
