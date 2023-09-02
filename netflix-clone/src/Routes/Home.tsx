import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../api";
import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "./utils";
import { useState } from "react";

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 26px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -400px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 200px;
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  color: red;
  font-size: 64px;
`;

const offset = 6;

export const Home = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["movies", "nowplaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  window.addEventListener("resize", () => setScreenWidth(window.innerWidth));

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                initial={{ x: screenWidth - 11 }}
                animate={{ x: 0 }}
                transition={{ type: "tween", duration: 1 }}
                exit={{ x: -screenWidth + 11 }}
              >
                {data?.results
                  .slice(1)
                  .slice(index * offset, index * offset + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgphoto={makeImagePath(movie.backdrop_path || "")}
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
};
