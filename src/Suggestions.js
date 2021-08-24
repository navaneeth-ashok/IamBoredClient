import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "./Suggestions.css";

let previousString = "";
class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
    // console.log(props);
  }

  componentDidUpdate() {
    // console.log(this.props.searchText);
    if (previousString !== this.props.searchText) {
      this.setState({ isLoaded: false });
      this.getSuggestions();
    }
  }

  co;

  getSuggestions() {
    // console.log("Fetching Suggestions");
    // // resetting isLoaded to false
    // console.log(this.props);
    // console.log(this.props.searchText);
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
    // .then((pqr) => this.renderMovieList());
  }

  renderTracksList() {
    // console.log("Rendering Tracks List");
    var { items } = this.state;
    var p = items[0];
    // console.log(items);
    // console.log(items[0]);
    var track_parent_div = [];
    for (var a in p) {
      if (a === "tracks") {
        // console.log(a);
        // console.log(p[a]);
        var trackObj = p[a];
        for (var track in trackObj) {
          var track_divs = [];
          var classList = [];
          var album = trackObj[track];
          // track details are fetched now, just load to divs
          // console.log(album.name);
          classList.push("track");
          classList.push("mb-1 mt-1");

          let track_item = album.name;
          // console.log(track_item);
          classList.push("name");
          track_divs.push(
            <h2 className={classList.join(" ")}>{track_item}</h2>
          );
          classList.pop();

          track_item = album.album.images[0].url;
          classList.push("posterIMG");
          track_divs.push(
            <img
              className={classList.join(" ")}
              src={track_item}
              alt="poster of track"
            ></img>
          );
          classList.pop();

          track_item = album.album.name;
          var item_link = album.album.external_urls.spotify;
          classList.push("album__name");
          track_divs.push(
            <div className="text-center mt-2">
              <a href={item_link} className={classList.join(" ")}>
                {track_item}
              </a>
            </div>
          );
          classList.pop();

          track_item = album.id;
          item_link = album.album.external_urls.spotify;
          classList.push("track__preview");
          let src = [];
          src.push("https://open.spotify.com/embed/track/" + track_item);
          track_divs.push(
            <div>
              <iframe
                src={src}
                width="98%"
                height="80"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          );
          classList.pop();
          track_parent_div.push(
            <div className="col-sm-6 mb-3">
              <div className="track parent card__custom row">{track_divs}</div>
            </div>
          );
        }
      }
    }
    return <div className="row">{track_parent_div}</div>;
  }

  renderMovieList() {
    // console.log("Rendering Movie List");
    var { items } = this.state;
    var item = items
      .slice(1)
      .map((item) => item.Similar.Results)
      .map((results) => results);
    var p = item[0];

    var movie_parent_div = [];

    if (items[1] !== undefined) {
      if (items[1].Similar.Results.length === 0) {
        return "";
      }
    }
    for (var a in p) {
      let value = p[a];
      var movie_divs = [];
      var classList = [];
      var movieDate = [];
      var ratings = [];
      var movie_details = [];
      var movie_preview = [];
      classList.push("movie");
      classList.push("mt-1 mb-1");

      // Commented out automatic fetching of data using loops
      // for manually controlling the sequence

      let movie_item = value["Name"];
      classList.push("Name");
      movie_divs.push(<h2 className={classList.join(" ")}>{movie_item}</h2>);
      classList.pop();

      movie_item = value["posterIMG"];
      classList.push("posterIMG");
      movie_preview.push(
        <img
          className={classList.join(" ")}
          src={movie_item}
          alt="poster of movie"
        ></img>
      );
      classList.pop();
      movie_item = value["genre"];
      classList.push("genre");
      movie_details.push(
        <div className={classList.join(" ")}>{movie_item}</div>
      );
      classList.pop();

      movie_item = value["Actors"];
      classList.push("Actors");
      movie_details.push(
        <div className={classList.join(" ")}>{movie_item}</div>
      );
      classList.pop();

      // bundling release and runtime
      movie_item = value["release"];
      classList.push("col");
      classList.push("release");
      movieDate.push(<div className={classList.join(" ")}>{movie_item}</div>);
      classList.pop();
      movie_item = value["runtime"];
      classList.push("runtime");
      movieDate.push(<div className={classList.join(" ")}>{movie_item}</div>);
      classList.pop();
      classList.pop(); // pop - col
      classList.push("row");
      movie_details.push(
        <div className={classList.join(" ")}>{movieDate}</div>
      );
      classList.pop(); // pop-row

      // bundling ratings
      movie_item = value["metaScore"];
      classList.push("col");
      classList.push("metaScore");
      ratings.push(<div className={classList.join(" ")}>{movie_item}</div>);
      classList.pop();
      movie_item = value["imdbRating"];
      classList.push("imdbRating");
      ratings.push(<div className={classList.join(" ")}>{movie_item}</div>);
      classList.pop();
      classList.pop(); // pop - col
      classList.push("row");
      movie_details.push(<div className={classList.join(" ")}>{ratings}</div>);
      classList.pop(); // pop-row

      movie_item = value["plot"];
      classList.push("plot");
      movie_details.push(
        <div className={classList.join(" ")}>{movie_item}</div>
      );
      classList.pop();
      movie_item = value["yID"];
      classList.push("yID");
      let src = [];
      src.push("https://www.youtube.com/embed/" + movie_item);
      movie_details.push(
        <div>
          <iframe
            width="100%"
            className="mt-1 mb-2"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
      classList.pop();
      // console.log(classList);
      movie_divs.push(
        <div className="movie__preview col-sm-12">{movie_preview}</div>
      );
      movie_divs.push(
        <div className="movie__details col-sm-12">{movie_details}</div>
      );
      // Looped fetching of data
      // Removed for manual control over the detail sequence
      //   for (var b in value) {
      //     var classList = [];
      //     classList.push("movie");
      //     let value_inside = value[b];
      //     console.log(b, value_inside);
      //     classList.push(b);
      //     if (b == "posterIMG") {
      //       movie_divs.push(
      //         <img className={classList.join(" ")} src={value_inside}></img>
      //       );
      //     } else {
      //       movie_divs.push(
      //         <span className={classList.join(" ")}>{value_inside}</span>
      //       );
      //     }

      //     console.log(classList);
      //   }
      movie_parent_div.push(
        <div className="col-sm-6 mb-3 card__master">
          <div className="movie parent card__custom row">{movie_divs}</div>
        </div>
      );
    }

    return (
      <div className="col-lg movieRec">
        {
          <div className="container">
            <div className="row">{movie_parent_div}</div>
          </div>
        }
      </div>
    );
  }

  render() {
    var { isLoaded } = this.state;
    // console.log("calling render");
    if (this.props.searchText === "") {
      return (
        <div className="text-center">
          <p>
            It looks crazy empty here, why don't you start filling it by
            searching for something?
          </p>
          <p className="introColor">I'll make you an offer you can't refuse.</p>
          <p className="">
            You start typing on the field above, I'll ask friends for movies,
            and will look in pubs for music.
          </p>
          <p className="introColor">Deal?</p>
        </div>
      );
    }
    const movies = this.renderMovieList();
    const tracks = this.renderTracksList();
    if (!isLoaded) {
      return (
        <div className="text-center">
          <p>
            Loading the skeletons from servers, asking friends for movies ,
            looking in pubs for songs.
          </p>
          <div className="m-3">
            <Loader
              type="Oval"
              color="#c4a27e"
              height={50}
              width={50}
              timeout={5000} //5 secs
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row results">
            {movies}
            <div className="col-lg trackRec">
              {<div className="container">{tracks}</div>}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Suggestions;
