const main = ({ Sketcher }) => {
  
    const base = new Sketcher("XZ")
    .hLine(-25)
    .halfEllipse(0, 40, 5, true)
    .hLine(25)
    .close()
    .revolve([0, 0, 1]);

  const hole = new Sketcher()
    .quadraticBezierCurveTo([0, 20], [20, 30])
    .closeWithMirror()
    .extrude(40)
    .translateY(-12);

  return base.cut(hole);
};
