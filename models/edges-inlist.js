const main = ({ draw, drawRectangle, Plane, makeOffset,makeSolid }, {}) => {

let baseBox = drawRectangle(40,80).sketchOnPlane("XY")
baseBox = baseBox.extrude(20)
let box = baseBox
let edgesAll = baseBox.edges
box = baseBox.fillet(3,e=>e.inList(edgesAll))



return box  
}