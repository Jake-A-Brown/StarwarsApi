import React, { useState, useCallback } from "react";
// import { Link } from 'react-router-dom';

import "./StarshipsPage.css";
import Loader from './../../components/Loader/Loader';
import StarshipImage from "./StarshipImage";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Adjust this to your preferred date format
};

const StarshipsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [starships, setStarships] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://swapi.py4e.com/api/starships/"
  );
  const [previousPageUrl, setPreviousPageUrl] = useState(
    "https://swapi.py4e.com/api/starships/"
  );
  const [selectedStarships, setSelectedStarships] = useState(null);

  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const [loading, setLoading] = useState(false);

  const [starlinks, setStarLinks] = useState(false);
  const [pageDisplay, setPageDisplay] = useState(false);

  const [pilotDetails, setPilotDetails] = useState({});
  const [filmDetails, setFilmDetails] = useState({});
  const [pilotButtonClickedMap, setPilotButtonClickedMap] = useState({});
  const [filmButtonClickedMap, setFilmButtonClickedMap] = useState({});

  const [pilotDisplay, setPilotDisplay] = useState({});
  const [filmDisplay, setFilmDisplay] = useState({});

  const handleStarships = useCallback(async (url) => {
    try {
      setPageDisplay(false);
      setStarLinks(false);
      setLoading(true);
      setIsFetch(false);
      setNextBtn(false);
      setPrevBtn(false);

      const response = await fetch(url);
      const data = await response.json();

      setNextBtn(!!data.next);
      setPrevBtn(!!data.previous);
      setPageDisplay(true);
      setStarLinks(true);

      setStarships(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setLoading(false);
    } catch (error) {}
  }, []);

    // fetch details for each button
  const fetchPilotDetails = async (starship) => {

    try{
        setPilotButtonClickedMap({...pilotButtonClickedMap, [starships.url]: true});
        setLoading(true);
        const pilotPromises = starship.pilots.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        });

        const pilots = await Promise.all(pilotPromises);

        const pilotDetailsMap = {};
        pilots.forEach((pilot) => {
          pilotDetailsMap[pilot.url] = pilot;
        });

        setPilotDetails({
            ...pilotDetailsMap,
            [starship.url]: pilotDetailsMap,
        });

        setPilotButtonClickedMap({...pilotButtonClickedMap, [starships.url]: false});
        setLoading(false);

    }catch(error){console.error("Error fetching pilot details:", error);}
  };

  const fetchFilmDetails = async (starship) => {

    try{
        setFilmButtonClickedMap({...filmButtonClickedMap, [starships.url]: true});
        setLoading(true);
        const filmPromises = starship.films.map(async (url) => {
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
            [starship.url]: filmDetailsMap,
        });

        setFilmButtonClickedMap({...filmButtonClickedMap, [starships.url]: false});
        setLoading(false);

    }catch(error){console.error("Error fetching pilot details:", error);}
  };

     // button Click handlers
     const handlePilotButtonClick = async (starship) => {
      if (!pilotDetails[starship.url]) {
        await fetchPilotDetails(starship);
      }
      setPilotDisplay(true);
      setFilmDisplay(false);
  
      setSelectedStarships(starship);
    };

    const handleFilmButtonClick = async (starship) => {
      if (!filmDetails[starship.url]) {
        await fetchFilmDetails(starship);
      }
      setFilmDisplay(true);
      setPilotDisplay(false);
  
      setSelectedStarships(starship);
    };

  const nextPageHandler = () => {
    if (nextPageUrl) {
      handleStarships(nextPageUrl);
      setCurrentPage(currentPage + 1);
    }
  };

  const backPageHandler = () => {
    if (previousPageUrl) {
      handleStarships(previousPageUrl);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="starship-container">
      {pageDisplay && <div>Page {currentPage} </div>}
      {loading && <div className="loading-bar"><Loader/></div>}
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
      {isFetch && (
        <button onClick={nextPageHandler}>Starships of StarWars</button>
      )}

      {starlinks && (
        <div>
          {starships.map((result) => {
              const starshipInfo = StarshipImage.find(
                (starship) => starship.name === result.name
              );
            return(
            <div key={result.name} className="starship-links">
              <h5>{result.name}</h5>
              <img
                src={starshipInfo ? starshipInfo.starshipImgSrc : ""}
                alt={result.name}
              />
                {starshipInfo ? (
                  <p>{starshipInfo.description}</p>
                ) : (
                  <p>Description not available</p>
                )}
              <p>Created: {formatDate(result.created)}</p>
              <p>Edited: {formatDate(result.edited)}</p>
              {/* <p>Url: {result.url}</p> */}
              
                  {/*Buttons*/}
                  {!pilotButtonClickedMap[result.url] && (
                    <button onClick={() => handlePilotButtonClick(result)}>
                      Show Pilots
                    </button>
                  )}

                  {!filmButtonClickedMap[result.url] && (
                    <button onClick={() => handleFilmButtonClick(result)}>
                      Show Films
                    </button>
                  )}

                  {/* display for details of each button*/}
                  {selectedStarships && selectedStarships.url === result.url && (
                    <div>

                      {pilotDisplay && (
                        <div>
                      <h3>Pilots:</h3>
                      {pilotDetails[result.url] && result.pilots.length > 0 ?  (
                        <div>
                          {result.pilots.map((pilotURL) => (
                            <p
                              key={pilotDetails[result.url][pilotURL]?.name}
                            >
                            {pilotDetails[result.url][pilotURL]?.name}
                            </p>
                          ))}
                        </div>
                      ):(<p>No pilot information available</p>
                      )}
                      </div>
                      )}
                      
                      {filmDisplay && (
                        <div>
                        <h3>Films:</h3>
                      {filmDetails[result.url] && result.films.length > 0 ?(
                        <div>
                          {result.films.map((filmURL) => (
                            <p
                              key={filmDetails[result.url][filmURL]?.title}
                            >
                            {filmDetails[result.url][filmURL]?.title}
                            </p>
                          ))}
                        </div>
                      ):(
                      <div>no film details</div>
                      )}
                      </div>
                      )}

                    </div>
                  )}

            </div>
            );
          })}
        </div>
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
    </div>
  );
};

export default StarshipsPage;
