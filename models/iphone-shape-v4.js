// Demonstration of tangent chain 
const {draw,drawRoundedRectangle,drawRectangle} = replicad

function main(){

let length = 146.7
let width = 71.5
let radius = 20
let thickness = 7.4

function iPhoneTopView(length,width,radius)
{
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
.translate(width/2-radius,length/2-radius)

let sC = squircleCorner.clone()

let cTopRight = sC.clone()
let cTopLeft  = cTopRight.clone().mirror([0,1],[0,0],"plane")
let cBottomLeft  = cTopLeft.clone().mirror([1,0],[0,0],"plane")
let cBottomRight  = cTopRight.clone().mirror([1,0],[0,0],"plane")
let lengthBox = drawRectangle(width,length-2*radius)
let widthBox = drawRectangle(width-2*radius,length).fuse(lengthBox)
let squircle = cTopRight.fuse(widthBox)
.fuse(cTopLeft)
.fuse(cBottomLeft)
.fuse(cBottomRight)
return squircle
}



let iPhone = iPhoneTopView(length,width,radius).sketchOnPlane("XY").extrude(thickness).fillet(0.5)





let roundedRectangle = drawRoundedRectangle(width,length,radius*0.55)
let f = 2.58

let smoothSpline = draw([10,0])
.smoothSpline(-10,10,{startTangent:90,startFactor:f,endTangent:180,endFactor:f})
.smoothSpline(-10,-10,{startTangent:180,startFactor:f,endTangent:270,endFactor:f})
.smoothSpline(10,-10,{startTangent:270,startFactor:f,endTangent:0,endFactor:f})
.smoothSpline(10,10,{startTangent:0,startFactor:f,endTangent:90,endFactor:f})
.close()

//squircle=squircle.sketchOnPlane("XY").extrude(6).fillet(0.5)
roundedRectangle=roundedRectangle.sketchOnPlane("XY",8).extrude(thickness).fillet(0.5)
smoothSpline=smoothSpline.sketchOnPlane("XY").extrude(9).fillet(0.5)

return [
  {shape: iPhone, color:"blue"},
  {shape: roundedRectangle,color:"red"},
  {shape: smoothSpline, color: "darkgrey"}
]}