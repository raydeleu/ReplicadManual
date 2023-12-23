const {Sketcher,genericSweep,makeHelix,drawRectangle,assembleWire} = replicad

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

  const path2 = assembleWire(path1.wires) 
  const swp3 = path1.sweepSketch((plane,origin)=>sketchRectangle(1,1,{plane,origin}))
    
  shapes.push(swp3)

  return shapes
}