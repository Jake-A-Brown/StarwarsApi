import React from "react";
import "./Home.css";
import starWarsLogo from "./Star_Wars_Logo.svg.png";
import SearchResults from "../../components/SearchBar/searchresults";

const Home = () => {

  return (
    <div className="homepage-container">
      <img className="star-wars-logo" src={starWarsLogo} alt="Star Wars Logo" />
        <SearchResults />
    </div>
  );
};

export default Home;
