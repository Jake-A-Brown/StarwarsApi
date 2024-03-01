import React from "react";
import { Route, Routes, Navigate, } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import Blank from "./pages/Blank";
import Home from "./pages/Home/Home";
import "./App.css";
import MoviePage from "./pages/Movie/MoviePage";
import Navbar from "./components/Sidebar/Navbar";
import StarshipsPage from "./pages/Starships/StarshipsPage";
import PeoplePage from "./pages/People/PeoplePage";
import VehiclesPage from "./pages/Vehicles/VehiclesPage";
import SpeciesPage from "./pages/Species/SpeciesPage";
import OpeningCrawl from "./components/OpeningCrawl/OpeningCrawl";
import PlanetPage from "./pages/Planet/PlanetPage";
import PlanetLinks from "./pages/Planet/PlanetLinks";
import StarshipTable from "./pages/Starships/StarshipTable";
import VehicleTable from "./pages/Vehicles/VehicleTable";

function App() {
  return (
    <div className="main-div">
      <div className="sidebar-div">
        <Navbar />
      </div>
      <div className="container-div">
        <Routes>
          <Route path="/" index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/crawl" element={<OpeningCrawl />} />
          <Route path="/starships" element={<StarshipsPage />} />
          <Route path="/starshiptable" element={<StarshipTable />} />
          <Route path="/people/" element={<PeoplePage />} />
          <Route path="/vehicles" element={<VehiclesPage />}/>
          <Route path="/vehicletable" element={<VehicleTable/>} />
          <Route path="/species" element={<SpeciesPage />} />
          <Route path='/planetlinks' element={<PlanetLinks />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/planets" element={<PlanetPage />} />
        </Routes>
      </div>
      </div>
  );
}

export default App;
