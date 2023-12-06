// import React, { useCallback, useState, useEffect } from "react";
// import PlanetImage from "./PlanetImage";
// import "./Planets.css";

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleString(); // Adjust this to your preferred date format
// };

// const wookieF = `format=wookiee`;

// const WookiePlanet = () => {
//     const [currentPage, setCurrentPage] = useState(0);

//     //results is in wookiePlanets need to grab this url
//     const [wookieePlanets, setWookieePlanets] = useState(null,[]);
//     const [nextWookieeFormat, setNextWookieeFormat] = useState(
//       `https://swapi.dev/api/planets/?page=1&format=wookiee`
//     );
//     const [previousWookieeFormat, setPreviousWookieeFormat] = useState(
//       `https://swapi.dev/api/planets/?page=${currentPage}&${wookieF}`
//     );

//     const [nextBtn, setNextBtn] = useState(false);
//     const [prevBtn, setPrevBtn] = useState(false);
//     const [isFetch, setIsFetch] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [planetDisplay, setPlanetDisplay] = useState(false);
//     const [pageDisplay, setPageDisplay] = useState(false);

//     const handleWookieeFormat = useCallback(async (url) => {
//         try {
    
//           setLoading(true);
//           setPageDisplay(false);
//           setIsFetch(false);
//           setPlanetDisplay(false);
//           setNextBtn(false);
//           setPrevBtn(false);
    
//           const response = await fetch(url);
//           const data = await response.json();
    
//           setNextBtn(!!data.next);
//           setPrevBtn(!!data.previous);
//           setPlanetDisplay(true);
//           setPageDisplay(true);
    
//           setWookieePlanets(data.results);
//           setNextWookieeFormat(data.next);
//           setPreviousWookieeFormat(data.previous);
//           setLoading(false);
//         } catch (error) {}
    
//       }, []);

//       const nextWookieePageHandler = () => {
//         if (nextWookieeFormat) {
//           handleWookieeFormat(nextWookieeFormat); 
//           setCurrentPage(currentPage+1);
//         }
//       };
    
//       const backWookieePageHandler = () => {
//         if (previousWookieeFormat) {
//           setCurrentPage(currentPage-1);
//           handleWookieeFormat(previousWookieeFormat); 
//         }
//       };
//   return (
//     <div className="planets-container">

//     {loading && <div className="loading-bar">Loading...</div>}

//     {pageDisplay && (<div>Page {currentPage} </div> )}

//     <div>
//     {isFetch && (
//         <button onClick={nextWookieePageHandler}>Wookiee Planets of StarWars</button>
//       )}
//       {prevBtn && (
//         <button onClick={backWookieePageHandler} disabled={!previousWookieeFormat}>
//           Back
//         </button>
//       )}
//       {nextBtn && (
//         <button onClick={nextWookieePageHandler} disabled={!nextWookieeFormat}>
//           Next
//         </button>
//       )}

//     </div>

//     <div>
//       {wookieePlanets ? (
//         <div>
//           <h2>Wookiee Data</h2>
//           <pre>{JSON.stringify(wookieePlanets, null, 2)}</pre>
//         </div>
//       ) : (
//         <p>Loading Wookiee data...</p>
//       )}
//     </div>

//     {planetDisplay && (
//       <div className="planets-grid">

//         {wookieePlanets.map((result, index) => {

//           const planetInfo = PlanetImage.find(
//             (planet) => planet.name === result.name
//           );

//           return (
//             <div key={result.name} className="planets-result-container">
//               <div className="planets-items">

//                 <h2>{result.whrascwo}</h2>
//                 <p>{result.rcooaoraaoahoowh_akworcahoowa}</p>
//                 <img
//                   src={planetInfo ? planetInfo.imageSrc : ""}
//                   alt={result.name}
//                 /> 

//                  <p>{planetInfo.description}</p> 
//                  <p>Rotation Period: {result.rotation_period}</p>
//                 <p>Orbital Period: {result.orbital_period}</p>
//                 <p>Diameter: {result.diameter}</p>
//                 <p>Climate: {result.climate}</p>
//                 <p>Gravity: {result.gravity}</p>
//                 <p>Terrain: {result.terrain}</p>
//                 <p>Surface Water: {result.surface_water}</p>
//                 <p>Population: {result.population}</p> 
//                  <h5>Created: {formatDate(result.created)}</h5>
//                 <h5>Edited: {formatDate(result.edited)}</h5>
//                 <h5>URL: {result.url}</h5> 
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     )}

//       {pageDisplay && (<div>Page {currentPage} </div> )}

//     <div>
//       {prevBtn && (
//         <button onClick={backWookieePageHandler} disabled={!previousWookieeFormat}>
//           Back
//         </button>
//       )}
//       {nextBtn && (
//         <button onClick={nextWookieePageHandler} disabled={!nextWookieeFormat}>
//           Next
//         </button>
//       )}

//     </div>
//   </div>
//   );
// };

// export default WookiePlanet;


// import React, { useCallback, useState, useEffect } from 'react';
// import PlanetImage from './PlanetImage';
// import './Planets.css';

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleString();
// };

// const WookiePlanet = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [wookieePlanets, setWookieePlanets] = useState([]);
//   const [nextWookieeFormat, setNextWookieeFormat] = useState(null);
//   const [previousWookieeFormat, setPreviousWookieeFormat] = useState(null);
//   const [nextBtn, setNextBtn] = useState(false);
//   const [prevBtn, setPrevBtn] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [planetDisplay, setPlanetDisplay] = useState(false);

//   const handleWookieeFormat = useCallback(async (url) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${url}&format=wookiee`);
//       const data = await response.json();

//       setNextBtn(!!data.next);
//       setPrevBtn(!!data.previous);
//       setPlanetDisplay(true);

//       setWookieePlanets(data.results);
//       setNextWookieeFormat(data.next);
//       setPreviousWookieeFormat(data.previous);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching Wookiee data:', error);
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const initialFetch = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`https://swapi.dev/api/planets/?page=${currentPage}`);
//         const data = await response.json();

//         setNextBtn(!!data.next);
//         setPrevBtn(!!data.previous);
//         setPlanetDisplay(true);

//         setWookieePlanets(data.results);
//         setNextWookieeFormat(data.next);
//         setPreviousWookieeFormat(data.previous);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching initial Wookiee data:', error);
//         setLoading(false);
//       }
//     };

//     initialFetch();
//   }, [currentPage]);

//   const nextWookieePageHandler = () => {
//     if (nextWookieeFormat) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const backWookieePageHandler = () => {
//     if (previousWookieeFormat) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   return (
//     <div className="planets-container">
//       {loading && <div className="loading-bar">Loading...</div>}
//       <div>
//         <button onClick={nextWookieePageHandler}>Wookiee Planets of StarWars</button>
//         {prevBtn && (
//           <button onClick={backWookieePageHandler} disabled={!previousWookieeFormat}>
//             Back
//           </button>
//         )}
//         {nextBtn && (
//           <button onClick={nextWookieePageHandler} disabled={!nextWookieeFormat}>
//             Next
//           </button>
//         )}
//       </div>

//       {planetDisplay && (
//         <div className="planets-grid">
//           {wookieePlanets.map((result) => {
//             const planetInfo = PlanetImage.find((planet) => planet.name === result.name);

//             return (
//               <div key={result.name} className="planets-result-container">
//                 <div className="planets-items">
//                   <h2>{result.name}</h2>
//                   <p>{result.climate}</p>
//                   <img src={planetInfo ? planetInfo.imageSrc : ''} alt={result.name} />
//                   <p>{planetInfo.description}</p>
//                   <p>Rotation Period: {result.rotation_period}</p>
//                   <p>Orbital Period: {result.orbital_period}</p>
//                   <p>Diameter: {result.diameter}</p>
//                   <p>Gravity: {result.gravity}</p>
//                   <p>Terrain: {result.terrain}</p>
//                   <p>Surface Water: {result.surface_water}</p>
//                   <p>Population: {result.population}</p>
//                   <h5>Created: {formatDate(result.created)}</h5>
//                   <h5>Edited: {formatDate(result.edited)}</h5>
//                   <h5>URL: {result.url}</h5>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       <div>
//         {prevBtn && (
//           <button onClick={backWookieePageHandler} disabled={!previousWookieeFormat}>
//             Back
//           </button>
//         )}
//         {nextBtn && (
//           <button onClick={nextWookieePageHandler} disabled={!nextWookieeFormat}>
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WookiePlanet;
