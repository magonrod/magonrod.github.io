// Central portfolio content.
// Edit this file for normal content updates; layout and visual rules live elsewhere.
// Project media workflow:
// 1. Add the file under assets/projects/<project-id>/.
// 2. Find the matching preview or media item below.
// 3. Change enabled: false to enabled: true.
// Supported fields include type, src, poster, alt, role, title, caption, layout and fit.
// Use layout: "wide" for the main demonstration and fit: "contain" for plots or diagrams.

window.portfolioData = {
  site: {
    title: "María González Rodríguez | Space Systems Modelling & Simulation",
    description: "Engineering project portfolio focused on space systems, simulation, numerical modelling, validation and optimisation.",
    canonicalUrl: "https://magonrod.github.io/",
    repositoryUrl: "https://github.com/magonrod/magonrod.github.io"
  },

  person: {
    name: "María González Rodríguez",
    headline: "Aerospace Engineer | Simulation & Optimisation",
    email: "glezrodriguezmaria@gmail.com",
    github: "https://github.com/magonrod",
    linkedin: "https://www.linkedin.com/in/maria-gonzalez-rod/",
    cvPath: "assets/CV.pdf"
  },

  projects: [
    {
      id: "lunar-terrain",
      order: 2,
      title: "Science-Parameterised Lunar Terrain Generation",
      year: "2026",
      context: "ESA Spaceship Poland · Simulation Internship, completed July 2026",
      tags: ["Simulation", "Planetary Robotics", "Verification", "Unreal Engine 5"],
      visual: "terrain",
      preview: {
        enabled: true,
        type: "image",
        src: "assets/projects/lunar-terrain/preview.webp",
        alt: "Wide Unreal Engine view of a procedurally generated lunar terrain with craters, ejecta and rocks",
        label: "Lunar terrain simulation"
      },
      media: [
        {
          enabled: true,
          type: "video",
          src: "assets/projects/lunar-terrain/terrain-flythrough.mp4",
          poster: "assets/projects/lunar-terrain/preview.webp",
          role: "Simulation demo",
          title: "Generated terrain fly-through",
          caption: "A 10–15 second camera or rover-level fly-through showing terrain scale, crater morphology, ejecta regions and rock placement.",
          layout: "wide"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/lunar-terrain/terrain-layers.webp",
          alt: "Grid comparing elevation, slope, crater and ejecta classification, and rock-density layers for the same lunar terrain",
          role: "Model outputs",
          title: "Co-registered terrain layers",
          caption: "A four-panel image showing elevation, slope, crater/ejecta classification and rock-density layers for the same generated terrain.",
          fit: "contain"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/lunar-terrain/validation-plot.webp",
          alt: "Plot comparing generated crater or rock distributions with the target distributions taken from lunar-surface literature",
          role: "Validation",
          title: "Distribution check against literature",
          caption: "A plot comparing generated crater-size or rock-density statistics with the target distributions used to parameterise the model.",
          fit: "contain"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/lunar-terrain/workflow.webp",
          alt: "Workflow from lunar-science parameters to procedural terrain, analysis layers and rover simulation",
          role: "Method",
          title: "Terrain-generation workflow",
          caption: "A compact diagram linking literature-derived parameters to procedural generation, analysis layers and the rover simulation framework.",
          fit: "contain"
        }
      ],
      problem: "Rover perception and navigation research needs diverse lunar environments whose terrain features are traceable to planetary-science descriptions rather than purely decorative procedural generation.",
      contribution: "Developed the procedural terrain-generation module and its co-registered analysis layers within the larger rover simulator.",
      model: "Statistical and geological descriptions of crater populations, degradation states, ejecta zones and rock-placement distributions were translated into a parameterised terrain-generation model.",
      assumptions: "Terrain morphology is generated from literature-derived statistical descriptions. The available sources do not provide final quantitative error metrics or a complete statement of all geological assumptions.",
      implementation: "Developed the terrain-generation module for an Unreal Engine 5 lunar environment simulator within a ROS 2-integrated rover simulation framework.",
      validation: "Generated co-registered elevation, slope, crater/ejecta classification and spatial-density layers, then checked outputs against lunar-surface literature.",
      result: "Delivered scientifically grounded terrain and analysis layers intended to support perception, navigation, synthetic sensor-data generation and future sim-to-real workflows.",
      limitations: "Quantitative validation metrics and public software or demonstration links are not available in the supplied material.",
      tools: ["Unreal Engine 5", "ROS 2 framework", "Procedural modelling", "Literature-based validation"],
      links: [],
      missingLinks: []
    },
    {
      id: "lunar-solar",
      order: 1,
      title: "Lunar Solar Panel Placement Simulator",
      year: "2025",
      context: "Multidisciplinary Modelling and Optimisation Project",
      tags: ["Simulation", "Optimisation", "Lunar Systems", "MATLAB"],
      visual: "solar",
      preview: {
        enabled: true,
        type: "image",
        src: "assets/projects/lunar-solar/LunarX_C.gif",
        alt: "Binary illumination map for a Lunar X terrain region, with illuminated areas in white and terrain shadows in black",
        label: "Actual simulator output",
        fit: "contain"
      },
      media: [
        {
          enabled: true,
          type: "image",
          src: "assets/projects/lunar-solar/LunarX_C.gif",
          alt: "Simulated shadow map for a Lunar X terrain region, with illuminated areas in white and shadowed areas in black",
          role: "Simulation output",
          title: "Terrain-shadow map",
          caption: "Binary illumination output for a recognisable Lunar X terrain region. White represents illuminated terrain and black represents shadow.",
          layout: "wide",
          fit: "contain"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/lunar-solar/model-overview.webp",
          alt: "Simplified block diagram linking design variables, parameters, the shadow module, panel-efficiency module and objective value",
          role: "Model overview",
          title: "Simulation chain",
          caption: "Simplified architecture: panel-location design variables and model parameters feed the shadow and efficiency modules before the annual objective is evaluated.",
          fit: "contain"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/lunar-solar/model-architecture.webp",
          alt: "Detailed block diagram of the lunar solar-panel simulator including solar geometry, DEM ray tracing, temperature, efficiency, radiation and energy modules",
          role: "Model architecture",
          title: "Detailed multidisciplinary simulator",
          caption: "Detailed dependency structure linking UTC time and the lunar DEM to solar geometry, terrain ray tracing, surface temperature, panel efficiency, solar irradiance and total energy.",
          fit: "contain",
          aspect: "natural"
        }
      ],
      equation: {
        label: "Annual objective",
        expression: "E = Σₜ I · Aₚ · η_panel(T(γ_s)) · S(x, y, t)",
        description: "The simulator sums hourly panel output over one year using solar irradiance, panel area, temperature-dependent efficiency and a binary illumination factor."
      },
      facts: [
        { label: "Design space", value: "Latitude −60° to 60°; longitude 0° to 360°" },
        { label: "Time resolution", value: "One-hour steps over 0–8,760 h" },
        { label: "Terrain input", value: "SLDEM2015 lunar DEM, downsampled to one in every 10 points" },
        { label: "Shadow model", value: "Solar geometry and DEM ray tracing within 260 km, including lunar-curvature correction" },
        { label: "Design experiment", value: "40-point Latin hypercube sample" }
      ],
      problem: "Selecting a lunar solar-panel location is a coupled problem: annual energy depends not only on geometric sunlight, but also on terrain-cast shadows, surface temperature and the resulting change in panel efficiency.",
      contribution: "Built a modular MATLAB simulator for lunar solar-panel placement, including shadow, thermal and efficiency models.",
      model: "A modular MATLAB simulator estimates annual output by summing hourly power from constant lunar solar irradiance, panel area, temperature-dependent efficiency and a binary illumination factor. Illumination combines solar altitude and azimuth with DEM-based terrain ray tracing.",
      assumptions: "Solar irradiance is held constant at 1,361 W/m². Surface temperature is approximated through instantaneous radiative balance, and CTJ30 panel efficiency is represented by a linear temperature coefficient. The shadow calculation uses a downsampled SLDEM2015 terrain model, a 260 km comparison radius and a lunar-curvature correction.",
      implementation: "The two design variables are panel latitude and longitude. Separate modules calculate subsolar position, solar altitude and azimuth, terrain shadowing, radiative surface temperature, panel efficiency and the final annual objective over hourly time steps.",
      validation: "Solar-position equations were compared with JPL planetary and lunar ephemeris data. Additional checks included idealised-sphere illumination, critical-elevation tests on synthetic terrain, a qualitative Lunar X shadow comparison, and expected temperature and efficiency behaviour across their operating ranges.",
      result: "In the 40-point Latin hypercube experiment, panel efficiency had the strongest positive correlation with the annual objective (r = 0.97), while shadow hours had a strong negative correlation (r = −0.90). Sunlit hours were less strongly correlated (r = 0.24), suggesting that avoiding prolonged terrain shadow was more influential than simply maximising raw illumination time in this sample.",
      limitations: "Accuracy and runtime depend strongly on DEM resolution. The current study uses a reduced terrain data set and only 40 design samples. The thermal model neglects thermal inertia, irradiance is constant, the efficiency relation is linear at extreme temperatures, and the Lunar X comparison is qualitative rather than a pixel-level validation.",
      tools: ["MATLAB", "SLDEM2015", "JPL ephemerides", "DEM ray tracing", "Latin hypercube sampling", "Pearson correlation"],
      links: [
        { label: "GitHub repository", url: "https://github.com/magonrod/lunar-solar-panel-simulator" }
      ],
      missingLinks: []
    },
    {
      id: "orbitminer",
      order: 3,
      title: "ORBITMiNER: Near-Earth Asteroid Flyby Planning",
      year: "2023",
      context: "Bachelor’s Thesis · Grade 10/10",
      tags: ["Mission Planning", "Optimisation", "Near-Earth Asteroids", "Python"],
      visual: "orbit",
      preview: {
        enabled: true,
        type: "image",
        src: "assets/projects/orbitminer/preview.webp",
        alt: "Snapshot of an optimised sequence connecting moving Near-Earth asteroid targets",
        label: "Asteroid mission planning"
      },
      media: [
        {
          enabled: true,
          type: "video",
          src: "assets/projects/orbitminer/route-animation.mp4",
          poster: "assets/projects/orbitminer/preview.webp",
          role: "Simulation demo",
          title: "Dynamic asteroid-route animation",
          caption: "A short animation showing asteroid motion over time and the flyby sequence selected by the optimisation algorithm.",
          layout: "wide"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/orbitminer/algorithm-workflow.webp",
          alt: "Genetic algorithm workflow for evaluating and improving dynamic asteroid flyby routes",
          role: "Method",
          title: "Genetic-algorithm workflow",
          caption: "A concise diagram of route encoding, fitness evaluation, selection, crossover, mutation and stopping criteria.",
          fit: "contain"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/orbitminer/convergence.webp",
          alt: "Convergence curves comparing genetic algorithm performance across heuristics or repeated runs",
          role: "Verification",
          title: "Convergence and repeatability",
          caption: "Best and mean objective values across generations, preferably for several runs or heuristic configurations.",
          fit: "contain"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/orbitminer/comparison.webp",
          alt: "Comparison of final asteroid flyby routes or algorithm variants under different mission assumptions",
          role: "Results",
          title: "Route and heuristic comparison",
          caption: "A clear comparison of final routes, objective values or mission-design assumptions that explains the engineering conclusion.",
          fit: "contain"
        }
      ],
      problem: "Sequencing flybys of moving Near-Earth asteroid targets is a time-dependent routing problem in which target positions and mission constraints change during the solution process.",
      contribution: "Developed and compared genetic-algorithm strategies for dynamic asteroid-route planning in Python.",
      model: "Modelled the mission-planning task as a dynamic travelling-salesman-type problem with moving targets representing asteroid flybys.",
      assumptions: "The available source material confirms moving targets, alternative heuristics and mission-design assumptions, but does not provide the complete constraint set or benchmark definitions.",
      implementation: "Developed genetic-algorithm strategies in Python and compared heuristic choices, constraints and mission-design assumptions.",
      validation: "Tested algorithm performance under different heuristics and assumptions rather than presenting a single unconstrained optimum.",
      result: "Established a computational framework for exploring interplanetary routing strategies. Final numerical performance results are not present in the supplied material.",
      limitations: "Benchmark cases, convergence evidence and the final mission-planning result still need to be added from the thesis.",
      tools: ["Python", "Genetic algorithms", "Dynamic routing", "Mission planning"],
      links: [],
      missingLinks: []
    },
    {
      id: "rpm",
      order: 4,
      title: "Random Positioning Machine for Microgravity Simulation",
      year: "2022",
      context: "Research Project · Presented at the 73rd IAC",
      tags: ["Microgravity", "Dynamical Simulation", "Verification", "Rotational Motion"],
      visual: "rotation",
      preview: {
        enabled: true,
        type: "image",
        src: "assets/projects/rpm/preview.webp",
        alt: "Photograph, CAD view or schematic of the random positioning machine with its rotation axes marked",
        label: "Microgravity simulation"
      },
      media: [
        {
          enabled: true,
          type: "video",
          src: "assets/projects/rpm/rotation-demo.mp4",
          poster: "assets/projects/rpm/preview.webp",
          role: "System demo",
          title: "Rotational-motion demonstration",
          caption: "A short video or animation showing the two-axis motion and how the sample orientation changes during operation.",
          layout: "wide"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/rpm/gravity-vector.webp",
          alt: "Three-dimensional trace or spherical coverage plot of the simulated gravity vector",
          role: "Model output",
          title: "Gravity-vector coverage",
          caption: "A 3D trace or spherical coverage plot showing how the effective gravity direction is distributed over time.",
          fit: "contain"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/rpm/residual-acceleration.webp",
          alt: "Residual acceleration plotted over time or as a distribution for the random positioning machine",
          role: "Validation",
          title: "Residual-acceleration assessment",
          caption: "A time history, histogram or summary metric used to evaluate the fidelity of the simulated microgravity environment.",
          fit: "contain"
        },
        {
          enabled: true,
          type: "image",
          src: "assets/projects/rpm/algorithm-comparison.webp",
          alt: "Comparison of rotational algorithms using residual acceleration or gravity-vector uniformity metrics",
          role: "Results",
          title: "Rotational-pattern comparison",
          caption: "A comparison of candidate rotational algorithms using the same fidelity metrics, highlighting the strongest and weakest behaviours.",
          fit: "contain"
        }
      ],
      problem: "Random positioning machines approximate microgravity through controlled rotational motion, but residual acceleration and gravity-vector behaviour determine how faithfully the environment is reproduced.",
      contribution: "Designed and analysed rotational algorithms as part of the collaborative random positioning machine project.",
      model: "Represented rotational patterns and the resulting gravity-vector evolution to assess simulated microgravity and partial-gravity conditions.",
      assumptions: "The supplied sources confirm the evaluation criteria but do not provide the full hardware setup, implementation details or numerical thresholds.",
      implementation: "Designed and analysed rotational algorithms as part of an improved random positioning machine concept.",
      validation: "Evaluated residual acceleration and simulated gravity-vector behaviour as fidelity indicators.",
      result: "The research focused on reducing residual acceleration and improving simulated-space-environment fidelity; numerical results are not included in the supplied material.",
      limitations: "Implementation tools, experimental setup and quantitative validation results still need to be added.",
      tools: ["Rotational-motion analysis", "Microgravity simulation", "Residual-acceleration evaluation"],
      links: [],
      missingLinks: []
    }
  ],

  experience: [
    {
      role: "Simulation Intern",
      organisation: "ESA Spaceship Poland",
      location: "Poznań, Poland",
      dates: "February 2026 — July 2026",
      points: [
        "Developed a science-parameterised terrain-generation module for an Unreal Engine 5 lunar environment simulator in a ROS 2-integrated rover simulation framework.",
        "Modelled crater populations, degradation states, ejecta zones and rock placement from statistical and geological lunar-surface descriptions.",
        "Generated co-registered analysis layers and compared outputs with lunar-surface literature."
      ]
    },
    {
      role: "Systems Engineer",
      organisation: "ISDEFE",
      location: "Madrid, Spain",
      dates: "March 2025 — January 2026",
      points: [
        "Reviewed requirements, design documentation and process deliverables for safety-critical ATM systems.",
        "Supported verification and validation by evaluating test plans, procedures and results, and tracking technical issues and software risks."
      ]
    },
    {
      role: "ATM-CNS Engineer",
      organisation: "INECO",
      location: "Madrid, Spain",
      dates: "March 2024 — March 2025",
      points: [
        "Performed conformity studies for aeronautical radio-communication infrastructure.",
        "Used the NAVAID Performance Prediction Model (OUNPPM) to assess potential effects on airport operations."
      ]
    },
    {
      role: "Analyst, Risk Advisory – Core IT",
      organisation: "Deloitte",
      location: "Madrid, Spain",
      dates: "September 2023 — March 2024",
      points: [
        "Analysed security protocols and infrastructure, documenting findings and recommendations against relevant security standards.",
        "Used ACL for data testing and analysis and collaborated on security improvements and risk mitigation."
      ]
    },
    {
      role: "Intern",
      organisation: "Asteroid Mining Corporation Ltd",
      location: "London, United Kingdom",
      dates: "July 2022 — October 2022",
      points: [
        "Supported early-stage design of a space probe and mission concept for exploration of multiple Near-Earth asteroids.",
        "Updated spacecraft mass, power and cost budgets to support feasibility assessment and configuration trades."
      ]
    }
  ],

  education: [
    {
      degree: "Master’s Degree in Industrial Mathematics",
      institution: "Universidad Politécnica de Madrid",
      dates: "September 2024 — February 2027",
      details: [
        "Ordinary and partial differential equations, dynamical systems, physical-system stability and bifurcation analysis with MatCont.",
        "Multidisciplinary Design Optimization with MATLAB: highest distinction, 10/10.",
        "COMSOL Multiphysics and numerical methods for modelling and simulation."
      ]
    },
    {
      degree: "Bachelor’s Degree in Aerospace Engineering",
      institution: "Universidad Politécnica de Madrid",
      dates: "September 2018 — September 2023",
      details: [
        "Control theory, optimisation, numerical methods, flight and orbital mechanics, composite materials and engineering graphics.",
        "Bachelor’s thesis: ORBITMiNER: grade 10/10."
      ]
    }
  ],

  workshops: [
    {
      title: "ESA Academy Concurrent Engineering Workshop 2025",
      organisation: "European Space Agency",
      location: "ESEC-Galaxia, Belgium",
      dates: "September 2025",
      points: [
        "Participated in a Phase 0 study of the JAMS solar-sail Jupiter flyby mission inside ESA’s educational Concurrent Design Facility.",
        "Worked in the AOCS team, analysing torques and moments of inertia across mission phases and assessing actuator options for pointing and manoeuvrability.",
        "Used concurrent-engineering methods and CDP4-COMET while iterating interfaces with other subsystem teams."
      ]
    },
    {
      title: "Introduction to Space Mining",
      organisation: "Universidad Politécnica de Madrid",
      location: "Madrid, Spain",
      dates: "April — May 2021",
      points: [
        "Studied space-mining challenges, extraction and transport concepts, and mission-design considerations.",
        "Collaborated on a conceptual asteroid-mining mission covering target selection, resource assessment and risk analysis, then presented the proposal."
      ]
    }
  ],

  publications: [
    {
      title: "JAMS: Jupiter Analyzer of Magnetosphere with Solar Sailing",
      venue: "5th Symposium on Space Educational Activities",
      date: "April 2026",
      role: "Contributor",
      status: "Poster presented",
      summary: "Contributed to the AOCS team during ESA Academy’s Concurrent Engineering Workshop by analysing torques and moments of inertia across mission phases and assessing actuator options for pointing and manoeuvrability.",
      link: "",
      linkLabel: ""
    },
    {
      title: "Scientifically Grounded Lunar Terrain Generation for High-Fidelity Rover Perception and Navigation Simulation",
      venue: "i-SAIRAS/iSpaRo 2026",
      date: "November 2026",
      role: "Co-author",
      status: "Selected for presentation",
      summary: "Contributed the terrain-generation module, including crater, ejecta and rock-placement modelling, co-registered analysis layers and comparison with lunar-surface literature.",
      link: "",
      linkLabel: ""
    },
    {
      title: "Development of an Improved Random Positioning Machine to Simulate Organic Growth in Microgravity",
      venue: "73rd International Astronautical Congress (IAC)",
      date: "September 2022",
      role: "Co-author",
      status: "Conference contribution presented at IAC",
      summary: "Co-authored work on rotational-pattern design for microgravity simulation, focused on residual acceleration and simulation fidelity.",
      link: "",
      linkLabel: ""
    },
    {
      title: "Literature Studies and Experimental Characterization of Multiple Solid Propellant Regression Rates Using Crawford Bomb Method",
      venue: "71st International Astronautical Congress (IAC)",
      date: "October 2020",
      role: "Co-author",
      status: "Published conference paper",
      summary: "Contributed to experimental characterisation of solid-propellant mixtures through Crawford bomb measurements.",
      link: "https://www.researchgate.net/publication/358892861_Literature_Studies_and_Experimental_Characterization_of_multiple_Solid_Propellant_Regression_Rates_using_Crawford_Bomb_Method",
      linkLabel: "View publication"
    }
  ],

  skills: [
    {
      title: "Modelling",
      items: ["MATLAB", "COMSOL Multiphysics", "Simulink", "Unreal Engine 5", "ROS 2", "MatCont"]
    },
    {
      title: "Optimisation",
      items: ["Multidisciplinary design optimisation", "Genetic algorithms", "Latin hypercube sampling", "Sensitivity analysis", "Pearson correlation"]
    },
    {
      title: "Programming",
      items: ["Python", "Fortran", "LaTeX"]
    },
    {
      title: "Aerospace",
      items: ["Orbital mechanics", "Flight mechanics", "Automatic control", "AOCS sizing", "Mission analysis", "CDP4-COMET"]
    },
    {
      title: "Verification",
      items: ["JPL ephemerides", "DEM ray tracing", "Literature comparison", "Requirements review", "Test-plan review", "OUNPPM", "NAVTOOLS"]
    },
    {
      title: "Languages",
      items: ["Spanish: Native", "English:C1 Advanced"]
    }
  ]

};
