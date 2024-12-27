import React, { useCallback, useState } from "react";
import PeopleImage from "./PeopleImage";

import "./PeoplePage.css";
import Loader from "../../components/Loader/Loader";

/** formatting time */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Adjust this to your preferred date format
};

const PeoplePage = () => {
  // pagination
  const [currentPage, setCurrentPage] = useState(null);
  // for homeworld
  const [people, setPeople] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    `https://swapi.py4e.com/api/people/?page=`
  );
  const [previousPageUrl, setPreviousPageUrl] = useState(
    `https://swapi.py4e.com/api/people/?page=`
  );
  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  // api call for initial fetch
  const [isFetch, setIsFetch] = useState(true);
  // loading state
  const [loading, setLoading] = useState(false);
  // display UX
  const [peopleDisplay, setPeopleDisplay] = useState(false);
  const [pageDisplay, setPageDisplay] = useState(false);
  // select person for each button 
  const [selectedPerson, setSelectedPerson] = useState(null);

  // buttons and details for each button
  const [filmDetails, setFilmDetails] = useState({});
  const [filmButtonClickedMap, setFilmButtonClickedMap] = useState({});
  const [speciesDetails, setSpeciesDetails] = useState({});
  const [speciesButtonClickedMap, setSpeciesButtonClickedMap] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [vehicleButtonClickedMap, setVehicleButtonClickedMap] = useState({});
  const [starshipDetails, setStarshipDetails] = useState({});
  const [starshipButtonClickedMap, setStarshipButtonClickedMap] = useState({});

  //display for each button
  const [filmDisplay, setFilmDisplay] = useState({});
  const [speciesDisplay, setSpeciesDisplay] = useState({});
  const [starshipDisplay, setStarshipDisplay] = useState({});
  const [vehicleDisplay, setVehicleDisplay] = useState({});

  /** api calls and GUI experience */
  const handlePeople = useCallback(async (url) => {
    try {
      setLoading(true);
      setIsFetch(false);
      setPeopleDisplay(false);
      setPageDisplay(false);
      setNextBtn(false);
      setPrevBtn(false);

      const response = await fetch(url);
      const data = await response.json();

      const peopleWithHomeworld = await Promise.all(
        data.results.map(async (person) => {
          const homeworldName = await fetchHomeworld(person.homeworld);

          return { ...person, homeworldName };
        })
      );

      setPeople(peopleWithHomeworld);

      setNextBtn(!!data.next);
      setPrevBtn(!!data.previous);
      setPeopleDisplay(true);
      setPageDisplay(true);

      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  }, []);

  /** fetching home world info for characters */
  const fetchHomeworld = async (homeworldUrl) => {
    try {
      const response = await fetch(homeworldUrl);
      const homeworldData = await response.json();
      return homeworldData.name;
    } catch (error) {
      console.error("Error fetching homeworld:", error);
      return "Unknown";
    }
  };

  // fetch details for each button
  const fetchFilmDetails = async (people) => {
    try {
      setLoading(true);
      setFilmButtonClickedMap({ ...filmButtonClickedMap, [people.url]: true });
      const filmPromises = people.films.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });

      const films = await Promise.all(filmPromises);

      const filmDetailsMap = {};
      films.forEach((film) => {
        filmDetailsMap[film.url] = film;
      });

      setFilmDetails({
        ...filmDetailsMap,
        [people.url]: filmDetailsMap,
      });

      setFilmButtonClickedMap({ ...filmButtonClickedMap, [people.url]: false });
      setLoading(false);


    } catch (error) {
      console.error("Error fetching film details:", error);
    }
  };

  const fetchSpeciesDetails = async (people) => {
    try {
      setLoading(true);
      setSpeciesButtonClickedMap({ ...speciesButtonClickedMap, [people.url]: true });
      const speciesPromises = people.species.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });

      const species = await Promise.all(speciesPromises);

      const speciesDetailsMap = {};
      species.forEach((species) => {
        speciesDetailsMap[species.url] = species;
      });

      setSpeciesDetails({
        ...speciesDetailsMap,
        [people.url]: speciesDetailsMap,
      });

      setSpeciesButtonClickedMap({ ...speciesButtonClickedMap, [people.url]: false });
      setLoading(false);


    } catch (error) {
      console.error("Error fetching species details:", error);
    }
  };

  const fetchVehicleDetails = async (people) => {
    try {
      setLoading(true);
      setVehicleButtonClickedMap({ ...vehicleButtonClickedMap, [people.url]: true });
      const vehiclesPromises = people.vehicles.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });

      const vehicle = await Promise.all(vehiclesPromises);

      const vehiclesDetailsMap = {};
      vehicle.forEach((vehicles) => {
        vehiclesDetailsMap[vehicles.url] = vehicles;
      });

      setVehicleDetails({
        ...vehiclesDetailsMap,
        [people.url]: vehiclesDetailsMap,
      });

      setVehicleButtonClickedMap({ ...vehicleButtonClickedMap, [people.url]: false });
      setLoading(false);

    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  const fetchStarshipsDetails = async (people) => {
    try {
      setLoading(true);
      setStarshipButtonClickedMap({ ...starshipButtonClickedMap, [people.url]: true });
      const starshipPromises = people.starships.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });

      const starship = await Promise.all(starshipPromises);

      const starshipDetailsMap = {};
      starship.forEach((starship) => {
        starshipDetailsMap[starship.url] = starship;
      });

      setStarshipDetails({
        ...starshipDetailsMap,
        [people.url]: starshipDetailsMap,
      });

      setStarshipButtonClickedMap({ ...starshipButtonClickedMap, [people.url]: false });
      setLoading(false);

    } catch (error) {
      console.error("Error fetching starship details:", error);
    }
  };

  //pagination 
  const nextPageHandler = () => {
    if (nextPageUrl) {
      handlePeople(nextPageUrl);
      setCurrentPage(currentPage + 1);
    }
  };

  const backPageHandler = () => {
    if (previousPageUrl) {
      handlePeople(previousPageUrl);
      setCurrentPage(currentPage - 1);
    }
  };

  

  // button Click handlers
  const handleFilmButtonClick = async (people) => {
    if (!filmDetails[people.url]) {
      await fetchFilmDetails(people);
    }
    setFilmDisplay(true);
    setStarshipDisplay(false);
    setVehicleDisplay(false);
    setSpeciesDisplay(false);


    setSelectedPerson(people);
  };

  const handleSpeciesButtonClick = async (people) => {
    if (!speciesDetails[people.url]) {
      await fetchSpeciesDetails(people);
    }
    setSpeciesDisplay(true);
    setFilmDisplay(false);
    setStarshipDisplay(false);
    setVehicleDisplay(false);

    setSelectedPerson(people);
  };

  const handleVehicleButtonClick = async (people) => {
    if (!vehicleDetails[people.url]) {
      await fetchVehicleDetails(people);
    }
    setVehicleDisplay(true);
    setFilmDisplay(false);
    setStarshipDisplay(false);
    setSpeciesDisplay(false);

    setSelectedPerson(people);
  };

  const handleStarshipButtonClick = async (people) => {
    if (!starshipDetails[people.url]) {
      await fetchStarshipsDetails(people);
    }
    setStarshipDisplay(true);
    setFilmDisplay(false);
    setVehicleDisplay(false);
    setSpeciesDisplay(false);

    setSelectedPerson(people);
  };



  /** all the rendering */
  return (
    <div className="people-container">
      {/** loading bar */}
      {loading && (
        <div className="loading-bar">
          {" "}
          <Loader />
        </div>
      )}

      {/** current page */}
      {pageDisplay && <div>Page {currentPage} </div>}

      {/** button to fetch */}
      {isFetch && (
        <button onClick={nextPageHandler}>Figures of the Force</button>
      )}
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

      {peopleDisplay && (
        <div className="people-grid">
          {people.map((result) => {
            const peopleInfo = PeopleImage.find(
              (people) => people.name === result.name
            );

            return (
              <div key={result.name} className="people-result-container">

                <div className="people-items">
                  <h2>{result.name}</h2>
                  
                  <h5>Created: {formatDate(result.created)}</h5>
                  <h5>Edited: {formatDate(result.edited)}</h5>
                  
                  <a
                    href={peopleInfo.peopleImageSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={peopleInfo ? peopleInfo.peopleImageSrc : ""}
                      alt={result.name}
                    />   
               
                  </a>     
                  <div>
                    HomeWorld:  {`\u0020`} {result.homeworldName}
                  </div>

                  <p className="people-description">{peopleInfo.description}</p>
                  {/* <p>Height: {result.height}</p>
                  <p>Weight: {result.mass}</p>
                  <p>Hair Color: {result.hair_color}</p>
                  <p>Eye Color: {result.eye_color}</p>
                  <p>Birth Year: {result.birth_year}</p>
                  <p>Gender: {result.gender}</p> */}
                  {/* URL: <a href={result.url}>{result.url}</a> */}

                  {/*Buttons*/}
                  <div>
                  {!filmButtonClickedMap[result.url] && (
                    <button onClick={() => handleFilmButtonClick(result)}>
                      Show Films
                    </button>
                  )}

                  {!speciesButtonClickedMap[result.url] && (
                    <button onClick={() => handleSpeciesButtonClick(result)}>
                      Show Species
                    </button>
                  )}

                  {!vehicleButtonClickedMap[result.url] && (
                    <button onClick={() => handleVehicleButtonClick(result)}>
                      Show Vehicles
                    </button>
                  )}

                  {!starshipButtonClickedMap[result.url] && (
                    <button onClick={() => handleStarshipButtonClick(result)}>
                      Show Starships
                    </button>
                  )}
                  </div>

                  {/* display for details of each button*/}
                  {selectedPerson && selectedPerson.url === result.url && (
                    <div className="people-button-details">

                    {filmDisplay && (
                      <div>
                      <h3>Films:</h3>
                      {filmDetails[result.url] && (
                        <div>
                          {result.films.map((filmURL) => (
                            <p key={filmDetails[result.url][filmURL]?.title}>
                              {filmDetails[result.url][filmURL]?.title}
                            </p>
                          ))}
                        </div>
                        )}
                        </div>
                        )}

                        {speciesDisplay && (
                          <div>
                       <h3>Species:</h3>
                        {speciesDetails[result.url] && result.species.length > 0 ? (
                          <div>
                            {result.species.map((speciesURL) => (
                              <p key={speciesDetails[result.url][speciesURL]?.name}>
                                {speciesDetails[result.url][speciesURL]?.name}
                              </p>
                            ))}
                          </div>
                          ) : (
                            <p>No species information available for this character.</p>
                          )}
                          </div>
                          )}

                          
                          {vehicleDisplay && (
                          <div>
                       <h3>Vehicles:</h3>
                        {vehicleDetails[result.url] && result.vehicles.length > 0 ? (
                          <div>
                            {result.vehicles.map((vehiclesURL) => (
                              <p key={vehicleDetails[result.url][vehiclesURL]?.name}>
                                {vehicleDetails[result.url][vehiclesURL]?.name}
                              </p>
                            ))}
                          </div>
                          ) : (
                            <p>No vehicle information available for this character.</p>
                          )}
                          </div>
                          )}

                          
                          {starshipDisplay && (
                            <div>
                       <h3>Starships:</h3>
                        {starshipDetails[result.url] && result.starships.length > 0 ? (
                          <div>
                            {result.starships.map((starshipURL) => (
                              <p key={starshipDetails[result.url][starshipURL]?.name}>
                                {starshipDetails[result.url][starshipURL]?.name}
                              </p>
                            ))}
                          </div>
                          ) : (
                            <p>No starship information available for this character.</p>
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

      {pageDisplay && <div>Page {currentPage} </div>}

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

export default PeoplePage;
