import React, { useState } from "react";

const Search = ({ search, setInput }) => {
  // 把輸入格的東西抓近來
  // 透過js的節點去抓
  // 必須以arrow function去做 以確保執行面
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input onChange={inputHandler} type="text" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
