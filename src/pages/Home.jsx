import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Col, Row, Statistic, Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../pages";
import { Loader } from "../components";

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10); // getting cryptos from the query endpoint

  const getStats = data?.data?.stats; // getting the crypto stats data

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

  const components = [
    {
      id: 1,
      title: "Top 10 Cryptocurrencies in the World",
      link: "/cryptocurrencies",
      component: <Cryptocurrencies simplified={true} />,
    },
    {
      id: 2,
      title: "Latest Cryptocurrencies News",
      link: "/news",
      component: <News simplified={true} />,
    },
  ];

  if (isFetching) return <Loader />;
  return (
    <>
      <div style={{ marginLeft: "2rem" }}>
        <Title level={2} className="heading">
          Global Crypto Statistics
        </Title>
        <Row>
          {/* Iterating over the cryptos stats */}
          {totalCoinStats.map((coinStats) => {
            const { id, title, value } = coinStats;
            return (
              <Col span={12} key={id}>
                <Statistic title={title} value={millify(value)} />
              </Col>
            );
          })}
          {/* End of iterating over the cryptos stats */}
        </Row>
        {components.map((comp) => {
          const { id, title, link, component } = comp;
          return (
            <section>
              <div className="home-heading-container" key={id}>
                <Title level={2} className="home-title">
                  {title}
                </Title>
                <Title level={3} className="show-more">
                  <Link to={link}>Show More</Link>
                </Title>
              </div>
              {component}
            </section>
          );
        })}
        {/* <div className="home-heading-container">
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
        <News simplified={true} /> */}
      </div>
    </>
  );
};

export default Home;
