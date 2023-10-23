const {draw, EdgeFinder} = replicad

function main()
{
let rectangleSketch = draw().hLine(75).vLine(40).hLine(-75).close()
rectangleSketch = rectangleSketch.sketchOnPlane("XY")
let box = rectangleSketch.extrude(20)

let selectedEdges = new EdgeFinder().inDirection("X").inPlane("XY",20)
let frontEdges = new EdgeFinder().inPlane("YZ",0).not((e)=>e.inPlane("XY"))

box = box.fillet(5,test=>selectedEdges)
box = box.fillet(2,test=>frontEdges)

return box}