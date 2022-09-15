import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons";

const navLinks = [
  {
    id: 1,
    icon: <HomeOutlined />,
    path: "/",
    text: "Home",
  },
  {
    id: 2,
    icon: <FundOutlined />,
    path: "/cryptocurrencies",
    text: "Cryptocurrencies",
  },

  {
    id: 3,
    icon: <BulbOutlined />,
    path: "/news",
    text: "News",
  },
];

export default navLinks;
