import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "./Suggestions.css";
import { MovieSuggestion, TrackSuggestion } from "./SuggestionComp";

let previousString = "";
class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      isActive: false,
      movieResults: true,
      trackResults: true,
      buttonState: 0,
    };
  }

  componentDidUpdate() {
    if (previousString !== this.props.searchText) {
      this.setState({ isLoaded: false });
      this.getSuggestions();
    }
  }

  getSuggestions() {
    let searchString = this.props.searchText;
    previousString = searchString;
    let body = {
      userInput: searchString,
    };
    fetch("https://iam-bored-server.herokuapp.com/fetchSuggestion", {
      method: "POST",
      body: new URLSearchParams({ userInput: body.userInput }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ isLoaded: true, items: json });
      });
  }

  renderTracksList() {
    var { items } = this.state;
    var p = items[0];
    var track_parent_div = [];
    for (var a in p) {
      if (a === "tracks") {
        var trackObj = p[a];
        for (var track in trackObj) {
          var album = trackObj[track];
          let col_num = "col-sm-6";
          if (items[1] !== undefined) {
            if (
              items[1].Similar.Results.length === 0 ||
              JSON.stringify(items[1]).includes(
                "Rate limit exceeded, try again later"
              ) ||
              this.state.movieResults === false
            ) {
              this.state.movieResults = false;
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

  renderMovieList() {
    var { items } = this.state;

    if (items[1] !== undefined) {
      if (items[1].Similar.Results.length === 0) {
        return "";
      }
      if (
        JSON.stringify(items[1]).includes(
          "Rate limit exceeded, try again later"
        )
      ) {
        return "";
      }
    }

    var item = items
      .slice(1, 2)
      .map((item) => item.Similar.Results)
      .map((results) => results);
    var p = item[0];
    var movie_parent_div = [];
    let col_num = "col-sm-6";
    if (items[0] !== undefined) {
      if (this.state.trackResults === false) {
        col_num = "col-sm-4";
      }
    }
    for (var a in p) {
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
          IMDBRating={value["runtime"]}
          Plot={value["plot"]}
          YTSrc={value["yID"]}
          col={col_num}
        />
      );
    }
    return <div className="row">{movie_parent_div}</div>;
  }

  fetchSearchSuggestions() {
    var { items } = this.state;
    let sugButtons = [];
    if (items[2] !== undefined) {
      for (var a in items[2]["Search"]) {
        console.log(items[2]["Search"][a]);
        sugButtons.push(
          <button
            type="button"
            className="suggestion__buttons"
            value={items[2]["Search"][a]}
            onClick={(e) => {
              document.getElementById("userInput").value = e.target.value;
              this.props.onChange(e.target.value);
              this.setState({ trackResults: true });
              this.setState({ movieResults: true });
              this.setState({ buttonState: 0 });
            }}
          >
            {items[2]["Search"][a]}
          </button>
        );
      }
    }
    return sugButtons;
  }

  render() {
    var { isLoaded } = this.state;
    if (this.props.searchText === "") {
      return (
        <div className="text-center">
          <p className="intro-color">I'll make you an offer you can't refuse</p>
          <p className="">
            You start typing on the field above, I'll ask friends for movies,
            and will look in pubs for music
          </p>
          <p className="intro-color">Deal?</p>
        </div>
      );
    }
    const movies = this.renderMovieList();
    const tracks = this.renderTracksList();
    const searchSuggestions = this.fetchSearchSuggestions();
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
      return (
        <div className="container">
          <div className="text-center">
            <p>Based on your search, you might enjoy these</p>
            <div className="filter-buttons mb-3">
              <button
                type="button"
                onClick={() => {
                  this.setState({ trackResults: true });
                  this.setState({ movieResults: true });
                  this.setState({ buttonState: 0 });
                }}
                className={
                  this.state.buttonState == 0 ? "button__active" : null
                }
              >
                All
              </button>
              <button
                type="button"
                onClick={() => {
                  this.setState({ trackResults: true });
                  this.setState({ movieResults: false });
                  this.setState({ buttonState: 1 });
                }}
                className={
                  this.state.buttonState == 1 ? "button__active" : null
                }
              >
                Tracks
              </button>
              <button
                type="button"
                onClick={() => {
                  this.setState({ trackResults: false });
                  this.setState({ movieResults: true });
                  this.setState({ buttonState: 2 });
                }}
                className={
                  this.state.buttonState == 2 ? "button__active" : null
                }
              >
                Movies
              </button>
            </div>
          </div>
          <div className="row results">
            {this.state.trackResults ? (
              <div className="col-lg track-rec">
                {<div className="container">{tracks}</div>}
              </div>
            ) : null}
            {this.state.movieResults ? (
              <div className="col-lg movie-rec">
                {<div className="container">{movies}</div>}
              </div>
            ) : (
              <div className="container text-center mb-5">
                <p>I could not find any movies for that search</p>
                <p>
                  Would you like to search again with any of the following
                  titles?
                </p>
                {searchSuggestions}
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Suggestions;
