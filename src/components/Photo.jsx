import React from "react";

const Photo = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="ImageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        Download This:
        {/* target blank是讓他開啟新分頁 */}
        <a target="_blank" href={data.src.large}>
          Click Here
        </a>
      </p>
    </div>
  );
};

export default Photo;
