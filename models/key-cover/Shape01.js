
const { draw } = replicad;

const main = () => {
  
  let p0 = [0,42]
  let p1 = [40,41]
  let p2 = [88,28];
  let p3 = [70
  ,0]
  let p4 = [6,0] 

  const topView = 
  draw(p0)
    .sagittaArcTo(p2,3)
    .customCorner(4)
    .lineTo(p3)
    .customCorner(25)
    .lineTo(p4)
    .customCorner(8)
    .closeWithCustomCorner(5);

  let contour = topView.sketchOnPlane("XY")

let fob = contour.extrude(0.5)

return [ { shape: fob, color: "blue" }]} 