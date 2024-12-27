import React, { useCallback, useState } from "react";
import SpeciesImage from "./SpeciesImage";

import './SpeciesPage.css';
import Loader from './../../components/Loader/Loader';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Adjust this to your preferred date format
};

const SpeciesPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [species, setSpecies] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://swapi.py4e.com/api/species/"
  );
  const [previousPageUrl, setPreviousPageUrl] = useState(
    "https://swapi.py4e.com/api/species/"
  );
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const [loading, setLoading] = useState(false);

  const [pageDisplay, setPageDisplay] = useState(false);
  const [speciesDisplay, setSpeciesDisplay] = useState(false);

  const [peopleDetails, setPeopleDetails] = useState({});
  const [filmsDetails, setFilmsDetails] = useState({});
  const [peopleButtonClickedMap, setPeopleButtonClickedMap] = useState({});
  const [filmButtonClickedMap, setFilmButtonClickedMap] = useState({});

  const [charDisplay, setCharDisplay] = useState({});
  const [filmDisplay, setFilmDisplay] = useState({});

  const handleSpecies = useCallback(async (url) => {
    try {
      setLoading(true);
      setIsFetch(false);
      setSpeciesDisplay(false);
      setPageDisplay(false);
      setNextBtn(false);
      setPrevBtn(false);

      const response = await fetch(url);
      const data = await response.json();

      setNextBtn(!!data.next);
      setPrevBtn(!!data.previous);
      setSpeciesDisplay(true);
      setPageDisplay(true);

      setSpecies(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setLoading(false);
    } catch (error) {}
  }, []);
    
  // fetch details for each button
  const fetchPeopleDetails = async (species) => {

    try{
        setPeopleButtonClickedMap({...peopleButtonClickedMap, [species.url]: true});
        setLoading(true);
        const peoplePromises = species.people.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        });

        const people = await Promise.all(peoplePromises);

        const peopleDetailsMap = {};
        people.forEach((people) => {
          peopleDetailsMap[people.url] = people;
        });

        setPeopleDetails({
            ...peopleDetailsMap,
            [species.url]: peopleDetailsMap,
        });

        setPeopleButtonClickedMap({...peopleButtonClickedMap, [species.url]: false});
        setLoading(false);

    }catch(error){console.error("Error fetching people details:", error);}
  };

  const fetchFilmDetails = async (species) => {

    try{
        setFilmButtonClickedMap({...filmButtonClickedMap, [species.url]: true});
        setLoading(true);
        const filmPromises = species.films.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        });

        const films = await Promise.all(filmPromises);

        const filmDetailsMap = {};
        films.forEach((film) => {
          filmDetailsMap[film.url] = film;
        });

        setFilmsDetails({
            ...filmDetailsMap,
            [species.url]: filmDetailsMap,
        });

        setFilmButtonClickedMap({...filmButtonClickedMap, [species.url]: false});
        setLoading(false);

    }catch(error){console.error("Error fetching film details:", error);}
  };

     // button Click handlers
     const handlePeopleButtonClick = async (species) => {
      if (!peopleDetails[species.url]) {
        await fetchPeopleDetails(species);
      }

      setCharDisplay(true);
      setFilmDisplay(false);
  
      setSelectedSpecies(species);
    };

    const handleFilmButtonClick = async (species) => {
      if (!filmsDetails[species.url]) {
        await fetchFilmDetails(species);
      }

      setFilmDisplay(true);
      setCharDisplay(false);
  
      setSelectedSpecies(species);
    };


  const nextPageHandler = () => {
    if (nextPageUrl) {
      handleSpecies(nextPageUrl);
      setCurrentPage(currentPage+1);
    }
  };

  const backPageHandler = () => {
    if (previousPageUrl) {
      handleSpecies(previousPageUrl);
      setCurrentPage(currentPage-1);
    }
  };

  return (
    <div className="species-container">
      {loading && <div className="loading-bar"><Loader/></div>}
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

    {speciesDisplay && (
      <div className="species-grid">
        {species.map((result) => {
          
          const speciesInfo = SpeciesImage.find(
            (species) => species.name === result.name
          );

          return (
            <div key={result.name} className="species-result-container">
              <div className="species-items">
                <h2>{result.name}</h2>
                <img
                  src={speciesInfo ? speciesInfo.speciesImgSrc : ""}
                  alt={result.name}
                />
                <h5>Created: {formatDate(result.created)}</h5>
                <h5>Edited: {formatDate(result.edited)}</h5>
                {/* <p>Classification: {result.classification}</p>
                <p>Designation: {result.designation}</p>
                <p>Average height: {result.average_height}</p>
                <p>Skin colors: {result.skin_colors}</p>
                <p>Hair colors: {result.hair_colors}</p>
                <p>Eye colors: {result.eye_colors}</p>
                <p>Average lifespan: {result.average_lifespan}</p>
                <p>Language: {result.language}</p> */}
                {/* <h5>URL: {result.url}</h5> */}

                  {/*Buttons*/}
                  {!peopleButtonClickedMap[result.url] && (
                    <button onClick={() => handlePeopleButtonClick(result)}>
                      Show People
                    </button>
                  )}

                  {!filmButtonClickedMap[result.url] && (
                    <button onClick={() => handleFilmButtonClick(result)}>
                      Show Films
                    </button>
                  )}

                  
                  {/* display for details of each button*/}
                  {selectedSpecies && selectedSpecies.url === result.url && (
                    <div>

                      {charDisplay && (
                        <div>
                      <h3>People:</h3>
                      {peopleDetails[result.url] && (
                        <div>
                          {result.people.map((peopleURL) => (
                            <div
                              key={peopleDetails[result.url][peopleURL]?.name}
                            >
                            {peopleDetails[result.url][peopleURL]?.name}<span/>
                            </div>
                          ))}
                        </div>
                      )}
                      </div>
                      )}
                      
                      {filmDisplay && (
                        <div>
                       <h3>Films:</h3>
                      {filmsDetails[result.url] && (
                        <div>
                          {result.films.map((filmURL) => (
                            <div
                              key={filmsDetails[result.url][filmURL]?.title}
                            >
                            {filmsDetails[result.url][filmURL]?.title}<span/>
                            </div>
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

      <div>
        {isFetch && (
          <button onClick={nextPageHandler}>Species of StarWars</button>
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
    </div>
  );
};

export default SpeciesPage;
