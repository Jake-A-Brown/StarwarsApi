// /* eslint-disable react/jsx-no-duplicate-props */
// import React, { useEffect, useRef, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./SideBar.css";
// import sidebarNavItems from './sidebarNavItems.js';
// import starwarslogo from './Star_Wars_Logo.svg.png';

// const Navbar = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
//   const [sidebarActive, setSidebarActive] = useState(false);
//   const sidebarRef = useRef();
//   const location = useLocation();
//   const [hamburgerDisplay, setHamburgerDisplay] = useState(true);
//   const [hamburgerCloseDisplay, setHamburgerCloseDisplay] = useState(false);

//   useEffect(() => {
//     const curPath = window.location.pathname.split("/")[1];
//     const activeItem = sidebarNavItems.findIndex((item) => item.section === curPath);
//     setActiveIndex(curPath.length === 0 ? 0 : activeItem);
//   }, [location]);

//   const toggleSubMenu = (index) => {
//     setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   const toggleSidebar = () => {
    
//     if(hamburgerDisplay){
//     setHamburgerDisplay(!hamburgerDisplay);
//     }

//     if(!hamburgerDisplay){
//       setHamburgerDisplay(true);
//     }

//     if(setHamburgerCloseDisplay){
//     setHamburgerCloseDisplay(!hamburgerCloseDisplay); 
//     }
//     setSidebarActive(!sidebarActive);
//   };


//   return (
//     <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>

//       <Link to="/home" className="sidebar-logo">
//         <div>
//           <img className="starwars-logo" src={starwarslogo} alt="starwars logo" />
//         </div>
//       </Link>

//           {/* Add a button/icon to toggle the sidebar */}
//           {/* Change this to disapear onclick using state*/}
//           {hamburgerDisplay && <div className="sidebar-toggle" onClick={toggleSidebar}> ☰ </div>}

//       <div ref={sidebarRef} className="sidebar-menu">

//         {/* Add a button/icon to toggle the sidebar */}
//            {/* Change this to disapear onclick using state*/}
//         {hamburgerCloseDisplay && <div className="sidebar-toggle" onClick={toggleSidebar}> {"\u2716"} </div>}
        
//       {/* <Link to="/home" className="sidebar-logo">
//         <div>
//           <img className="starwars-mb-logo" src={starwarslogo} alt="starwars logo" />
//         </div>
//       </Link> */}

//         {sidebarNavItems.map((item, index) => (
//           <div key={index}>
//             <div
//               onClick={() => toggleSubMenu(index)}
//               className={`sidebar-menu-item ${activeIndex === index ? "sidebar-active" : ""}`}
//             >
              
//               <div className="sidebar-menu-item-icon">{item.icon}</div>
//               <div className="sidebar-menu-item-text">{item.display}</div>
              
//             </div>

//             {item.subItems && openSubMenuIndex === index && (
//               <div className="submenu-wrapper">
//                 {item.subItems.map((subItem, subIndex) => (
//                   <Link to={subItem.to} key={subIndex} className="no-underline">
//                     <div
//                       className={`sidebar-submenu-item ${
//                         activeIndex === index && subIndex === 0 ? "sidebar-active" : ""
//                       }`}
//                     >
//                       <div className="sidebar-submenu-item-text">
//                         {subItem.icon} {subItem.display}
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default Navbar;




 import React, { useEffect, useRef, useState } from "react";
 import { Link, useLocation } from "react-router-dom";
//  import sidebarNavItems from './sidebarNavItems.js';
 import starwarslogo from './Star_Wars_Logo.svg.png';

 import "./SideBar.css";



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navBar">
      <nav className="navBar-container">
        <div className="nav-background">
          <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "✖" : "☰"}
          </button>
          <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
            <li className="nav-item">
              <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/movies" onClick={() => setIsMenuOpen(false)}>Movies</Link>
            </li>
            <li className="nav-item">
              <Link to="/people" onClick={() => setIsMenuOpen(false)}>Characters</Link>
            </li>
            <li className="nav-item">
              <Link to="/planets" onClick={() => setIsMenuOpen(false)}>Planets</Link>
            </li>
            <li className="nav-item">
              <Link to="/species" onClick={() => setIsMenuOpen(false)}>Species</Link>
            </li>
            <li className="nav-item">
              <Link to="/starships" onClick={() => setIsMenuOpen(false)}>Starships</Link>
            </li>
            <li className="nav-item">
              <Link to="/vehicles" onClick={() => setIsMenuOpen(false)}>Vehicles</Link>
            </li>
            <li className="nav-item">
              <Link to="/crawl" onClick={() => setIsMenuOpen(false)}>Opening Crawl</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

