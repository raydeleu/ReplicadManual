const {drawSingleCircle, draw} = replicad

function main()
{
let circleRight = drawSingleCircle(150).translate(150-(86.5/2)-13.4,0)
let circleLeft = drawSingleCircle(150).translate(-150+(86.5/2)+13.4,0)
let circleTop = drawSingleCircle(380).translate(0, -380+(51.2/2)+13.4)
let circleBottom = drawSingleCircle(380).translate(0, +380-(51.2/2)-13.4)

let youTubeLogo = circleRight.intersect(circleLeft).intersect(circleBottom).intersect(circleTop)
youTubeLogo = youTubeLogo.sketchOnPlane("XY").extrude(20)
youTubeLogo = youTubeLogo.fillet(13.4,(e)=>e.inDirection("Z")).fillet(5)

let arrow = draw([-14,-35.6/2])
.polarLine(35.6,30)
.polarLine(35.6,150)
.close()
.sketchOnPlane("XY",20).extrude(-5)

youTubeLogo = youTubeLogo.cut(arrow.clone())
arrow = arrow.translate(0,0,-0.5)

return [
{shape: youTubeLogo, color: "red"},
{shape: arrow, color: "white"}
] }