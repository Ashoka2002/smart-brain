import React from "react";
import "./ImageLinkForm.css";
import img1 from "./screen1.png";
import img2 from "./Screen2.png";
import img3 from "./Screen3.png";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  const toggleWindow = () => {
    const info = document.querySelector(".info-background");
    info.classList.toggle("hidden");
  };

  return (
    <div>
      <div className="info">
        <img
          onClick={toggleWindow}
          width="42"
          height="42"
          src="https://img.icons8.com/3d-fluency/94/info.png"
          alt="info"
        />
      </div>

      <div onClick={toggleWindow} className="info-background hidden">
        <div className="info-detail">
          <div className="image-detail">
            <img src={img1} alt="img" />
            <h3>Find image and copy url address</h3>
          </div>
          <div className="image-detail">
            <img src={img2} alt="img" />
            <h3>Paste URL in input</h3>
          </div>
          <div className="image-detail">
            <img src={img3} alt="img" />
            <h3>Here is the result.</h3>
          </div>
        </div>
      </div>
      <p className="f3">{"INPUT URL AND THIS DETECT FACE IN IMAGE,TRY IT."}</p>
      <div className="center">
        <div className="pa4 br3 shadow-5 center form inputBox">
          <input onChange={onInputChange} className="f4 pa2 w-70" type="text" required />
          <i></i>
          <button onClick={onButtonSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
