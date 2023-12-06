import React, { useState, useCallback } from "react";
// import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

import "./VehiclePage.css";

const VehicleTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://swapi.dev/api/vehicles/"
  );
  const [previousPageUrl, setPreviousPageUrl] = useState(
    "https://swapi.dev/api/vehicles/"
  );
  const [nextBtn, setNextBtn] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tableone, setTableOne] = useState(false);
  const [tabletwo, setTableTwo] = useState(false);
  const [pageDisplay, setPageDisplay] = useState(false);

  const handleVehicles = useCallback(async (url) => {
    try {

      setTableOne(false);
      setTableTwo(false);
      setPageDisplay(false);
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

      setVehicles(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setLoading(false);
    } catch (error) {}
  }, []);

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
        <button onClick={nextPageHandler}>Vehicle Table of StarWars</button>
      )}

{tableone &&(<div>
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
          </tr>
        </thead>
        <tbody>
          {vehicles.map((result) => {
            return(
            <tr key={result.name}>
              <td>{result.name}</td>
              <td>{result.model}</td>
              <td>{result.manufacturer}</td>
              <td>{result.cost_in_credits}</td>
              <td>{result.length}</td>
              <td>{result.max_atmosphering_speed}</td>
            </tr>
            );
            })}
        </tbody>
      </table>
      </div>)}

      {tabletwo && (<div>
      <h2>Table 2</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Crew</th>
            <th>Passengers</th>
            <th>Cargo capacity</th>
            <th>Consumables</th>
            <th>Vehicle class</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((result) => {
            return(
            <tr key={result.name}>
              <td>{result.name}</td>
              <td>{result.crew}</td>
              <td>{result.passengers}</td>
              <td>{result.cargo_capacity}</td>
              <td>{result.consumables}</td>
              <td>{result.vehicle_class}</td>
            </tr>
            );
            })}
        </tbody>
      </table>
      </div>)}

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

export default VehicleTable;
