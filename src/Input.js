import "./Input.css";
import Button from "react-bootstrap/Button";
import Suggestions from "./Suggestions";
import { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    let updateText;
  }
  _onButtonClick() {
    this.updateText = document.getElementById("userInput").value;
    console.log("Button Clicked");
    console.log(this.updateText);
    this.setState({
      showComponent: true,
    });
  }

  render() {
    return (
      <div className="">
        <div className="input__form text-center">
          <h1 className="text-center text-secondary fw-bold mt-3">
            I am Bored!
          </h1>
          <header className="input-header"></header>
          <input
            type="text"
            id="userInput"
            className="form-control w-25 ms-auto me-auto"
            placeholder="Type a Movie or Track Name"
          ></input>
          <div className="">
            <Button
              variant="primary"
              className="m-3"
              onClick={this._onButtonClick}
            >
              Give me Suggestions
            </Button>
          </div>
        </div>
        {console.log(this.updateText)}
        {console.log("Rendering Suggestions")}
        {/* <Suggestions updateText={this.updateText} /> */}
        <div className="suggestion" id="sug">
          {this.state.showComponent ? (
            <Suggestions updateText={this.updateText} />
          ) : null}
        </div>
      </div>
    );
  }
}

// function Input() {
//   return (
//     <div className="">
//       <div className="input__form text-center">
//         <h1 className="text-center text-secondary fw-bold mt-3">I am Bored!</h1>
//         <header className="input-header"></header>
//         <input
//           type="text"
//           id="userInput"
//           className="form-control w-25 ms-auto me-auto"
//           placeholder="Type a Movie or Track Name"
//         ></input>
//         <div className="">
//           <Button variant="primary" className="m-3" onClick={<Suggestions />}>
//             Give me Suggestions
//           </Button>
//         </div>
//       </div>
//       <Suggestions />
//     </div>
//   );
// }

export default Input;
