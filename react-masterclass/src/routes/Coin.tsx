import styled from "styled-components";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
export interface Links {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  source_code: string[];
  website: string[];
  youtube: string[];
}
export interface LinksExtended {
  url: string;
  type: string;
  stats?: Stats;
}
export interface Stats {
  subscribers?: number;
  contributors?: number;
  stars?: number;
  followers?: number;
}
export interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}
export interface Team {
  id: string;
  name: string;
  position: string;
}
export interface Whitepaper {
  link: string;
  thumbnail: string;
}
export interface Quotes {
  USD: Usd;
}
export interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: Tag[];
  team: Team[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: Links;
  links_extended: LinksExtended[];
  whitepaper: Whitepaper;
  first_data_at: Date;
  last_data_at: Date;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

const Coin = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { coinId } = useParams();
  const { state } = useLocation();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = (
        await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).data;
      const priceData = (
        await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).data;
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <Title> {state?.name || `Loading`}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
