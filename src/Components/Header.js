import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../media/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Badge from "@material-ui/core/Badge";
import { db, auth } from "../firebase";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";

const Header = () => {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const [searchexpand, setSearchexpand] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 300) {
      setSearchexpand(true);
    } else {
      setSearchexpand(false);
    }
  });

  console.log(user);
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="amazon-logo" className="header__logo" />
      </Link>

      <div className="header__nav">
        <Link to={user ? "/orders" : "/login"} style={{ color: "white" }}>
          <div className="header__option">
            <span className="header__optionTwo">
              <PersonIcon />
            </span>
            <span className="header__optionOne">
              {user ? `Hello,${user?.email}` : "Account"}{" "}
            </span>
          </div>
        </Link>

        <Link to="/" style={{ color: "white" }}>
          <div className="header__option">
            <span className="header__optionTwo">
              <HomeIcon />
            </span>
            <span className="header__optionOne">Home </span>
          </div>
        </Link>

        <Link to="/checkout" style={{ color: "white" }}>
          <div className="header__optionBasket">
            <Badge badgeContent={basket?.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
