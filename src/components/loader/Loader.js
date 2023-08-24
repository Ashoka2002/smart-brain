import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <article className="br3 ba dark-gray mv4 w-100 w-50-m w-25-l mw6 shadow-5 center glasmorphin">
      <main className="pa4 black-80">
        <div className="measure">
          <span className="loader"></span>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Please Wait...</legend>
            <legend className="f3 fw6 ph0 mh0">This may take a while.</legend>
          </fieldset>
        </div>
      </main>
    </article>
  );
};

export default Loader;
