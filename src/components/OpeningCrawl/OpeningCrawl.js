import React, { useState, useEffect } from "react";
import "./OpeningCrawl.css";
import starwarsLogo from './Star_Wars_Logo.svg.png';
import Crawl from 'react-star-wars-crawl';
import 'react-star-wars-crawl/lib/index.css';

const OpeningCrawl = () => {
  const [films, setFilms] = useState('');
  const [filmData, setFilmData] = useState(null);

  const handleFilms = async (selectedFilm) => {
    const response = await fetch(`https://swapi.py4e.com/api/films/${selectedFilm}`);
    const data = await response.json();
    setFilmData(data);
  };

  const handleMovieChange = (e) => {
    const selectedFilm = e.target.value;
    setFilms(selectedFilm);

    if (selectedFilm) {
      handleFilms(selectedFilm);
    }
  };

  useEffect(() => {
    const audio = document.getElementById("opening-crawl-audio");

    // Play the audio when filmData changes
    if (filmData) {
      audio.play();
    }
  }, [filmData]);

  return (
    <div className="opening-crawl">

      <audio id="opening-crawl-audio" preload="auto">
        <source src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.ogg" type="audio/ogg" />
        <source src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="opening-crawl-container">
        {/* <br/> */}

        {filmData && (

          <div style={{ height: "400px", width: '70%', border:"solid, white" }}>
            <Crawl
              subTitle={filmData.title}
              title={"Episode " + filmData.episode_id}
              text={filmData.opening_crawl}
            />
          </div>

        )}

<div style={{ zIndex: '5000' }}>

<h3>Opening Crawl</h3>

<select value={films} onChange={handleMovieChange}>
  <option value="">Select a Film</option>
  <option value="4">Episode 1</option>
  <option value="5">Episode 2</option>
  <option value="6">Episode 3</option>
  <option value="1">Episode 4</option>
  <option value="2">Episode 5</option>
  <option value="3">Episode 6</option>
</select>
</div>

      </div>
    </div>
  );
};

export default OpeningCrawl;