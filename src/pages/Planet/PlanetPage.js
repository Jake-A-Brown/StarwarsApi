import React, { useCallback, useState } from "react";
import PlanetImage from "./PlanetImage";
import "./Planets.css";
import Loader from "../../components/Loader/Loader";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Adjust this to your preferred date format
};

const PlanetPage = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    `https://swapi.py4e.com/api/planets/`
  );
  const [previousPageUrl, setPreviousPageUrl] = useState(
    `https://swapi.py4e.com/api/planets/`
  );
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const [residentDetails, setResidentDetails] = useState({});
  const [residentButtonClickedMap, setResidentButtonClickedMap] = useState({});
  const [filmDetails, setFilmDetails] = useState({});
  const [filmButtonClickedMap, setFilmButtonClickedMap] = useState({});

  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const [loading, setLoading] = useState(false);

  const [planetDisplay, setPlanetDisplay] = useState(false);
  const [pageDisplay, setPageDisplay] = useState(false);

  const [filmDisplay, setFilmDisplay] = useState({});
  const [characterDisplay, setCharacterDisplay] = useState({});


  const handlePlanets = useCallback(async (url) => {
    try {

      setLoading(true);
      setPageDisplay(false);
      setIsFetch(false);
      setPlanetDisplay(false);
      setNextBtn(false);
      setPrevBtn(false);

      const response = await fetch(url);
      const data = await response.json();

      setNextBtn(!!data.next);
      setPrevBtn(!!data.previous);
      setPlanetDisplay(true);
      setPageDisplay(true);

      setPlanets(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setLoading(false);
    } catch (error) {
      console.error("", error);
    }

  }, []);

  
  // fetch details for each button
  const fetchResidentDetails = async (planet) => {

    try{
        setResidentButtonClickedMap({...residentButtonClickedMap, [planet.url]: true});
        setLoading(true);
        const residentPromises = planet.residents.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        });

        const resident = await Promise.all(residentPromises);

        const residentDetailsMap = {};
        resident.forEach((resident) => {
          residentDetailsMap[resident.url] = resident;
        });

        setResidentButtonClickedMap({...residentButtonClickedMap, [planet.url]: false});
        setLoading(false);

        setResidentDetails({
            ...residentDetailsMap,
            [planet.url]: residentDetailsMap,
        });

    }catch(error){console.error("Error fetching resident details:", error);}
  };

  const fetchFilmDetails = async (planet) => {

    try{
        setFilmButtonClickedMap({...filmButtonClickedMap, [planet.url]: true});
        setLoading(true);
        const filmPromises = planet.films.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        });

        const film = await Promise.all(filmPromises);

        const filmDetailsMap = {};
        film.forEach((film) => {
          filmDetailsMap[film.url] = film;
        });

        setFilmButtonClickedMap({...filmButtonClickedMap, [planet.url]: false});
        setLoading(false);

        setFilmDetails({
            ...filmDetailsMap,
            [planet.url]: filmDetailsMap,
        });

      }catch(error){console.error("Error fetching film details:", error);}
    };

    // button Click handlers
    const handleResidentButtonClick = async (planet) => {
      if (!residentDetails[planet.url]) {
        await fetchResidentDetails(planet);
      }
      setCharacterDisplay(true);
      setFilmDisplay(false);
  
      setSelectedPlanet(planet);
    };

    const handleFilmButtonClick = async (planet) => {
      if (!filmDetails[planet.url]) {
        await fetchFilmDetails(planet);
      }
      setFilmDisplay(true);
      setCharacterDisplay(false);
  
      setSelectedPlanet(planet);
    };

  const nextPageHandler = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage+1);
      handlePlanets(nextPageUrl);
    }
  };

  const backPageHandler = () => {
    if (previousPageUrl) {
      setCurrentPage(currentPage-1);
      handlePlanets(previousPageUrl);
    }
  };

  return (
    <div className="planets-container">

      {loading && <div className="loading-bar"><Loader/> </div>}

      {pageDisplay && (<div>Page {currentPage} </div> )}

      <div>
      {isFetch && (
          <button onClick={nextPageHandler}>Planets of StarWars</button>
        )}
        {prevBtn && (
          <button onClick={backPageHandler} disabled={!previousPageUrl}>
            Back
          </button>
        )}
        {nextBtn && (
          <button onClick={nextPageHandler} disabled={!nextPageUrl}>
            Next
          </button>
        )}

      </div>

      {planetDisplay && (
        <div className="planets-grid">

          {planets.map((result, index) => {

            const planetInfo = PlanetImage.find(
              (planet) => planet.name === result.name
            );

            return (
              <div key={result.name} className="planets-result-container">
                <div className="planets-items">
                  <h2>{result.name}</h2>
                  <img
                    src={planetInfo ? planetInfo.imageSrc : ""}
                    alt={result.name}
                  />

                  <h5>Created: {formatDate(result.created)}</h5>
                  <h5>Edited: {formatDate(result.edited)}</h5>

                  <p className="planet-description"><h5>Description: </h5> {planetInfo.description}</p>
                  {/* <p>Rotation Period: {result.rotation_period}</p>
                  <p>Orbital Period: {result.orbital_period}</p>
                  <p>Diameter: {result.diameter}</p>
                  <p>Climate: {result.climate}</p>
                  <p>Gravity: {result.gravity}</p>
                  <p>Terrain: {result.terrain}</p>
                  <p>Surface Water: {result.surface_water}</p>
                  <p>Population: {result.population}</p> */}
                  {/* <h5>URL: {result.url}</h5> */}
                  
                  {/*Buttons*/}
                  {!residentButtonClickedMap[result.url] && (
                    <button onClick={() => handleResidentButtonClick(result)}>
                      Show Residents
                    </button>
                  )}

                  {!filmButtonClickedMap[result.url] && (
                    <button onClick={() => handleFilmButtonClick(result)}>
                      Show Films
                    </button>
                  )}

                  {/* display for details of each button*/}
                  {selectedPlanet && selectedPlanet.url === result.url && (
                    <div>

                      {characterDisplay && (
                        <div>
                      <h3>Residents:</h3>
                      {residentDetails[result.url] && (
                        <div>
                          {result.residents.map((residentURL) => (
                            <p key={residentDetails[result.url][residentURL]?.name}
                            >
                            {residentDetails[result.url][residentURL]?.name}, <span/>
                            </p>
                          ))}
                        </div>
                      )}
                      </div>
                      )}
                      
                      {filmDisplay && (
                        <div>
                      <h3>Films:</h3>
                      {filmDetails[result.url] && (
                        <div>
                          {result.films.map((filmURL) => (
                            <p key={filmDetails[result.url][filmURL]?.title}
                            >
                            {filmDetails[result.url][filmURL]?.title}, <span/>
                            </p>
                          ))}
                        </div>
                      )}
                      </div>
                      )}

                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

        {pageDisplay && (<div>Page {currentPage} </div> )}

      <div>
        {prevBtn && (
          <button onClick={backPageHandler} disabled={!previousPageUrl}>
            Back
          </button>
        )}
        {nextBtn && (
          <button onClick={nextPageHandler} disabled={!nextPageUrl}>
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default PlanetPage;
