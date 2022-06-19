const main = ({ Sketcher, sketchRectangle }) => {
  
    const sketch = new Sketcher("XZ")
    .hLine(25)
    .halfEllipse(0, 40, 15, true)
    .hLine(-25)
    .close()

    let base = sketch.clone().revolve([0, 0, 1]);

  const hole = new Sketcher()
    .quadraticBezierCurveTo([0, 20], [20, 30])
    .closeWithMirror()
    .extrude(40)
    .translateY(-12);

  
  let cutter = sketchRectangle(40,40).extrude(40).translate([20,-20,0])  
  let revolveShape = base.cut(cutter)

  return [{shape:revolveShape},{shape:sketch.extrude(0.1),color:"lightgrey"}]
};
