import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography, Button, Menu } from "antd";
import icon from "../images/cryptocurrency.png";
import navLinks from "../utils/navLinks";

const { Title } = Typography;
const { Item } = Menu;

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Title level={2} className="logo">
          <Link to="/">Cryptocurrency</Link>
        </Title>
      </div>
      <Menu theme="dark">
        {navLinks.map((navLink) => {
          const { id, path, icon, text } = navLink;
          return (
            <Item key={id} icon={icon} style={{ marginTop: "1rem" }}>
              <Link
                to={path}
                className="link-font"
                style={{ paddingLeft: "1rem" }}
              >
                {text}
              </Link>
            </Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default Navbar;
