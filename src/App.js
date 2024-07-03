import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/Signin/SignInForm";
import Register from "./components/Register/Register";
import LoadingBar from "react-top-loading-bar";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
  progress: 0,
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    // clarifai-->

    // eslint-disable-next-line
    fetch("https://smartappserver.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.setProgress(20);
          fetch("https://smartappserver.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => {
              this.setProgress(50);
              return response.json();
            })
            .then((count) => {
              this.setProgress(100);
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));

    //clarifai<--
  };

  onRouteChange = (route) => {
    if (route === "sighout") {
      this.setState({ route: "signin" });
      this.setState(initialState);
      return;
    } else if (route === "home") {
      this.setState({ isSignIn: "true" });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignIn, imageUrl, route, box } = this.state;
    const { name, entries } = this.state.user;
    return (
      <div className="App ">
        <LoadingBar color="rgb(255,255,255,0.9)" height={3} transitionTime={520} progress={this.state.progress} />
        <ParticlesBg
          type="random"
          /*num={200}*/ bg={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
          className="particles-bg-canvas-self"
        />
        <Navigation isSignIn={isSignIn} onRouteChange={this.onRouteChange} />
        {route === "home" ? (
          <div>
            <Rank name={name} entries={entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
