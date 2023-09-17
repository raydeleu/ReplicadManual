
const r = replicad

const { drawRoundedRectangle, EdgeFinder} = replicad;
const main = () => {

  let shape = r.makeBaseBox(50,100,20).fillet(9.5,(e)=>e.inDirection("Y"))
  let hollow = r.makeBaseBox(46,100,16)
  .fillet(7.5,(e)=>e.inDirection("Y"))
  .translate(0,2,2)
  let cutter = r.makeBaseBox(60,75,30).translate([0,0,4]).fillet(5,(e)=>e.inDirection("X"))

  let shape1 = shape.cut(hollow)
  let shapeUnrounded = shape1.cut(cutter)
  let shapeRounded = shapeUnrounded
  .fillet(1.0,(e)=>e.containsPoint([-15.50, 37.50, 20.00]))
  .fillet(0.4)
  // let shapeRounded = shapeUnrounded.fillet(0.8,(e)=>e.containsPoint([-23.25, -32.50, 4.00]))
  
  
  let shapeArray = 
  [  
  {shape: shapeUnrounded, color: "grey", name: "shapeUnrounded"},
  {shape: shapeRounded, color: "slategrey", name: "shapeRounded"}
  ]
    
return shapeArray
  

  }
