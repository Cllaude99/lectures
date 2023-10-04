import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  initial: (isForward: boolean) => ({
    opacity: 0,
    scale: 0,
    x: isForward ? 600 : -600,
  }),
  animate: (isForward: boolean) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "ease", duration: 1 },
  }),
  leave: (isForward: boolean) => ({
    scale: 0,
    opacity: 0,
    x: isForward ? -600 : 600,
  }),
};

function App() {
  const [number, setNumber] = useState(1);
  const [isForward, setForward] = useState(true);

  const prevClick = () => {
    setNumber((prev) => (prev === 1 ? 1 : prev - 1));
    setForward(false);
  };
  const nextClick = () => {
    setNumber((prev) => (prev === 10 ? 10 : prev + 1));
    setForward(true);
  };

  return (
    <Wrapper>
      <span>
        <button onClick={prevClick}>prev</button>
        <button onClick={nextClick}>next</button>{" "}
      </span>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
          i === number ? (
            <Box
              key={i}
              variants={boxVariants}
              custom={isForward}
              initial="initial"
              animate="animate"
              exit="leave"
            >
              {i}
            </Box>
          ) : null
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
