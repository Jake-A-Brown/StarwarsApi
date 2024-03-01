const sidebarNavItems = [
  {
    display:'Home',
    icon: <i className="bx bx-chevron-down"></i>,
    subItems: [
      {
        display: 'Home',
        to:'/home',
      }
    ]
  },
  {
    display: "Movies",
    icon: <i className="bx bx-chevron-down"></i>,
    section: "Movies",
    subItems: [
      {
        display: "Movies",
        to:'/movies',
      },
      {
        // display:'Movie Information',
        // to:'/moviedetails'
      },
      {
        display: "Opening Crawl",
        to:'/crawl',
      }
    ],
  },
  {
    display: "Characters",
    icon: <i className="bx bx-chevron-down"></i>,
    section: "Characters",
    subItems: [
      {
        display:"Characters",
        to:`/people/`,
      },
      {
        // display:"Character Information",
      }
    ],
  },
  {
    display: "Planets",
    icon: <i className="bx bx-chevron-down"></i>,
    section: "Planets",
    subItems: [
      {
        display:'Planets',
        to:'/planets'
      },
      {
        // display:'Planet Links',
        // to:'/planetlinks'
      }
    ],
  },
  {
    display:'Species',
    icon: <i className="bx bx-chevron-down"></i>,
    section: "Species",
    subItems: [
      {
        display:'Species',
        to:'/species'
      },
      {
        // display:'Specie Information',
      }
    ],
  },
  {
    display:'StarShips',
    icon: <i className="bx bx-chevron-down"></i>,
    section: "Starships",
    subItems: [
      {
        display:'StarShips',
        to:'/starships'
      },
      {
        // display:'Starship Details',
        // to:'/starshiptable'
      }
    ],
  },
  {
    display:'Vehicles',
    icon:<i className="bx bx-chevron-down"></i>,
    section: 'Vehicles',
    subItems: [
      {
        display:'Vehicle',
        to:'/vehicles'
      },
      {
        // display:'Vehicle Details',
        // to:'/vehicletable'
      }
    ],
  },
];

export default sidebarNavItems;
