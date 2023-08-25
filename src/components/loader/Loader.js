import React, { useState, useEffect } from "react";
import "./loader.css";

const Loader = () => {
  let [timer, setTimer] = useState(60);

  const startTimer = () => {
    const clearI = setInterval(() => {
      timer--;
      setTimer(timer);
    }, 1000);

    setTimeout(() => {
      clearInterval(clearI);
    }, 60000);
  };

  useEffect(() => {
    startTimer();
  });

  return (
    <article className="br3 ba dark-gray mv4 w-100 w-50-m w-25-l mw6 shadow-5 center glasmorphin">
      <main className="pa4 black-80">
        <div className="measure">
          <span className="loader"></span>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Please Wait...</legend>
            <legend className="f3 fw6 ph0 mh0 mv2">This may take a while.</legend>
          </fieldset>
          <h1 style={{ color: "white", textShadow: "3px 2px 2px red", fontFamily: "cursive" }}>{timer}</h1>
        </div>
      </main>
    </article>
  );
};

export default Loader;
