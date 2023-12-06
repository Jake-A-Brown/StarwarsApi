import React, { useState, useCallback } from "react";
// import { Link } from 'react-router-dom';

import "./StarshipsPage.css";
import Loader from './../../components/Loader/Loader';
// import StarshipImage from "./StarshipImage";

const StarshipTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [starships, setStarships] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://swapi.dev/api/starships/"
  );
  const [previousPageUrl, setPreviousPageUrl] = useState(
    "https://swapi.dev/api/starships/"
  );
  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tableone, setTableOne] = useState(false);
  const [tabletwo, setTableTwo] = useState(false);
  const [pageDisplay, setPageDisplay] = useState(false);

  const handleStarships = useCallback(async (url) => {
    try {
      setTableOne(false);
      setPageDisplay(false);
      setTableTwo(false);
      setLoading(true);
      setIsFetch(false);
      setNextBtn(false);
      setPrevBtn(false);

      const response = await fetch(url);
      const data = await response.json();

      setNextBtn(!!data.next);
      setPrevBtn(!!data.previous);
      setPageDisplay(true);
      setTableOne(true);
      setTableTwo(true);

      setStarships(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setLoading(false);
    } catch (error) {}
  }, []);

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
        <button onClick={nextPageHandler}>Starship Table of StarWars</button>
      )}

      {tableone && (
        <div>
          <h2>Table 1</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Credit Cost</th>
                <th>Length</th>
                <th>Max atmosphering speed</th>
                <th>Crew</th>
              </tr>
            </thead>
            <tbody>

              {starships.map((result) => {
                return(
                <tr key={result.name}>
                  <td>{result.name}</td>
                  <td>{result.model}</td>
                  <td>{result.manufacturer}</td>
                  <td>{result.cost_in_credits}</td>
                  <td>{result.length}</td>
                  <td>{result.max_atmosphering_speed}</td>
                  <td>{result.crew}</td>
                </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      )}

      {tabletwo && (
        <div>
          <h2>Table 2</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Passengers</th>
                <th>Cargo capacity</th>
                <th>Consumables</th>
                <th>Hyperdrive rating</th>
                <th>MGLT</th>
                <th>Starship Class</th>
              </tr>
            </thead>
            <tbody>
              {starships.map((result) => {
                return(
                <tr key={result.name}>
                  <td>{result.name}</td>
                  <td>{result.passengers}</td>
                  <td>{result.cargo_capacity}</td>
                  <td>{result.consumables}</td>
                  <td>{result.hyperdrive_rating}</td>
                  <td>{result.MGLT}</td>
                  <td>{result.starship_class}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
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

export default StarshipTable;
