import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Error = () => {
  return (
    <Title
      level={2}
      className="head"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      They Was an Error. kindly go back Home -
      <Link to="/" className="btn">
        Click Me
      </Link>
    </Title>
  );
};

export default Error;
