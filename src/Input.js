import "./Input.css";
import Suggestions from "./Suggestions";
import { useState } from "react";

function Input() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="container">
      <div className="input__form text-center">
        <h1
          onClick={() => window.location.reload()}
          className="text-center fw-bold mt-3"
        >
          I am Bored!
        </h1>
        <header className="input-header"></header>

        <div className="">
          <input
            type="text"
            id="userInput"
            className="form-control  w-25 ms-auto me-auto"
            placeholder="Type a Movie or Track Name"
            onChange={() =>
              setSearchText(document.getElementById("userInput").value)
            }
          ></input>
          <span className="search"></span>
        </div>
      </div>
      <Suggestions searchText={searchText} />
    </div>
  );
}

export default Input;
