import { useLocation } from "react-router-dom";

interface RouteState {
  symbol: string;
}
const Coin = () => {
  const symbol = (useLocation().state as RouteState)?.symbol;
  return <li>coin{symbol}</li>;
};

export default Coin;
