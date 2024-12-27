import React, {useState} from 'react'

import Loader from "../../components/Loader/Loader";
import starWarsLogo from "../../pages/Home/Star_Wars_Logo.svg.png";
import PeopleImage from "../../pages/People/PeopleImage";
import MovieImage from "../../pages/Movie/MovieImage";
import PlanetImage from "../../pages/Planet/PlanetImage";
import SpeciesImage from "../../pages/Species/SpeciesImage";
import StarshipImage from '../../pages/Starships/StarshipImage';
import VehicleImage from '../../pages/Vehicles/VehicleImage';
import SearchBar from './SearchBar';

const SearchResults = () => {
      const [searchResults, setSearchResults] = useState([]);
      const [loading, setLoading] = useState(false);

      const handleSearch = async (input, category) => {
        try {
          setLoading(true);
    
          if (!category) {
            console.error("Please select a category.");
            setLoading(false);
            return;
          }
    
          const response = await fetch(
            `https://swapi.py4e.com/api/${category}/?search=${input}`
          );
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
          setSearchResults(data.results);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

  return (
    <div>SearchResults
        <div className="search-results-container">
                    <SearchBar onSearch={handleSearch} />
            
        {loading && (
          <div className="loading-bar">
            <Loader />
          </div>
        )}

        {searchResults.map((result) => {
          const movieInfo = MovieImage.find(
            (movie) => movie.title === result.title
          );

          return (
            movieInfo && (
              <div className="result-items movie-result-items" key={result.title}>
                <h4>{`Star Wars ${result.title} Episode ${result.episode_id}`}</h4>
                <div>Directed by: {result.director}</div>
                <div>Produced by: {result.producer}</div>
                <a href={movieInfo.movieImageSrc} target="_blank" rel="noopener noreferrer">
                  <img src={movieInfo.movieImageSrc} alt={result.title} />
                </a>
                <div>Release Date: {result.release_date}</div>
                <div>{result.opening_crawl}</div>
              </div>
            )
          );
        })}

        {searchResults.map((result) => {
          const peopleInfo = PeopleImage.find(
            (people) => people.name === result.name
          );

          return (
            peopleInfo && (
              <div className="result-items people-result-items" key={result.name}>
                <h5>{result.name}</h5>
                <a href={peopleInfo.peopleImageSrc} target="_blank" rel="noopener noreferrer">
                  <img src={peopleInfo.peopleImageSrc} alt={result.name} />
                </a>
                <div>{peopleInfo.description}</div>
              </div>
            )
          );
        })}

        {searchResults.map((result) => {
          const planetInfo = PlanetImage.find(
            (planet) => planet.name === result.name
          );

          return (
            planetInfo && (
              <div className="result-items planet-result-items" key={result.name}>
                <div>{result.name}</div>
                <a href={planetInfo.planetImageSrc} target="_blank" rel="noopener noreferrer">
                  <img src={planetInfo.imageSrc} alt={result.name} />
                </a>
                <div>{planetInfo.description}</div>
              </div>
            )
          );
        })}

        {searchResults.map((result) => {
          const speciesInfo = SpeciesImage.find(
            (species) => species.name === result.name
          );

          return (
            speciesInfo && (
              <div className="result-items species-result-items" key={result.name}>
                <div>{result.name}</div>
                <a href={speciesInfo.speciesImgSrc} target="_blank" rel="noopener noreferrer">
                  <img src={speciesInfo.speciesImgSrc} alt={result.name} />
                </a>
                <div>{speciesInfo.description}</div>
                <div>Classification: {result.classification}</div>
                <div>Designation: {result.designation}</div>
                <div>Language: {result.language}</div>
              </div>
            )
          );
        })}

        {searchResults.map((result) => {
          const starshipInfo = StarshipImage.find(
            (starship) => starship.name === result.name
          );

          return (
            starshipInfo && (
              <div className="result-items starship-result-items" key={result.name}>
                <div>{result.name}</div>
                <a href={starshipInfo.starshipImgSrc} target="_blank" rel="noopener noreferrer">
                  <img src={starshipInfo.starshipImgSrc} alt={result.name} />
                </a>
                <div>{starshipInfo.description}</div>
              </div>
            )
          );
        })}

        {searchResults.map((result) => {
          const vehicleInfo = VehicleImage.find(
            (vehicle) => vehicle.name === result.name
          );

          return (
            vehicleInfo && (
              <div className="result-items vehicle-result-items" key={result.name}>
                <div>{result.name}</div>
                <img src={vehicleInfo.vehicleImgSrc} alt={result.name} />
                <div>{vehicleInfo.description}</div>
              </div>
            )
          );
        })}
      </div>
    </div>
  )
}

export default SearchResults;