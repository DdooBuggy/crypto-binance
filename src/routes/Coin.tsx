import ApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getCandlestickData } from "../api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 100px;
  font-weight: 600;
  margin-bottom: 50px;
`;
interface RouteState {
  symbol: string;
}
const Coin = () => {
  const symbol = (useLocation().state as RouteState)?.symbol;
  const USDTsymbol = symbol + "USDT";
  const [interval, setInterval] = useState("5m");
  const [limit, setLimit] = useState(100);
  const { isLoading, data } = useQuery(
    ["klines", USDTsymbol, interval, limit],
    () => getCandlestickData(USDTsymbol, interval, limit),
    { refetchInterval: 5000 }
  );
  const [chartData, setChartData] = useState();
  useEffect(() => {
    if (data) {
      const data2 = data?.map(
        (price: any) =>
          new Object({
            x: new Date(price[0] + 9 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[1]
              .split(".")[0],
            y: [price[1], price[2], price[3], price[4]],
          })
      );
      // const heikinData = data?.map((price: any, index: number, array: any) => {
      //   const open = +price[1];
      //   const high = +price[2];
      //   const low = +price[3];
      //   const close = +price[4];
      //   if (index === 0) {
      //     return new Object({
      //       x: new Date(price[0] + 9 * 60 * 60 * 1000)
      //         .toISOString()
      //         .split("T")[1]
      //         .split(".")[0],
      //       y: [
      //         (open + close) / 2,
      //         Math.max(open, high, close),
      //         Math.min(low, open, close),
      //         (open + high + low + close) / 4,
      //       ],
      //     });
      //   } else {
      //     const beforeOpen = +array[index - 1][1];
      //     const beforeClose = +array[index - 1][4];
      //     return new Object({
      //       x: new Date(price[0] + 9 * 60 * 60 * 1000)
      //         .toISOString()
      //         .split("T")[1]
      //         .split(".")[0],
      //       y: [
      //         (beforeOpen + beforeClose) / 2,
      //         Math.max(open, high, close),
      //         Math.min(low, open, close),
      //         (open + high + low + close) / 4,
      //       ],
      //     });
      //   }
      // });
      const heikinData = [] as any;
      heikinData.push(
        new Object({
          x: new Date(data[0][0] + 9 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[1]
            .split(".")[0],
          y: [
            (+data[0][1] + +data[0][4]) / 2,
            Math.max(+data[0][1], +data[0][2], +data[0][4]),
            Math.min(+data[0][3], +data[0][1], +data[0][4]),
            (+data[0][1] + +data[0][2] + +data[0][3] + +data[0][4]) / 4,
          ],
        })
      );
      for (let i = 1; i < data.length; i++) {
        const currentCandle = data[i];
        const beforeCandel = heikinData[i - 1].y as any;
        const open = +currentCandle[1];
        const high = +currentCandle[2];
        const low = +currentCandle[3];
        const close = +currentCandle[4];
        heikinData.push(
          new Object({
            x: new Date(data[i][0] + 9 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[1]
              .split(".")[0],
            y: [
              (+beforeCandel[0] + +beforeCandel[3]) / 2,
              Math.max(
                open,
                high,
                close,
                (+beforeCandel[0] + +beforeCandel[3]) / 2
              ),
              Math.min(low, open, close),
              (open + high + low + close) / 4,
            ],
          })
        );
      }
      // setChartData(data2);
      setChartData(heikinData);
    }
  }, [data]);
  return (
    <Wrapper>
      <Title>{symbol}/USDT</Title>
      <ApexCharts
        type="candlestick"
        series={[
          {
            name: "Price",
            data: chartData || [],
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            background: "transparent",
          },
          title: {
            text: `${USDTsymbol}`,
            align: "left",
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </Wrapper>
  );
};

export default Coin;
