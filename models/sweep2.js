const {Sketcher,genericSweep,
sketchRectangle,
makeHelix,
drawRectangle,
assembleWire,
sketchFaceOffset} = replicad

const wireSize = 5
const wireGap = 0.5
const innerRadius = 10
const vertTurns = 1

const main = () => {
  const shapes = []

  const path1 = makeHelix(2*(wireSize+wireGap), 2*vertTurns*(wireSize+wireGap), innerRadius)
  const outline = drawRectangle(1,1).translate([10,0]).sketchOnPlane('XZ')
  //outline = outline.translate([0,10,0])
  const swp1 = genericSweep(
    outline.wire,
    assembleWire(path1.wires),
    { forceProfileSpineOthogonality: false },
    false,
  )
  shapes.push(swp1)
  
  const swp2 = genericSweep(
    outline.wire,
    assembleWire(path1.wires),
    { forceProfileSpineOthogonality: false },
    false,
  ).rotate(180, [0,0,0], [0,0,1])
  shapes.push(swp2)

let thread=[]
let face
let wire
for (let h = 1; h <= 360; h++)
{
    face = sketchRectangle(1,1,'XZ',[0,0,0]).face().translate([10,0,10/360*h]).rotate(h/360,[0,0,0],[0,0,1])
    wire = sketchFaceOffset(face,0)
    thread.push(wire)
}

let completeThread = sketchRectangle(1,1,'XZ',[0,0,0]).loftWith(thread)

  // const path2 = assembleWire(path1.wires) 
  // const swp3 = path1.sweepSketch((plane,origin)=>sketchRectangle(1,1,{plane,origin}))
    
  // shapes.push(swp3)

// function hackHelix(shape,
// {diameter = 10,
// pitch = 1.5,
// rotations = 5,
// divisions =360} = {})
// {
// // OpenCascade does not contain a standard helix function but requires the programmer to project
// // a straight line on the surface of a cylinder.
// // see https://dev.opencascade.org/doc/overview/html/occt__tutorial.html#sec4
// // This is a completely different and easier approach using the loft function
// const degIncrement = 360/divisions
// const heightIncrement = pitch/divisions
// const circumferance = diameter*Math.PI
// const rad2Deg = num => num*180/Math.PI
// const pitchAngle = rad2Deg(Math.atan(pitch/circumferance))

// const loftWires = Array.from({length: divisions*rotations+1}).map(
//         (_, index) => Rotate([0,0,-1], index*degIncrement,
//                     Translate([0,diameter/2,index*heightIncrement],
//                     Rotate([0,1,0], 90,
//                     Rotate([0,-1,0], pitchAngle, shape)))))
//     return Loft(loftWires)
// }













  return shapes
}