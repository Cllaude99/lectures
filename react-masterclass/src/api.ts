const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

export const fetchCoinInfo = (coinId: string | undefined) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const fetchCoinTickers = (coinId: string | undefined) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};
