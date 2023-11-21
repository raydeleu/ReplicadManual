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



return [{shape: squircle, color:"blue"},{shape: roundedRectangle,color:"red"}
]}