# Lunar solar-panel project media

These files are used by the `lunar-solar` entry in `data/portfolio-data.js`.

- `shadow-map.webp` — actual binary illumination output for a Lunar X terrain region; white is illuminated and black is shadow.
- `model-overview.webp` — simplified simulator chain from design variables and parameters to the objective value.
- `model-architecture.webp` — detailed block diagram of solar geometry, DEM ray tracing, temperature, panel efficiency, irradiance and energy aggregation.

The project entry is based on the supplied simulator chapter and reports:

- latitude and longitude as design variables;
- one-hour evaluation steps over a year;
- SLDEM2015 topography;
- solar-geometry and terrain-shadow calculations;
- temperature-dependent CTJ30 panel efficiency;
- validation against JPL ephemeris data and model-behaviour checks;
- a 40-point Latin hypercube design experiment and Pearson correlation analysis.

Keep the filenames unchanged unless you also update the paths in `data/portfolio-data.js`.
