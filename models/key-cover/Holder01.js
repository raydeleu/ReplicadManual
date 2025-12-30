
const { draw, 
makeOffset, 
makeBaseBox, 
makeSolid,
translateY,
translateZ } = replicad;

const main = () => {
  
  let p0 = [0,42]
  let p1 = [40,41]
  let p2 = [88,28];
  let p3 = [69,0]
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

  let topViewHolder = topView.clone().offset(2)

  let contour = topView.sketchOnPlane("XY")
  let contourHolder = topViewHolder.sketchOnPlane("XY")

let fob = contour.extrude(14.5)
fob = fob.fillet(3)

let holder = contourHolder.extrude(18.5).fillet(2)
holder = holder.translateZ(-2)

let cutter = makeBaseBox(200,50,14.5).fillet(3)
cutter = cutter.translateY(25)
cutter = cutter.translateX(80)
cutter = cutter.translateZ(0)

holder = holder.cut(cutter)

return [ 
  // { shape: fob, color: "blue" }, 
  {shape:holder}]} 