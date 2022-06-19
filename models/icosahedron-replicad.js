function projectOnSphere(radius, vertex) {
  // function to project a vertex on to a sphere with radius "radius"
  let x = vertex[0];
  let y = vertex[1];
  let z = vertex[2];
  let currentRadius = Math.sqrt(
    Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)
  );
  let scale = radius / currentRadius;
  let scaledVertex = [scale * x, scale * y, scale * z];
  return scaledVertex;
}

const icosahedronFaces = (radius) => {
  let golden = (1 + Math.sqrt(5)) / 2;

  let v = [
    // vertices determined by 4 rectangles
    projectOnSphere(radius, [-1, golden, 0]),
    projectOnSphere(radius, [1, golden, 0]),
    projectOnSphere(radius, [-1, -golden, 0]),
    projectOnSphere(radius, [1, -golden, 0]),

    projectOnSphere(radius, [0, -1, golden]),
    projectOnSphere(radius, [0, 1, golden]),
    projectOnSphere(radius, [0, -1, -golden]),
    projectOnSphere(radius, [0, 1, -golden]),

    projectOnSphere(radius, [golden, 0, -1]),
    projectOnSphere(radius, [golden, 0, 1]),
    projectOnSphere(radius, [-golden, 0, -1]),
    projectOnSphere(radius, [-golden, 0, 1]),
  ];

  // faces added so that they always have an edge in common
  // with the previous ones
  return [
    [v[0], v[11], v[5]],
    [v[0], v[5], v[1]],
    [v[0], v[10], v[11]],
    [v[0], v[7], v[10]],
    [v[5], v[11], v[4]],
    [v[4], v[9], v[5]],
    [v[3], v[9], v[4]],
    [v[3], v[8], v[9]],
    [v[3], v[6], v[8]],
    [v[3], v[2], v[6]],
    [v[6], v[2], v[10]],
    [v[10], v[7], v[6]],
    [v[8], v[6], v[7]],
    [v[0], v[1], v[7]],
    [v[1], v[5], v[9]],
    [v[11], v[10], v[2]],
    [v[7], v[1], v[8]],
    [v[3], v[4], v[2]],
    [v[2], v[4], v[11]],
    [v[9], v[8], v[1]],
  ];
};

const main = (
  { makeSolid, sketchRoundedRectangle, makeSphere, makePolygon },
  {}
) => {
  function makeIcosahedron(radius) {
    const faces = icosahedronFaces(radius).map((f) => makePolygon(f));
    return makeSolid(faces);
  }

  // draw the isosphere
  const icosahedron = makeIcosahedron(2.0).scale(50);
  const box = sketchRoundedRectangle(200, 200)
    .extrude(200)
    .translate([100, 100, 0]);
  const sphere = makeSphere(100).translate([50, 30, 20]);

  return box.cut(sphere).cut(icosahedron.translate([20, 20, 220]));
};
