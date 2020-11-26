import React from "react";
import Myaccount from "./Myaccount";
import StorageIcon from "@material-ui/icons/Storage";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ViewListIcon from "@material-ui/icons/ViewList";
import { useStateValue } from "../StateProvider";
import Login from "./Login";

function Admin() {
  const [{ user }] = useStateValue();
  if (user) {
    return (
      <Myaccount
        PeopleOutlineIcon={PeopleOutlineIcon}
        ViewListIcon={ViewListIcon}
        StorageIcon={StorageIcon}
        admin
      />
    );
  } else {
    return <Login />;
  }
}

export default Admin;
