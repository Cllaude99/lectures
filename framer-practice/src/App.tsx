import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div: first-child {
    grid-column: span 2;
  }
  div: last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 1);
`;

const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

function App() {
  const [id, setId] = useState<number | null>(null);

  return (
    <Wrapper>
      <Grid>
        {[1, 2, 3, 4].map((n) => (
          <Box key={n} layoutId={n + ""} onClick={() => setId(n)} />
        ))}
      </Grid>
      {id ? (
        <AnimatePresence>
          <Overlay
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{
              backgroundColor: "rgba(0,0,0,0.7)",
              transition: { duration: 1 },
            }}
            exit={{
              backgroundColor: "rgba(0,0,0,0)",
              transition: { duration: 1 },
            }}
          >
            <Box
              style={{ width: 400, height: 200 }}
              key={id}
              layoutId={id + ""}
              onClick={() => setId(null)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            />
          </Overlay>
        </AnimatePresence>
      ) : null}
    </Wrapper>
  );
}

export default App;
