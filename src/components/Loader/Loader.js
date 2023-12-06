import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = () => {
  const [loadingDots, setLoadingDots] = useState(".");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingDots((prevDots) => {
        if (prevDots === "...") {
          return ".";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []); // Run this effect only once on component mount

  return (
    <div>
    <div id="loader">
      <div className="ls-particles ls-part-1"></div>
      <div className="ls-particles ls-part-2"></div>
      <div className="ls-particles ls-part-3"></div>
      <div className="ls-particles ls-part-4"></div>
      <div className="ls-particles ls-part-5"></div>
      <div className="lightsaber ls-left ls-green"></div>
      <div className="lightsaber ls-right ls-red"></div>
      <div className="loadingdots">Loading{loadingDots}</div>
    </div>
    </div>
  );
};

export default Loader;
