import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "./Suggestions.css";
import { MovieSuggestion, TrackSuggestion } from "./SuggestionComp";

let previousString = "";
function Suggestions(props) {
  const [receivedData, setReceivedData] = useState({
    isLoaded: false,
    items: [],
  });
  const [filterSuggestion, setSuggestionFilter] = useState({
    movieResults: true,
    trackResults: true,
    buttonState: 0,
  });
  let movieList = 1;
  let trackList = 1;
  let suggestionList = 1;
  let serviceDown = false;

  useEffect(() => {
    if (previousString !== props.searchText) {
      setReceivedData({ isLoaded: false });
      getSuggestions();
    }
  }, [props.searchText, getSuggestions]);

  function getSuggestions() {
    let searchString = props.searchText;
    previousString = searchString;
    let body = {
      userInput: searchString,
    };
    fetch("https://back-end-dot-iamboredapp.uc.r.appspot.com/fetchSuggestion", {
      method: "POST",
      body: new URLSearchParams({ userInput: body.userInput }),
    })
      .then((res) => res.json())
      .then((json) => {
        setReceivedData({
          isLoaded: true,
          items: json,
        });
      });
  }

  function renderTracksList() {
    let { items } = receivedData;
    let { movieResults } = filterSuggestion;
    let p = items[0];
    let track_parent_div = [];

    if (p.tracks === null) {
      trackList = 0;
      return (
        <div className="row">
          <div className="col text-center">
            I could not find any tracks for that search
          </div>
        </div>
      );
    } else {
      trackList = 1;
      for (let a in p) {
        if (a === "tracks") {
          let trackObj = p[a];
          for (let track in trackObj) {
            let album = trackObj[track];
            let col_num = "col-sm-6";
            if (items[1] !== undefined) {
              if (
                items[1]?.Similar?.Results?.length === 0 ||
                JSON.stringify(items[1]).includes(
                  "Rate limit exceeded, try again later"
                ) ||
                JSON.stringify(items[1]).includes(
                  "MovieSuggestion API is down"
                ) ||
                movieResults === false
              ) {
                col_num = "col-sm-4";
              }
            }
            track_parent_div.push(
              <TrackSuggestion
                Name={album.name}
                ImgSrc={album.album.images[0].url}
                AlbumName={album.album.name}
                AlbumLink={album.album.external_urls.spotify}
                TrackID={album.id}
                col={col_num}
              />
            );
          }
        }
      }
      return <div className="row">{track_parent_div}</div>;
    }
  }

  function renderMovieList() {
    let { items } = receivedData;
    let { trackResults } = filterSuggestion;
    if (items[1] !== undefined) {
      if (items[1]?.Similar?.Results?.length === 0) {
        movieList = 0;
        return "";
      }
      if (
        JSON.stringify(items[1]).includes(
          "Rate limit exceeded, try again later"
        ) ||
        JSON.stringify(items[1]).includes("MovieSuggestion API is down")
      ) {
        serviceDown = true;
        movieList = 0;
        return "";
      }
    }

    let item = items
      .slice(1, 2)
      .map((item) => item.Similar.Results)
      .map((results) => results);
    let p = item[0];
    let movie_parent_div = [];
    let col_num = "col-sm-6";
    if (items[0] !== undefined) {
      if (trackResults === false) {
        col_num = "col-sm-4";
      }
    }
    for (let a in p) {
      let value = p[a];
      movie_parent_div.push(
        <MovieSuggestion
          Name={value["Name"]}
          ImgSrc={value["posterIMG"]}
          Genre={value["genre"]}
          Actors={value["Actors"]}
          Release={value["release"]}
          Runtime={value["runtime"]}
          MetaScore={value["metaScore"]}
          IMDBRating={value["imdbRating"]}
          Plot={value["plot"]}
          YTSrc={value["yID"]}
          col={col_num}
        />
      );
    }
    return <div className="row">{movie_parent_div}</div>;
  }

  function fetchSearchSuggestions() {
    let sugButtons = [];
    let { items } = receivedData;
    if (items[2].Response === "False") {
      suggestionList = 0;
      return null;
    }
    if (items[2] !== undefined) {
      suggestionList = 1;
      for (let a in items[2]["Search"]) {
        sugButtons.push(
          <button
            type="button"
            className="suggestion__buttons"
            value={items[2]["Search"][a]}
            onClick={(e) => {
              document.getElementById("userInput").value = e.target.value;
              props.onChange(e.target.value);
              setSuggestionFilter({
                trackResults: true,
                movieResults: true,
                buttonState: 0,
              });
            }}
          >
            {items[2]["Search"][a]}
          </button>
        );
      }
    }
    return sugButtons;
  }

  if (props.searchText === "") {
    return (
      <div className="text-center">
        <p className="intro-color">I'll make you an offer you can't refuse</p>
        <p className="">
          You start typing on the field above, I'll ask friends for movies, and
          will look in pubs for music
        </p>
        <p className="intro-color">Deal?</p>
      </div>
    );
  }

  let { isLoaded } = receivedData;
  let { movieResults, trackResults, buttonState } = filterSuggestion;

  if (!isLoaded) {
    return (
      <div className="text-center">
        <p>
          Loading the skeletons from servers, asking friends for movies ,
          looking in pubs for songs
        </p>
        <div className="m-3">
          <Loader
            type="Oval"
            color="#c4a27e"
            height={50}
            width={50}
            timeout={10000} //10 secs
          />
        </div>
      </div>
    );
  } else {
    const movies = renderMovieList();
    const tracks = renderTracksList();
    const searchSuggestions = fetchSearchSuggestions();
    return (
      <div className="container">
        <div className="text-center">
          <p>Based on your search, you might enjoy these</p>
          <div className="filter-buttons mb-3">
            <button
              type="button"
              onClick={() => {
                setSuggestionFilter({
                  movieResults: true,
                  trackResults: true,
                  buttonState: 0,
                });
              }}
              className={buttonState === 0 ? "button__active" : null}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                setSuggestionFilter({
                  movieResults: false,
                  trackResults: true,
                  buttonState: 1,
                });
              }}
              className={buttonState === 1 ? "button__active" : null}
            >
              Tracks
            </button>
            <button
              type="button"
              onClick={() => {
                setSuggestionFilter({
                  movieResults: true,
                  trackResults: false,
                  buttonState: 2,
                });
              }}
              className={buttonState === 2 ? "button__active" : null}
            >
              Movies
            </button>
          </div>
        </div>
        <div className="row results">
          {trackResults && trackList === 1 ? (
            <div className="col-lg track-rec">
              {<div className="container">{tracks}</div>}
            </div>
          ) : (
            [
              trackResults && trackList === 0 ? (
                <div className="container text-center mb-1">
                  <p>I could not find any tracks for that search</p>
                </div>
              ) : null,
            ]
          )}
          {movieResults && movieList === 1 ? (
            <div className="col-lg movie-rec">
              {<div className="container">{movies}</div>}
            </div>
          ) : (
            [
              movieResults && movieList === 0 ? (
                <div className="container text-center mb-1">
                  {serviceDown == true ? (
                    <p>
                      Movie suggestion service is down, please try again later
                    </p>
                  ) : (
                    <p>Could not find any movies for that search</p>
                  )}
                  <p></p>
                </div>
              ) : null,
            ]
          )}
          {suggestionList === 1 ? (
            <div className="container text-center mt-5 mb-5">
              <p>
                Would you like to search again with any of the following titles?
              </p>
              {searchSuggestions}
            </div>
          ) : (
            <div className="container text-center mt-5 mb-5">
              <p>Would you like to search again with some other title?</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Suggestions;
