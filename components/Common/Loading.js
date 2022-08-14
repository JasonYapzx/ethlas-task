import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = () => {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "relative",
        }}
      >
        <PropagateLoader color="white"/>
      </div>
    </div>
  );
};

export default Loading;