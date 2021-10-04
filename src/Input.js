import "./Input.css";
import Suggestions from "./Suggestions";
import { useState } from "react";
import { useDebounce } from "use-debounce";

function Input() {
  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 1500);

  function handleChange(newValue) {
    setSearchText(newValue);
  }

  return (
    <div className="container">
      <div className="input__form text-center">
        <button type="button" onClick={() => window.location.reload()}>
          <h1 className="text-center fw-bold mt-3">I am Bored!</h1>
        </button>
        <p>Feeling Bored?</p>
        <p>Looking to discover some movies or tracks that you might like?</p>
        <p>Type your favorite movie or song here</p>
        <header className="input-header"></header>

        <div className="">
          <input
            autoComplete="off"
            type="text"
            id="userInput"
            className="form-control  w-25 ms-auto me-auto"
            placeholder="Type a Movie or Track Name"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchText(e.target.value);
              }
            }}
          ></input>
          <span className="search"></span>
        </div>
      </div>
      <Suggestions searchText={value} onChange={handleChange} />
    </div>
  );
}

export default Input;
