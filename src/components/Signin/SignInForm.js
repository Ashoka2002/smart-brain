import React from "react";
import Loader from "../loader/Loader";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      isLoading: false,
      errorMsg: "",
    };
  }

  timeout = (s) => {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    this.setState({ isLoading: true });
    const fetchPro = fetch("https://smartappserver.onrender.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    });
    Promise.race([fetchPro, this.timeout(60000)])
      .then((response) => {
        // if(!response.ok) throw new Error
        return response.json();
      })
      .then((user) => {
        if (user === "Invalid form submission") throw new Error(user);
        else if (user === "wrong credentials") throw new Error(user);

        this.setState({ isLoading: false });

        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err.message });
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <article className="br3 ba dark-gray mv4 w-100 w-50-m w-25-l mw6 shadow-5 center glasmorphin">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              {this.state.errorMsg !== "" ? <h4 style={{ color: "red", margin: "5px" }}>{this.state.errorMsg}</h4> : ""}
            </fieldset>

            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                onClick={this.onSubmitSignIn}
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p href="#0" onClick={() => onRouteChange("register")} className="f6 link dim black pointer db">
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
