import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import SearchIconSVG from "./assets/search-icon.svg"
import Logo from "./assets/logo.png"
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "c929a86373b4f97935d45e630c132a2a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  margin: 0px 140px;
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid #C0C4CC;
  @media only screen and (max-width: 1100px) {
    margin: 0px 80px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0px 60px;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin: 0px 30px;
  }
`;
const SearchBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 20vw;
  background-color: white;
  border: 1px solid #C0C4CC;
  @media only screen and (max-width: 500px) {
    margin-left: 5px;
    width: 25vw;
  }
`;
const SearchIcon = styled.img`
  width: 1.6vw;
  height: 1.6vw;
  @media only screen and (max-width: 1100px) {
    width: : 2vw;
    height: 2vw;
  }
  @media only screen and (max-width: 700px) {
    width: : 2.3vw;
    height: 2.3vw;
  }
  @media only screen and (max-width: 500px) {
    width: : 4vw;
    height: 4vw;
  }
`;
const SearchInput = styled.input`
  color: black;
  font-size: 1.1vw;
  border: none;
  outline: none;
  margin-left: 15px;

  @media only screen and (max-width: 1100px) {
    margin-left: 12px;
    font-size: 1.3vw;
  }
  @media only screen and (max-width: 900px) {
    margin-left: 10px;
    font-size: 1.5vw;
  }
  @media only screen and (max-width: 700px) {
    margin-left: 5px;
    font-size: 1.7vw;
  }
  @media only screen and (max-width: 700px) {
    margin-left: 5px;
    font-size: 2vw;
  }
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
  margin: 0px 80px;
  @media only screen and (max-width: 1100px) {
    margin: 0px 40px;
  }
`;
const Heading = styled.span`
  font-size: 24px;
  font-weight: bolder;
  font-family: "Inter";
  width: 100vw;
  text-align: left;
  margin-left: 30px;

  @media only screen and (max-width: 1100px) {
    margin-left: 18px;
  }
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
  @media only screen and (max-width: 600px) {
    text-align: center;
    margin-left: 18px;
    font-size: 18px;
  }
`

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [recentMovieList, updateRecent] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`
    );
    // console.log(response.data);
    updateMovieList(response.data.results);
  };

  const fetchRecentMovies = () => {
     Axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    ).then(response => updateRecent(response.data.results))
    // console.log(response.data);
    // updateMovieList(response.data.results);
    return (
      <>
      <Heading>Most Recent Movies</Heading>
      {
        recentMovieList.map((movie, index) => (
          <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>
        )
        )
      }
      </>
      );
  }

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <img src={Logo} alt=""/>
        </AppName>
        <SearchBox>
          <SearchIcon src={SearchIconSVG} />
          <SearchInput
            placeholder="Search for a movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          fetchRecentMovies()
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
