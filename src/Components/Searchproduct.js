import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Searchproduct.css";

function Searchproduct({ onSearchChange }) {
  return (
    <div className="search">
      <input type="text" placeholder="search" onChange={onSearchChange} />
      <SearchIcon className="search__icon" />
      {/*  */}
    </div>
  );
}

export default Searchproduct;
