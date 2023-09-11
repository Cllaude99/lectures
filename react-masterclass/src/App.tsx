import { keyframes, styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;
const rotationAnimation = keyframes`
  from{
    transform: rotate(0deg);
    border-radius: 0px;
  }
  to{
    transform: rotate(360deg);
    border-radius: 50px;
  }
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: tomato;
  width: 200px;
  height: 200px;
  animation: ${rotationAnimation} 1s linear infinite;
  span {
    &:hover {
      font-size: 50px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>😊</span>
      </Box>
    </Wrapper>
  );
}

export default App;
