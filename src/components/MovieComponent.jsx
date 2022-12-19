import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 348px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 302px;
  width: 282px; 
`;
const MovieName = styled.span`
font-size: 16px;
font-weight: 400;
color: black;
font-family: "Inter";
margin: 10px 0;
text-align: center;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;
const MovieComponent = (props) => {
  const { original_title, id, poster_path, vote_average } = props.movie;
  let imgUrl = `https://image.tmdb.org/t/p/original/${poster_path}`

  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(id);
      }}
    >
      <CoverImage src={imgUrl} alt="Poster Unavailable" />
      <span style={{backgroundColor: "white", borderRadius:"60%", color:"black", fontSize:"12px", position:"absolute", margin:"12px", padding:"5px", fontFamily:"Inter", border:"1px solid black", zIndex:"10"}}>{vote_average}</span>
      <MovieName>{original_title}</MovieName>
    </MovieContainer>
  );
};
export default MovieComponent;