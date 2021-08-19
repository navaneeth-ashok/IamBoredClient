import React, { Component } from "react";
import Loader from "react-loader-spinner";

let previousString = "";
class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
    console.log("####################");
    console.log(props);
    console.log("####################");
  }

  componentDidUpdate() {
    console.log(this.props.searchText);
    if (previousString != this.props.searchText) {
      this.getSuggestions();
    }
  }

  co;

  getSuggestions() {
    console.log("Fetching Suggestions");
    // resetting isLoaded to false
    this.setState({ isLoaded: false });
    console.log(this.props);
    console.log(this.props.searchText);
    let searchString = this.props.searchText;
    previousString = searchString;
    let body = {
      userInput: searchString,
    };
    fetch("http://localhost:5000/fetchSuggestion", {
      method: "POST",
      body: new URLSearchParams({ userInput: body.userInput }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ isLoaded: true, items: json });
      });
    // .then((pqr) => this.renderMovieList());
  }

  renderMovieList() {
    console.log("Rendering Movie List");
    var { isLoaded, items } = this.state;
    var item = items
      .slice(1)
      .map((item) => item.Similar.Results)
      .map((results) => results);
    var p = item[0];

    var movie_parent_div = [];
    for (var a in p) {
      let value = p[a];
      var movie_divs = [];
      var classList = [];
      var movieDate = [];
      var ratings = [];
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
      movie_divs.push(
        <img className={classList.join(" ")} src={movie_item}></img>
      );
      classList.pop();

      movie_item = value["genre"];
      classList.push("genre");
      movie_divs.push(
        <span className={classList.join(" ")}>{movie_item}</span>
      );
      classList.pop();

      movie_item = value["Actors"];
      classList.push("Actors");
      movie_divs.push(
        <span className={classList.join(" ")}>{movie_item}</span>
      );
      classList.pop();

      // bundling release and runtime
      movie_item = value["release"];
      classList.push("col");
      classList.push("release");
      movieDate.push(<span className={classList.join(" ")}>{movie_item}</span>);
      classList.pop();
      movie_item = value["runtime"];
      classList.push("runtime");
      movieDate.push(<span className={classList.join(" ")}>{movie_item}</span>);
      classList.pop();
      classList.pop(); // pop - col
      classList.push("row");
      movie_divs.push(<div className={classList.join(" ")}>{movieDate}</div>);
      classList.pop(); // pop-row

      // bundling ratings
      movie_item = value["metaScore"];
      classList.push("col");
      classList.push("metaScore");
      ratings.push(<span className={classList.join(" ")}>{movie_item}</span>);
      classList.pop();
      movie_item = value["imdbRating"];
      classList.push("imdbRating");
      ratings.push(<span className={classList.join(" ")}>{movie_item}</span>);
      classList.pop();
      classList.pop(); // pop - col
      classList.push("row");
      movie_divs.push(<div className={classList.join(" ")}>{ratings}</div>);
      classList.pop(); // pop-row

      movie_item = value["plot"];
      classList.push("plot");
      movie_divs.push(
        <span className={classList.join(" ")}>{movie_item}</span>
      );
      classList.pop();
      // movie_item = value["yID"];
      // classList.push("yID");
      // let src = [];
      // src.push("https://www.youtube.com/embed/" + movie_item);
      // movie_divs.push(
      //   <iframe
      //     width="100%"
      //     className="mt-1 mb-2"
      //     src={src}
      //     title="YouTube video player"
      //     frameBorder="0"
      //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //     allowFullScreen
      //   ></iframe>
      // );
      // classList.pop();
      console.log(classList);
      // Looped fetching of data
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
        <div className="movie parent card col m-2">{movie_divs}</div>
      );
    }
    return <div className="row">{movie_parent_div}</div>;
  }

  render() {
    var { isLoaded, items } = this.state;
    console.log("calling render");
    // console.log(state);
    if (this.props.searchText === "") {
      return (
        <div className="text-center">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={30}
            width={30}
            timeout={3000} //3 secs
          />
          <p>I'm gonna make him an offer he can't refuse.</p>
          <p>
            Loading the skeletons from servers, asking friends for movies ,
            looking in pubs for songs.
          </p>
        </div>
      );
    }
    const sample = this.renderMovieList();
    if (!isLoaded) {
      return (
        <div className="text-center">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={30}
            width={30}
            timeout={3000} //3 secs
          />
        </div>
      );
    } else {
      return (
        <div className="">
          <div className="results">
            <div className="movieRec">
              {<div className="container">{sample}</div>}
            </div>
            <div className="trackRec">
              {/* {items.slice(0, 1).map((item) => console.log(item))} */}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Suggestions;
