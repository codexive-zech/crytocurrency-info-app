import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Col, Row, Statistic, Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../pages";

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const getStats = data?.data?.stats;

  const totalCoinStats = [
    {
      id: 1,
      title: "Total Crypto",
      value: getStats?.total,
    },
    {
      id: 2,
      title: "Total Exchanges",
      value: getStats?.totalExchanges,
    },
    {
      id: 3,
      title: "Total Market Cap",
      value: getStats?.totalMarketCap,
    },
    {
      id: 4,
      title: "Total 24h Volume",
      value: getStats?.total24hVolume,
    },
    {
      id: 5,
      title: "Total Market",
      value: getStats?.totalMarkets,
    },
  ];

  if (isFetching) return <h1 style={{ marginLeft: "2rem" }}>Loading...</h1>;
  return (
    <>
      <div style={{ marginLeft: "2rem" }}>
        <Title level={2} className="heading">
          Global Crypto Statistics
        </Title>
        <Row>
          {totalCoinStats.map((coinStats) => {
            const { id, title, value } = coinStats;
            return (
              <Col span={12} key={id}>
                <Statistic title={title} value={millify(value)} />
              </Col>
            );
          })}
        </Row>
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Top 10 Cryptocurrencies in the World
          </Title>
          <Title level={3} className="show-more">
            <Link to="/cryptocurrencies">Show More</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified={true} />
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Latest Cryptocurrencies News
          </Title>
          <Title level={3} className="show-more">
            <Link to="/news">Show More</Link>
          </Title>
        </div>
        <News simplified={true} />
      </div>
    </>
  );
};

export default Home;
