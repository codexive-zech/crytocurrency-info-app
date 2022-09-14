import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import millify from "millify";
import { Row, Col, Card, Input } from "antd";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 50;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  console.log(cryptos);

  if (isFetching) return <h1 style={{ marginLeft: "2rem" }}>Loading...</h1>;

  return (
    <>
      <Row className="crypto-card-container" gutter={[15, 15]}>
        {cryptos?.map((currency) => {
          return (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency?.uuid}
            >
              <Link to={`/crypto/${currency?.uuid}`}>
                <Card
                  style={{ marginLeft: "1.3rem" }}
                  title={`${currency?.rank}. ${currency?.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={currency?.iconUrl}
                      alt="Crypto Image"
                    />
                  }
                  hoverable
                >
                  <p>Price : {millify(currency?.price)}</p>
                  <p>Market Cap : {millify(currency?.marketCap)}</p>
                  <p>Daily Change : {millify(currency?.change)}%</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
