import React from "react";
import { IoSearchSharp } from "@react-icons/all-files/io5/IoSearchSharp";

const Searcher = () => {
  return (
    <div id={"search_box"}>
      <form role="search" method="get">
        <div></div>
      </form>
      <IoSearchSharp />
    </div>
  );
};

export default Searcher;
