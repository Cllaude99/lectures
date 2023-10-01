import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center center;
  width: 200px;
  height: 200px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const boxVariants = {
    hover: { scale: 1.5, rotateZ: "90deg" },
    tap: { scale: 1, borderRadius: "100px" },
  };

  return (
    <Wrapper>
      <Box
        drag
        dragSnapToOrigin
        variants={boxVariants}
        whileHover="hover"
        whileTap="tap"
      />
    </Wrapper>
  );
}

export default App;
