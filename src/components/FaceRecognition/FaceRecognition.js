import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  const faceBox = {
    top: box.topRow,
    left: box.leftCol,
    right: box.rightCol,
    bottom: box.bottomRow,
  };

  return (
    <div className="center ma">
      <div className="absolute">
        <img id="inputImage" src={imageUrl} alt="" width="500px" height="auto" />
        <div style={faceBox} className="bounding-box"></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
