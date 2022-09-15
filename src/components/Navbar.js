import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography, Button, Menu } from "antd";
import icon from "../images/cryptocurrency.png";
import navLinks from "../utils/navLinks";
import { MenuOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Item } = Menu;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleScreenSize = setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleScreenSize);

    // handleScreenSize();
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Title level={2} className="logo">
          <Link to="/">Cryptocurrency</Link>
        </Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu ? (
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
      ) : null}
    </div>
  );
};

export default Navbar;
