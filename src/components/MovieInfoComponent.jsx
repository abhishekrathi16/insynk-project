import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import "../styles/movieInfoComp.css"
import FadedScreen from "./FadedScreen";

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(
    `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${API_KEY}&language=en-US`
    ).then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  let imgUrl = `https://image.tmdb.org/t/p/original/${movieInfo?.poster_path}`
  return (
    <>
    <FadedScreen/>
    <div className="container">
      {movieInfo ? (
        <>
          <div className="column">
          <span className="movieName">
              {movieInfo?.original_title}
          </span>
          
          <div className="row">
          <div className="coverImg">
          <img src={imgUrl} alt={movieInfo?.Title} className="img"/>
          </div>
          <div className="column">
            <div className="movieInfo">
                <span style={{fontWeight: "bold"}}>Release Date:</span><span> {movieInfo?.release_date}</span>
            </div>
            <br/>
            <div className="movieInfo">
                <span>{movieInfo?.overview}</span>
            </div>
            <br/>
            <div className="movieInfo">
                <span style={{fontWeight: "bold"}}>{movieInfo?.vote_average}</span><span>/10({movieInfo?.vote_count} total votes)</span>
            </div>
          </div>
          </div>
          </div>
          <span className="close" onClick={() => props.onMovieSelect()}>×</span>
        </>
      ) : (
        "Loading..."
      )}
    </div>
    </>
  );
};
export default MovieInfoComponent;