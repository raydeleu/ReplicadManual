const main = ({ draw, drawRoundedRectangle }) => {
  const shape = drawRoundedRectangle(20, 30, 5).sketchOnPlane().extrude(10);

  return [
    { shape: shape, name: "purple shape", color: "purple" },
    {
      shape: shape.clone().translateZ(15),
      color: "steelblue",
      name: "blue shape",
    },
    {
      shape: shape.clone().translateZ(30),
      color: "orange",
      name: "orange shape",
    },
  ];
};