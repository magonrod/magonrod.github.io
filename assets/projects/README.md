# Project media guide

The portfolio is prepared for one preview image and up to four supporting visuals per project.

## How to activate media

1. Add the file using the exact filename listed below.
2. Open `data/portfolio-data.js`.
3. Find the matching project and media item.
4. Change `enabled: false` to `enabled: true`.
5. Refresh the local preview.

Do not add decorative space images. Every visual should demonstrate the model, method, verification or result.

Recommended formats:

- still images: WebP where possible, otherwise PNG or JPG
- plots and diagrams: export at 1600 px or wider so labels remain readable
- videos: MP4 using H.264, preferably 10–20 seconds and below 20 MB
- video posters: use a WebP still frame with the same 16:9 framing
- use lowercase filenames without spaces

## 1. Lunar terrain generation

Folder: `assets/projects/lunar-terrain/`

### `preview.webp`
A clean, wide Unreal Engine view of one generated lunar environment. It should immediately show the terrain scale, crater morphology, ejecta regions and rock placement. Avoid UI panels unless they help identify the simulator.

### `terrain-flythrough.mp4`
A 10–15 second camera or rover-level fly-through. Use slow, stable movement so a reviewer can inspect the terrain rather than watching a cinematic trailer.

### `terrain-layers.webp`
A four-panel image showing the same terrain as elevation, slope, crater/ejecta classification and rock-density layers. Use identical extents and clear labels to demonstrate that the layers are co-registered.

### `validation-plot.webp`
A plot comparing generated crater-size or rock-density statistics with the target distribution taken from the lunar-surface literature. This is the strongest validation visual for the project.

### `workflow.webp`
A compact diagram: literature-derived parameters → procedural generator → terrain and analysis layers → rover simulation / synthetic sensors.

## 2. Lunar solar-panel placement simulator

Folder: `assets/projects/lunar-solar/`

The following verified project media is already included and enabled:

### `shadow-map.webp`
Actual binary illumination output for a Lunar X terrain region. White represents illuminated terrain and black represents terrain shadow. It is also used as the project-card preview.

### `model-overview.webp`
Simplified block diagram showing the design variables and parameters feeding the shadow module, panel-efficiency module and objective function.

### `model-architecture.webp`
Detailed simulator architecture covering UTC time, the SLDEM2015 terrain model, solar geometry, DEM ray tracing, temperature, efficiency, solar irradiance and annual energy aggregation.

The project section also includes the annual objective equation, design-variable bounds, hourly time resolution, terrain-data source, shadow-search radius, validation approach and the main findings from the 40-point Latin hypercube experiment.

## 3. ORBITMiNER

Folder: `assets/projects/orbitminer/`

### `preview.webp`
A clear snapshot of the final flyby sequence with moving asteroid targets, route lines and sequence numbers. Keep labels readable and avoid overcrowding.

### `route-animation.mp4`
A 10–15 second animation showing asteroid motion and the route selected by the genetic algorithm. Include a time indicator or step counter when possible.

### `algorithm-workflow.webp`
A concise genetic-algorithm diagram showing route encoding, fitness evaluation, selection, crossover, mutation and the stopping criterion.

### `convergence.webp`
Best and mean objective values across generations. Prefer several runs or heuristic configurations so the plot communicates convergence and repeatability rather than one fortunate run.

### `comparison.webp`
A comparison of routes, objective values or mission assumptions. The visual should support a specific conclusion about which heuristic or configuration performed better and under what conditions.

## 4. Random Positioning Machine

Folder: `assets/projects/rpm/`

### `preview.webp`
A photograph, CAD view or schematic of the machine with the two rotation axes clearly marked. Use a neutral background and crop tightly around the system.

### `rotation-demo.mp4`
A short video of the physical machine or an animation of the two-axis motion. The movement should be slow enough to understand how sample orientation changes.

### `gravity-vector.webp`
A 3D trace or spherical coverage plot showing how the effective gravity direction is distributed over time.

### `residual-acceleration.webp`
A residual-acceleration time history, histogram or summary plot used to evaluate microgravity fidelity.

### `algorithm-comparison.webp`
A comparison of rotational patterns using the same metrics, such as residual acceleration or gravity-vector uniformity.

## Choosing the minimum set

A strong first version only needs three pieces per project:

1. `preview.webp`
2. the short demonstration video
3. one validation or results plot

Add the method diagram and additional analysis plot later when they improve the technical story.
