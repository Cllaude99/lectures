import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  name: string;
}

const Coin = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useLocation();

  return (
    <Container>
      <Header>
        <Title> {state?.name || `Loading`}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}{" "}
    </Container>
  );
};

export default Coin;
