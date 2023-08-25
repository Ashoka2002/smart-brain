import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">{`${
        name.split("")[0].toUpperCase() + name.slice(1)
      },Your Current entry count is..`}</div>
      <div className="white f1">{"#" + entries}</div>
    </div>
  );
};

export default Rank;
