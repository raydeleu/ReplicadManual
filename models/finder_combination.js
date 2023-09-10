const { drawRoundedRectangle, EdgeFinder, combineFinderFilters } = replicad;
const main = () => {
  const [filters] = combineFinderFilters([
    {
      filter: new EdgeFinder().inDirection("Z"),
      radius: 10,
    },
    {
      filter: new EdgeFinder().parallelTo("XY"),
      radius: 9.99999,
    }
    
  ]);

  return drawRoundedRectangle(30, 50)
    .sketchOnPlane()
    .extrude(20)
    .fillet(filters);
};
