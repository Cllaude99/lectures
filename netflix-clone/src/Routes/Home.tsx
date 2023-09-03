import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../api";
import { styled } from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { makeImagePath } from "./utils";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

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
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
  color: white;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)<{ scrolly: number }>`
  position: absolute;
  width: 40vw;
  height: 80vh;

  top: ${(props) => props.scrolly + 150}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 35vh;
`;

const BigInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 36px;
  position: absolute;
  top: -100px;
`;

const BigOverview = styled.p`
  padding: 15px;
  position: absolute;
  top: -60;
  color: ${(props) => props.theme.white.lighter};
`;

const boxVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { type: "tween", delay: 0.3 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.1, type: "tween" },
  },
};

const offset = 6;

export const Home = () => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:id");
  const { scrollY } = useScroll();
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
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClicked = () => {
    navigate(-1);
  };
  const clickedMovie =
    bigMovieMatch?.params.id &&
    data?.results.find((movie) => movie.id + "" === bigMovieMatch.params.id);

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
                      layoutId={movie.id + ""}
                      variants={boxVariants}
                      bgphoto={makeImagePath(
                        movie.backdrop_path || movie.poster_path
                      )}
                      initial="initial"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  layoutId={bigMovieMatch.params.id}
                  scrolly={scrollY.get()}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top ,black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path
                          )})`,
                        }}
                      ></BigCover>
                      <BigInfoWrapper>
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                      </BigInfoWrapper>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};
