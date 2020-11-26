import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import Orders from "./Components/Orders";
import Myaccount from "./Components/Myaccount";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Admin from "./Components/Admin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/orders">
            <Header />
            <Myaccount
              ShoppingBasketIcon={ShoppingBasketIcon}
              PermIdentityIcon={PermIdentityIcon}
            />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/Payment">
            <Header />
            <Payment />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
