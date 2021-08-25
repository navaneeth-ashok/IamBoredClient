import "./Input.css";
import Suggestions from "./Suggestions";
import { useState } from "react";
import { useDebounce } from "use-debounce";

function Input() {
  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 2000);

  return (
    <div className="container">
      <div className="input__form text-center">
        <h1
          onClick={() => window.location.reload()}
          className="text-center fw-bold mt-3"
        >
          I am Bored!
        </h1>
        <p>Feeling Bored?</p>
        <p> Looking to discover some movies or tracks that you might like? </p>
        <p>Type your favorite music or song here</p>
        <header className="input-header"></header>

        <div className="">
          <input
            autoComplete="off"
            type="text"
            id="userInput"
            className="form-control  w-25 ms-auto me-auto"
            placeholder="Type a Movie or Track Name"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <span className="search"></span>
        </div>
      </div>
      <Suggestions searchText={value} />
    </div>
  );
}

export default Input;
