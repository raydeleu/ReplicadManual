
const { draw, 
makeOffset, 
makeBaseBox, 
makeSolid,
translateY,
translateZ,
makeCylinder } = replicad;

const main = () => {
  
  let p0 = [0,42]
  let p1 = [40,41]
  let p2 = [88,28];
  let p3 = [69,0]
  let p4 = [6,0] 

  let wallThickness = 4;
  let fobThickness = 14.5

  const topView = 
  draw(p0)
    .sagittaArcTo(p2,3)
    .customCorner(4)
    .lineTo(p3)
    .customCorner(25)
    .lineTo(p4)
    .customCorner(8)
    .closeWithCustomCorner(5);

  let topViewHolder = topView.clone().offset(wallThickness)

  let contour = topView.sketchOnPlane("XY")
  let contourHolder = topViewHolder.sketchOnPlane("XY")

let fob = contour.extrude(fobThickness)
fob = fob.fillet(3)

let holder = contourHolder.extrude(fobThickness+2*wallThickness)
holder = holder.translateZ(-wallThickness)

let cutter = makeBaseBox(120,50,14.5).fillet(3)
cutter = cutter.translateY(26)
cutter = cutter.translateX(40)
cutter = cutter.translateZ(0)

let holeCutter = makeCylinder(3,50,[8,30,-10],[0,0,1])

holder = holder.cut(cutter)
holder = holder.cut(holeCutter)
holder = holder.fillet(1.9)

return [ 
  // { shape: fob, color: "blue" }, 
  {shape:holder}
 // ,{shape:cutter, color: "red"}
 //  ,{shape:holeCutter, color: "red"}
  ]} 