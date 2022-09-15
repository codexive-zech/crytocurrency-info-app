import React, { useState } from "react";
import { Avatar, Col, Row, Select, Card, Typography } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import moment from "moment";

const { Option } = Select;
const { Title, Text } = Typography;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const News = ({ simplified }) => {
  const count = simplified ? 6 : 18;
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  if (isFetching) return <h1 style={{ marginLeft: "2rem" }}>Loading...</h1>;

  return (
    <>
      {simplified ? null : (
        <Col span={24}>
          <Title level={2} className="head">
            Cryptocurrency News
          </Title>
          <Select
            style={{ margin: "1.3rem" }}
            className="select-news"
            onChange={(value) => setNewsCategory(value)}
            showSearch
            optionFilterProp="children"
            filterOption={(option, input) =>
              option.children.toLowerCase().indexOf(input.toLowerCase())
            }
            placeholder="Select a Cryptocurrency"
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => {
              return (
                <Option value={coin.name} key={coin.name}>
                  {coin.name}
                </Option>
              );
            })}
          </Select>
        </Col>
      )}
      <Row gutter={[32, 32]}>
        {cryptoNews?.value.map((news, index) => {
          return (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                className="news-card"
                hoverable
                style={{ marginLeft: "1.3rem" }}
              >
                <a href={news?.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news?.name}
                    </Title>
                    <img
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt="image"
                    />
                  </div>
                  <p>
                    {news.description > 100
                      ? news?.description.substring(0, 100)
                      : news?.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={
                          news?.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                      />
                      <Text className="provider-name">
                        {news?.provider[0]?.name}
                      </Text>
                    </div>
                    <Text>
                      {moment(news?.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default News;
