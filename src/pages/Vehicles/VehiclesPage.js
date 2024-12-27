import React, { useState, useCallback } from "react";
// import { Link } from 'react-router-dom';

import "./VehiclePage.css";
import Loader from "../../components/Loader/Loader";
import VehicleImage from "./VehicleImage";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Adjust this to your preferred date format
};

const VehiclesPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://swapi.py4e.com/api/vehicles/"
  );
  const [previousPageUrl, setPreviousPageUrl] = useState(
    "https://swapi.py4e.com/api/vehicles/"
  );
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const [loading, setLoading] = useState(false);

  const [vehiclelinks, setVehicleLinks] = useState(false);
  const [pageDisplay, setPageDisplay] = useState(false);

  const [pilotDetails, setPilotDetails] = useState({});
  const [filmDetails, setFilmDetails] = useState({});
  const [pilotButtonClickedMap, setPilotButtonClickedMap] = useState({});
  const [filmButtonClickedMap, setFilmButtonClickedMap] = useState({});

  const [pilotDisplay, setPilotDisplay] = useState({});
  const [filmDisplay, setFilmDisplay] = useState({});

  const handleVehicles = useCallback(async (url) => {
    try {

      setVehicleLinks(false);
      setPageDisplay(false);
      setLoading(true);
      setIsFetch(false);
      setNextBtn(false);
      setPrevBtn(false);

      const response = await fetch(url);
      const data = await response.json();

      setNextBtn(!!data.next);
      setVehicleLinks(true);
      setPageDisplay(true);
      setPrevBtn(!!data.previous);

      setVehicles(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setLoading(false);
    } catch (error) {}
  }, []);

      // fetch details for each button
      const fetchPilotDetails = async (vehicle) => {

        try{
            setPilotButtonClickedMap({...pilotButtonClickedMap, [vehicles.url]: true});
            setLoading(true);
            const pilotPromises = vehicle.pilots.map(async (url) => {
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
                [vehicle.url]: pilotDetailsMap,
            });
    
            setPilotButtonClickedMap({...pilotButtonClickedMap, [vehicles.url]: false});
            setLoading(false);
    
        }catch(error){console.error("Error fetching pilot details:", error);}
      };
    
      const fetchFilmDetails = async (vehicle) => {
    
        try{
            setFilmButtonClickedMap({...filmButtonClickedMap, [vehicles.url]: true});
            setLoading(true);
            const filmPromises = vehicle.films.map(async (url) => {
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
                [vehicle.url]: filmDetailsMap,
            });
    
            setFilmButtonClickedMap({...filmButtonClickedMap, [vehicles.url]: false});
            setLoading(false);
    
        }catch(error){console.error("Error fetching pilot details:", error);}
      };
    
         // button Click handlers
         const handlePilotButtonClick = async (vehicle) => {
          if (!pilotDetails[vehicle.url]) {
            await fetchPilotDetails(vehicle);
          }
          setPilotDisplay(true);
          setFilmDisplay(false);
      
          setSelectedVehicle(vehicle);
        };
    
        const handleFilmButtonClick = async (vehicle) => {
          if (!filmDetails[vehicle.url]) {
            await fetchFilmDetails(vehicle);
          }
          setFilmDisplay(true);
          setPilotDisplay(false);
      
          setSelectedVehicle(vehicle);
        };

  const nextPageHandler = () => {
    if (nextPageUrl) {
      handleVehicles(nextPageUrl);
      setCurrentPage(currentPage + 1);
    }
  };

  const backPageHandler = () => {
    if (previousPageUrl) {
      handleVehicles(previousPageUrl);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="vehicle-container">
      {/* <h1>Vehicles Page</h1> */}
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
        <button onClick={nextPageHandler}>Vehicles of StarWars</button>
      )}

      {vehiclelinks && (
        <div>
      {vehicles.map((result) => {
           const vehicleInfo = VehicleImage.find(
            (vehicle) => vehicle.name === result.name
          );
        return(
        <div key={result.name} className="starship-links">
          <h5>{result.name}</h5>
          <img
                src={vehicleInfo ? vehicleInfo.vehicleImgSrc : ""}
                alt={result.name}
              />
                 {vehicleInfo ? (
                  <p>{vehicleInfo.description}</p>
                ) : (
                  <p>Description not available</p>
                )}
          <p>Created: {formatDate(result.created)}</p>
          <p>Edited: {formatDate(result.edited)}</p>
          {/* <p>Url: {result.url}</p> */}

                 {/*Buttons*/}
                 {!pilotButtonClickedMap[result.url] && (
                    <button onClick={() => handlePilotButtonClick(result)}>
                      Pilots
                    </button>
                  )}

                  {!filmButtonClickedMap[result.url] && (
                    <button onClick={() => handleFilmButtonClick(result)}>
                      Films
                    </button>
                  )}

                  {/* display for details of each button*/}
                  {selectedVehicle && selectedVehicle.url === result.url && (
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
                      ):(
                      <p>No pilot information available</p>)}
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

export default VehiclesPage;
