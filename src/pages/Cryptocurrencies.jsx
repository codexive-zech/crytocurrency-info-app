import React, { useState, useEffect } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import millify from "millify";
import { Row, Col, Card, Input, Typography } from "antd";
import { Loader } from "../components";
const { Title } = Typography;
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filterCoin = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filterCoin);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {simplified ? null : (
        <section>
          <Title level={2} className="head">
            Cryptocurrencies
          </Title>
          <div className="search-crypto">
            <Input
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>
      )}

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
