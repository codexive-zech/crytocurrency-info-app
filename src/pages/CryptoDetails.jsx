import React from "react";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useParams } from "react-router-dom";
import { Col, Row, Typography } from "antd";
import { useGetCryptoDetailQuery } from "../services/cryptoApi";
import {
  CheckOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
  DollarCircleOutlined,
  NumberOutlined,
  TrophyOutlined,
  FundOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Loader } from "../components";

const { Title, Text } = Typography;

const CryptoDetails = () => {
  const { uuid } = useParams(); // getting the id of single cryptocurrency
  // const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailQuery(uuid); // getting cryptocurrency from the query endpoint based on the id

  const cryptoDetails = data?.data?.coin; // destructuring into a single crypto detail (optional chaining)

  // const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price ? millify(cryptoDetails?.price) : null}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },

    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap ? millify(cryptoDetails?.marketCap) : null
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price
          ? millify(cryptoDetails?.allTimeHigh?.price)
          : null
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total
          ? millify(cryptoDetails?.supply?.total)
          : null
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating
          ? millify(cryptoDetails?.supply?.circulating)
          : null
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching) return <Loader />;

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
          </Title>
          <p>
            {cryptoDetails?.name} live price in US dollars. View Value,
            Statistics, Market Cap and Supply.
          </p>
        </Col>
        {/* <Select
          defaultValue="7d"
          onChange={(value) => setTimePeriod(value)}
          placeholder="Select Time Period"
          className="select-timeperiod"
        >
          {time?.map((date) => {
            return <Option key={date}>{date}</Option>;
          })}
        </Select> */}
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title className="coin-details-heading">
                {cryptoDetails?.name} Value Statistics.
              </Title>
              <p>An Overview Showing the Statistics of {cryptoDetails?.name}</p>
            </Col>
            {/* iterating over the stats array value */}
            {stats.map((stat) => {
              const { icon, title, value } = stat;
              return (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              );
            })}
          </Col>
          {/* Other currency Value */}
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title className="coin-details-heading">
                Other Value Statistics.
              </Title>
              <p>An Overview Showing the Statistics of all Cryptocurrency</p>
            </Col>
            {/* iterating over the generic stats array value */}
            {genericStats.map((stat) => {
              const { icon, title, value } = stat;
              return (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              );
            })}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title className="coin-details-heading" level={3}>
              What is {cryptoDetails?.name}?
              {HTMLReactParser(cryptoDetails?.description)}
            </Title>
          </Row>
          <Col className="coin-links">
            <Title className="coin-details-heading" level={3}>
              {cryptoDetails?.name} Links
            </Title>
            {cryptoDetails.links.map((link) => {
              return (
                <Row className="coin-link" key={link?.name}>
                  <Title className="link-name" level={5}>
                    {link?.type}
                  </Title>
                  <a href={link?.url} rel="noreferrer" target="_blank">
                    {link?.name}
                  </a>
                </Row>
              );
            })}
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;
