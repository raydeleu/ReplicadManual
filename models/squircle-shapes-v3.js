// Demonstration of tangent chain 
const {draw,drawRoundedRectangle} = replicad

function main(){

let length = 100
let width = 60
let radius = 10

let squircleCorner = draw([0,0])
.lineTo([1,0])
.bezierCurveTo([0,1],[
[1,0.315105420],
[1,0.587071903],
[1,0.830279200],
[0.830279200,1],
[0.587071903,1],
[0.315105420,1]])
.close()
.stretch(radius,[1,0],[0,0])
.stretch(radius,[0,1],[0,0])


let sC = squircleCorner.clone()

let cTopRight = sC.clone()
let cTopLeft  = cTopRight.clone().mirror([0,1],[0,0],"plane")
let cBottomLeft  = cTopLeft.clone().mirror([1,0],[0,0],"plane")
let cBottomRight  = cTopRight.clone().mirror([1,0],[0,0],"plane")
let squircle = cTopRight
.fuse(cTopLeft)
.fuse(cBottomLeft)
.fuse(cBottomRight)

let roundedRectangle = drawRoundedRectangle(20,20,5.4)
let f = 2.58

let smoothSpline = draw([10,0])
.smoothSpline(-10,10,{startTangent:90,startFactor:f,endTangent:180,endFactor:f})
.smoothSpline(-10,-10,{startTangent:180,startFactor:f,endTangent:270,endFactor:f})
.smoothSpline(10,-10,{startTangent:270,startFactor:f,endTangent:0,endFactor:f})
.smoothSpline(10,10,{startTangent:0,startFactor:f,endTangent:90,endFactor:f})
.close()

squircle=squircle.sketchOnPlane("XY").extrude(6).fillet(0.5)
roundedRectangle=roundedRectangle.sketchOnPlane("XY").extrude(3).fillet(0.5)
smoothSpline=smoothSpline.sketchOnPlane("XY").extrude(9).fillet(0.5)

return [
  {shape: squircle, color:"blue"},
  {shape: roundedRectangle,color:"red"},
  {shape: smoothSpline, color: "darkgrey"}
]}