import { Link } from "react-router-dom";
import styled from "styled-components";
import { coinIcon } from "../utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  left: 0px;
  right: 0px;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 100px;
`;
const CoinsList = styled.ul`
  margin-top: 40px;
`;
const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 25px;
  a {
    padding: 20px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  border-radius: 5px;
`;

const coinsArray = [
  "BTC",
  "ETH",
  "ADA",
  "XRP",
  "SOL",
  "DOT",
  "TRX",
  "MATIC",
  "STORJ",
];
const Home = () => {
  return (
    <Wrapper>
      <Title>Crypto Checker!</Title>
      <CoinsList>
        {coinsArray.map((symbol) => (
          <Coin key={symbol}>
            <Link to={`/${symbol}`} state={{ symbol }}>
              <Img src={coinIcon(symbol.toLowerCase())} />
              <h4>{symbol}</h4>
            </Link>
          </Coin>
        ))}
      </CoinsList>
    </Wrapper>
  );
};

export default Home;
