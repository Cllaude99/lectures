import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";

interface ChartProps {
  coinId: string;
}
interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
const Chart = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>Chart {coinId}</h1>;
};

export default Chart;
