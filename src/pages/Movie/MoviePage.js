import React, { useState } from "react";
import "./MoviePage.css";
import MovieImage from "./MovieImage";
import Loader from "../../components/Loader/Loader";

const MoviePage = () => {
  // calls movie api for handleMovies
  const [movies, setMovies] = useState([]);
  // for loading animation
  const [loading, setLoading] = useState(false);
  // api calls for more info
  const [characterDetails, setCharacterDetails] = useState({});
  const [starshipDetails, setStarshipDetails] = useState({});
  const [planetDetails, setPlanetDetails] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [speciesDetails, setSpeciesDetails] = useState({});

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFetch, setIsFetch] = useState(true);
  // tracks the button click
  const [characterButtonClickedMap, setCharacterButtonClickedMap] = useState({});
  const [starshipButtonClickedMap, setStarshipButtonClickedMap] = useState({});
  const [planetButtonClickedMap, setPlanetButtonClickedMap] = useState({});
  const [vehicleButtonClickedMap, setVehicleButtonClickedMap] = useState({});
  const [speciesButtonClickedMap, setSpeciesButtonClickedMap] = useState({});
  // display for the button information
  const [charDisplay, setCharDisplay] = useState(false);
  const [starDisplay, setStarDisplay] = useState(false);
  const [planetDisplay, setPlanetDisplay] = useState(false);
  const [vehiclesDisplay, setVehiclesDisplay] = useState(false);
  const [speciesDisplay, setSpeciesDisplay] = useState(false);

  const handleMovies = async () => {

    try {
      setIsFetch(false);
      setLoading(true);

      const response = await fetch("http://swapi.py4e.com/api/films/");
      const data = await response.json();

      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // fetch details for each button
  const fetchPlanetDetails = async (movie) => {

    try{
        setPlanetButtonClickedMap({...planetButtonClickedMap, [movie.url]: true});
        setLoading(true);
        const planetPromises = movie.planets.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        });

        const planets = await Promise.all(planetPromises);

        const planetDetailsMap = {};
        planets.forEach((planet) => {
          planetDetailsMap[planet.url] = planet;
        });

        setPlanetButtonClickedMap({...planetButtonClickedMap, [movie.url]: false});
        setLoading(false);

        setPlanetDetails({
            ...planetDetails,
            [movie.url]: planetDetailsMap,
        });

    }catch(error){console.error("Error fetching planet details:", error);}
  };

  const fetchCharacterDetails = async (movie) => {

    try {
      setCharacterButtonClickedMap({ ...characterButtonClickedMap, [movie.url]: true });
      setLoading(true);
      const characterPromises = movie.characters.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });

      const characters = await Promise.all(characterPromises);

      const characterDetailsMap = {};
      characters.forEach((character) => {
        characterDetailsMap[character.url] = character;
      });

      setCharacterButtonClickedMap({ ...characterButtonClickedMap, [movie.url]: false });
      setLoading(false);

      setCharacterDetails({
        ...characterDetails,
        [movie.url]: characterDetailsMap,
      });
    } catch (error) {
      console.error("Error fetching character details:", error);
    }
  };

  const fetchStarshipDetails = async (movie) => {

    try {
      setStarshipButtonClickedMap({ ...starshipButtonClickedMap, [movie.url]: true });
      setLoading(true);
      const starshipPromises = movie.starships.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });

      const starships = await Promise.all(starshipPromises);

      const starshipDetailsMap = {};
      starships.forEach((starship) => {
        starshipDetailsMap[starship.url] = starship;
      });

      setStarshipButtonClickedMap({ ...starshipButtonClickedMap, [movie.url]: false });
      setLoading(false);

      setStarshipDetails({
        ...starshipDetails,
        [movie.url]: starshipDetailsMap,
      });
    } catch (error) {
      console.error("Error fetching starship details:", error);
    }
  };

  const fetchVehicleDetails = async (movie) => {

    try {
        setVehicleButtonClickedMap({ ...vehicleButtonClickedMap, [movie.url]: true });
        setLoading(true); 
        const vehiclePromises = movie.vehicles.map(async (url) => {
            const response = await fetch(url);
            return response.json();
          });

          const vehicles = await Promise.all(vehiclePromises);

          const vehicleDetailsMap = {};
          vehicles.forEach((vehicle) => {
            vehicleDetailsMap[vehicle.url] = vehicle;
          });

          setVehicleButtonClickedMap({ ...vehicleButtonClickedMap, [movie.url]: false });
          setLoading(false);
    
          setVehicleDetails({
            ...vehicleDetails,
            [movie.url]: vehicleDetailsMap,
          });

    }catch (error) {
        console.error("Error fetching vehicles:", error);
    }
  };

  const fetchSpeciesDetails = async (movie) => {

    try {
        setSpeciesButtonClickedMap({ ...speciesButtonClickedMap, [movie.url]: true });
        setLoading(true); 
        const speciesPromises = movie.species.map(async (url) => {
            const response = await fetch(url);
            return response.json();
          });

          const species = await Promise.all(speciesPromises);

          const speciesDetailsMap = {};
          species.forEach((species) => {
            speciesDetailsMap[species.url] = species;
          });

          setSpeciesButtonClickedMap({ ...speciesButtonClickedMap, [movie.url]: false });
          setLoading(false);
    
          setSpeciesDetails({
            ...speciesDetails,
            [movie.url]: speciesDetailsMap,
          });

    }catch (error) {
        console.error("Error fetching species:", error);
    }
  };

  // button Click handlers
  const handleCharacterButtonClick = async (movie) => {
    if (!characterDetails[movie.url]) {
      await fetchCharacterDetails(movie);
    }
    setCharDisplay(true);
    setStarDisplay(false);
    setPlanetDisplay(false);
    setSpeciesDisplay(false);
    setVehiclesDisplay(false);

    setSelectedMovie(movie);
  };

  const handleStarshipButtonClick = async (movie) => {
    if (!starshipDetails[movie.url]) {
      await fetchStarshipDetails(movie);
    }
    setStarDisplay(true);
    setCharDisplay(false);
    setPlanetDisplay(false);
    setSpeciesDisplay(false);
    setVehiclesDisplay(false);

    setSelectedMovie(movie);
  };

  const handlePlanetButtonClick = async (movie) => {
    if(!planetDetails[movie.url]) {
        await fetchPlanetDetails(movie);
    }
    setPlanetDisplay(true);
    setCharDisplay(false);
    setStarDisplay(false);
    setVehiclesDisplay(false);
    setSpeciesDisplay(false);

    setSelectedMovie(movie);
  };

  const handleVehicleButtonClick = async (movie) => {
    if(!vehicleDetails[movie.url]) {
        await fetchVehicleDetails(movie);
    }
    setVehiclesDisplay(true);
    setCharDisplay(false);
    setStarDisplay(false);
    setPlanetDisplay(false);
    setSpeciesDisplay(false);

    setSelectedMovie(movie);
  };

  const handleSpeciesButtonClick = async (movie) => {
    if(!speciesDetails[movie.url]) {
        await fetchSpeciesDetails(movie);
    }
    setSpeciesDisplay(true);
    setCharDisplay(false);
    setVehiclesDisplay(false);
    setPlanetDisplay(false);
    setStarDisplay(false);

    setSelectedMovie(movie);
  };

  return (
    <div className="moviepage-container">
      {isFetch && <button className="film-button" onClick={handleMovies}>Films of the Force</button>}
      {loading && (
        <div className="loading-bar">
          <Loader />
        </div>
      )}

      <div className="movies-container">
        {movies.map((result) => {
          const movieInfo = MovieImage.find(
            (movie) => movie.title === result.title
          );

          return (
            <div className="movie-items" key={result.title}>
              <h4>Star Wars</h4>
              <h4>
                {result.title} Episode {result.episode_id}
              </h4>
              <div>Release Date: {result.release_date}</div>
              <div>Director: {result.director}</div>
              <div>Producer: {result.producer}</div>
              <img
                src={movieInfo ? movieInfo.movieImageSrc : ""}
                alt={result.title}
              />
              <p>{result.opening_crawl}</p>

                {/*Buttons*/}
              <div className='movie-buttons'>

                {!characterButtonClickedMap[result.url] && (
                  <button onClick={() => handleCharacterButtonClick(result)}>Heroes and Villains</button>
                )}
                
                {!starshipButtonClickedMap[result.url] && (
                  <button onClick={() => handleStarshipButtonClick(result)}>Starships</button>
                )}

                {!planetButtonClickedMap[result.url] && (
                  <button onClick={() => handlePlanetButtonClick(result)}>Planets</button>
                )}

                {!vehicleButtonClickedMap[result.url] && (
                  <button onClick={() => handleVehicleButtonClick(result)}>Vehicles</button>
                )}

                {!speciesButtonClickedMap[result.url] && (
                  <button onClick={() => handleSpeciesButtonClick(result)}>Species</button>
                )}
              </div>

              {/* display for details of each button*/}
              {selectedMovie && selectedMovie.url === result.url && (

                <div className="button-details">

                {charDisplay &&(
                <div>
                  <h3 style={{marginBottom:'3px'}}>Characters:</h3>
                  {characterDetails[result.url] && (
                    <div style={{display:'flex', flexDirection:'column'}}>
                      {result.characters.map((characterURL) => (
                        <p style={{marginBottom:'0px'}}
                          key={characterDetails[result.url][characterURL]?.name}
                        >
                          {characterDetails[result.url][characterURL]?.name},
                        </p>
                      ))}
                    </div>
                  )}
                  </div>
                  )}
                
                
                  {starDisplay && (
                    <div>
                  <h3>Starships:</h3>
                  {starshipDetails[result.url] && (
                    <div style={{flexDirection:'column', display: 'flex'}}>
                      {result.starships.map((starshipURL) => (
                        <p style={{marginRight: '3px'}}
                          key={starshipDetails[result.url][starshipURL]?.name}
                        >
                          {starshipDetails[result.url][starshipURL]?.name},
                        </p>
                      ))}
                    </div>
                    )}
                  </div>
                  )}
                  
                  {planetDisplay && (
                    <div>
                  <h3>Planets:</h3>
                  {planetDetails[result.url] && (
                    <div style={{flexDirection:'column',display:'flex'}}>
                        {result.planets.map((planetURL) =>(
                            <p key={planetDetails[result.url][planetURL]?.name}>
                                {planetDetails[result.url][planetURL]?.name}
                            </p>
                        ))}
                        </div>)}
                    </div>)}

                   {vehiclesDisplay && (
                    <div>          
                    <h3>Vehicles:</h3>
                  {vehicleDetails[result.url] && (
                    <div style={{flexDirection:'column',display:'flex'}}>
                        {result.vehicles.map((vehicleURL) =>(
                            <p key={vehicleDetails[result.url][vehicleURL]?.name}>
                                {vehicleDetails[result.url][vehicleURL]?.name}
                            </p>
                        ))}
                        </div>)}
                    </div>)}

                    {speciesDisplay && (
                      <div>
                    <h3>Species:</h3>
                  {speciesDetails[result.url] && (
                    <div style={{flexDirection:'column',display:'flex'}}>
                        {result.species.map((speciesURL) =>(
                            <p key={speciesDetails[result.url][speciesURL]?.name}>
                                {speciesDetails[result.url][speciesURL]?.name}
                            </p>
                        ))}
                        </div>)}
                    </div>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoviePage;
