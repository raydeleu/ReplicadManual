const {draw,makeCircle,makeFace,makeNonPlanarFace,assembleWire,makeOffset,makePolygon} = replicad

function main()
{

let edgeDraw = draw().hLine(100).vLine(40).hLine(-100).close()
console.log(edgeDraw)  // innerShape
let edgeLine = edgeDraw.translate([0,20]).sketchOnPlane("XY")
console.log(edgeLine)  // wire, but is visible as a face ??? 
//let edgeOffset = makeOffset(edgeLine,5)
let edgeSolid = edgeLine.clone().extrude(20) 
console.log(edgeSolid) // solid, extruding a wire should yield a shell ??? 
let bigSolid = makeOffset(edgeSolid,5)
let smallSolid = makeOffset(bigSolid,-4.99)
console.log(bigSolid)
console.log(smallSolid)

let circleWire = makeCircle(10)
console.log(circleWire) // Edge, cannot be extruded ???
let circleWire2 = makeCircle(40).translate([0,0,50])

//let circle = makeFace(circleWire)  // cannot be turned into face
let bulge = makeNonPlanarFace(circleWire)
console.log(bulge)
// let cylinder = circleWire.extrude(40)
let definedFace = makePolygon([[0,0,0],[100,0,0],[100,40,0],[0,40,0]])
console.log(definedFace)   // face
let offsetFromFace = makeOffset(definedFace,10)
console.log(offsetFromFace) // shell ! 



return [
{shape: edgeDraw},  // drawing = innershape
{shape: edgeLine},  // drawing on plane = wire
//{shape: edgeFace},
{shape: edgeSolid}, // extruded drawing = extruded wire = solid ? 
{shape: bigSolid},  // offset of solid is solid
{shape: circleWire}, // edge
{shape: bulge},      // face
{shape: definedFace}, // face
{shape: offsetFromFace} //shell

]

}