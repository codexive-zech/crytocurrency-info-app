import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography, Button, Menu } from "antd";
import icon from "../images/cryptocurrency.png";
import navLinks from "../utils/navLinks";
import { MenuOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Item } = Menu;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true); //define a state for active menu
  const [screenSize, setScreenSize] = useState(null); // define a state for screen size

  useEffect(() => {
    const handleScreenSize = setScreenSize(window.innerWidth); // setting the screen size of web app

    window.addEventListener("resize", handleScreenSize); // listening for a resize event based on the new screen size

    // handleScreenSize();
    return () => window.removeEventListener("resize", handleScreenSize); // clean up function for the event
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false); // set active menu state to false when it's on a smaller screen
    } else {
      setActiveMenu(true); // set active menu state to false when it's on a bigger screen
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
      {/* display Navbar list only when the active menu state is true */}
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
