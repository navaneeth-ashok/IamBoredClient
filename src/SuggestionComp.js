import { useState } from "react";

function MovieSuggestion(props) {
  const [expanded, expandCard] = useState("");

  return (
    <div className={`${props.col} mb-3 card__master`}>
      <div className="movie parent card__custom row">
        <h2 className="movie mt-1 mb-1 Name">{props.Name}</h2>
        <div className="movie__preview col-sm-12 text-center">
          <img
            className="movie mt-1 mb-1 posterIMG"
            src={props.ImgSrc}
            alt={`Movie poster of ${props.Name}`}
          />
        </div>
        <div className="movie__details col-sm-12">
          <div className="movie mt-1 mb-1 genre">{props.Genre}</div>
          <div className="movie mt-1 mb-1 Actors">{props.Actors}</div>
          <div className="movie mt-1 mb-1 row">
            <div className="movie mt-1 mb-1 col release">{props.Release}</div>
            <div className="movie mt-1 mb-1 col runtime">{props.Runtime}</div>
          </div>
          <div className="movie mt-1 mb-1 row">
            <div className="movie mt-1 mb-1 col metaScore">
              {props.MetaScore}
            </div>
            <div className="movie mt-1 mb-1 col imdbRating">
              {props.IMDBRating}
            </div>
          </div>
          <div className="movie mt-1 mb-1 plot">{props.Plot}</div>
          <div>
            <iframe
              width="100%"
              className="mt-1 mb-2"
              src={`https://www.youtube.com/embed/${props.YTSrc}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackSuggestion(props) {
  const [expanded, expandCard] = useState("");

  return (
    <div className={`${props.col} mb-3`}>
      <div className="track parent card__custom row">
        <h2 className="track mt-1 mb-1 name">{props.Name}</h2>
        <img
          className="track mt-1 mb-1 posterIMG"
          src={props.ImgSrc}
          alt={`Album poster of ${props.Name}`}
        />
        <div className="text-center mt-2">
          <a href={props.AlbumLink} className="track mb-1 m-1 album__name">
            {props.AlbumName}
          </a>
        </div>
        <div>
          <iframe
            src={`https://open.spotify.com/embed/track/${props.TrackID}`}
            width="98%"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Audio Player"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export { MovieSuggestion, TrackSuggestion };
