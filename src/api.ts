const baseUrl = `https://api.binance.com/api/v3`;

export const getCandlestickData = (
  symbol: string,
  interval: string,
  limit: number
) => {
  return fetch(
    `${baseUrl}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  ).then((res) => res.json());
};
