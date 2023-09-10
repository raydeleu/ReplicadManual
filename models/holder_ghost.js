const r = replicad

const { drawRoundedRectangle, EdgeFinder} = replicad;
const main = () => {

  // shape of holder
  let shape = r.makeBaseBox(50,100,20).fillet(9.5,(e)=>e.inDirection("Y"))
  let lanyardholder = r.makeBaseBox(20,100,2).translate([0,10,0])
  shape = shape.fuse(lanyardholder)
  
  // shape of object to be held
  let hollow = r.makeBaseBox(46,100,16)
  .fillet(7.5,(e)=>e.inDirection("Y"))
  .translate(0,2,2)
  
  // define two objects to cut away parts of the holder
  let cutter = r.makeBaseBox(60,60,30).translate([0,0,4]).fillet(5,(e)=>e.inDirection("X"))
  let cutterTop = r.makeBaseBox(60,120,20).translate([0,0,17])

  // create hollow holder with cutout on side
  let shape1 = shape.cut(hollow)
  let shapeUnrounded = shape1.cut(cutter)

  // now round the outer edge of the cutout
  // do this first as in this state you can select a complete loop with one point
  let shapeRounded = shapeUnrounded
  .fillet(1.0,(e)=>e.containsPoint([-15.50, 30.00 , 20.00]))

  // now cut the top part of the holder 
  // as this is difficult for the 3D printer,
  // then  round all remaining edges with a smaller radius
  shapeRounded = shapeRounded.fillet(8,(e)=>e.inDirection("Z").inPlane("XZ",-60))
 
  let lanyardCutterL = r.makeCylinder(2,20,[3.5,53,-5],[0,0,1])
  let lanyardCutterR = r.makeCylinder(2,20,[-3.5,53,-5],[0,0,1])
  shapeRounded = shapeRounded.cut(lanyardCutterL)
  shapeRounded = shapeRounded.cut(lanyardCutterR)

  shapeRounded = shapeRounded.cut(cutterTop).fillet(0.6)


  let shapeArray = 
  [  
  {shape: shapeUnrounded, color: "grey", name: "shapeUnrounded"},
  {shape: shapeRounded, color: "slategrey", name: "shapeRounded"}
  ]
    
return shapeArray
  

  }
