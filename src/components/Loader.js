import { Spin } from "antd";

import React from "react";

const Loader = () => {
  return (
    <div className="loader" style={{ marginLeft: "2rem" }}>
      <Spin />
    </div>
  );
};

export default Loader;
