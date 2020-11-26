import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ProductTable from "./ProductTable";
import displayPhoto from "../media/avatar.jpg";
import Orders from "./Orders";
import Personaldata from "./Personaldata";
import "../Sharedstyle.css";
import "./Myaccount.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";

function Myaccount({
  admin,
  PermIdentityIcon,
  ShoppingBasketIcon,
  PeopleOutlineIcon,
  ViewListIcon,
}) {
  const [ordershow, setOrdershow] = useState(false);
  const [productshow, setProductshow] = useState(true);
  //Handle user as state
  const [{ user }] = useStateValue();
  const history = useHistory();

  //Handle the signout
  const handleSignOut = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    }
  };

  return (
    <div className="account">
      {/*Side Bar */}
      <div className="account__sidebar">
        <div className="account__avatar">
          <Avatar alt="Avatar" src={displayPhoto} className="MuiAvatar-img" />
        </div>
        <div className="account__displayname">
          <h2>{admin ? "ADMIN" : "Jokanola"}</h2>
        </div>

        <div className="account__link">
          {PermIdentityIcon ? (
            <div
              className="account__linkprofile"
              onClick={() => setOrdershow(false)}
            >
              <PermIdentityIcon className="account__linkicon" />{" "}
              <h4>Profile</h4>
            </div>
          ) : (
            ""
          )}

          {ShoppingBasketIcon ? (
            <div
              className="account__linkprofile"
              onClick={() => setOrdershow(true)}
            >
              <ShoppingBasketIcon className="account__linkicon" />
              <h4>Orders</h4>
            </div>
          ) : (
            ""
          )}

          {admin ? (
            <div
              className="account__linkprofile"
              onClick={() => setProductshow(false)}
            >
              <PeopleOutlineIcon className="account__linkicon" />
              <h4>Users</h4>
            </div>
          ) : (
            ""
          )}

          {admin ? (
            <div
              className="account__linkprofile"
              onClick={() => setProductshow(true)}
            >
              <ViewListIcon className="account__linkicon" />
              <h4>Products List</h4>
            </div>
          ) : (
            ""
          )}

          <Link to={!user && "/login"} style={{ color: "white" }}>
            <div className="account__linkprofile">
              <ExitToAppIcon
                className="account__linkicon"
                onClick={handleSignOut}
              />
              <h4>SignOut</h4>
            </div>
          </Link>
        </div>
      </div>

      {/*Render Manage User, Adding product if admin else Order and profile*/}

      {!admin ? (
        <div className="account__profile">
          {ordershow ? <Orders /> : <Personaldata />}
        </div>
      ) : (
        <div className="account__profile">
          {productshow ? (
            <ProductTable productList />
          ) : (
            <ProductTable userList />
          )}
        </div>
      )}
    </div>
  );
}

export default Myaccount;
