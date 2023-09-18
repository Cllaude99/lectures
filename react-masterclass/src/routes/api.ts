import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = async () => {
  const { data } = await axios(`${BASE_URL}/coins`);
  return data.slice(0, 100);
};

export const fetchCoinInfo = async (coinId: string) => {
  const { data } = await axios(`${BASE_URL}/coins/${coinId}`);
  return data;
};

export const fetchCoinTickers = async (coinId: string) => {
  const { data } = await axios(`${BASE_URL}/tickers/${coinId}`);
  return data;
};
