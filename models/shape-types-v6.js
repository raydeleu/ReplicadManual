const { draw, drawCircle, assembleWire, makeFace, drawRectangle} = replicad;

const main = () => {

let line = draw().hLine(100).close().sketchOnPlane("XY")
let face = line.extrude(40,{extrusionDirection: [0,0,1]})
//let solid = face.extrude(20,{extrusionDirection: [0,1,0]})
console.log(face)
let edges = face.edges
console.log(edges)
let wire = assembleWire(edges)
console.log(wire)
// let block = wire.extrude(20)
let rectangle=drawRectangle(100,40)
console.log(rectangle)
let rectangleEdge = rectangle.sketchOnPlane("XY")
console.log(rectangle)
let block = rectangleEdge.extrude(40)
console.log(block)

return block

}