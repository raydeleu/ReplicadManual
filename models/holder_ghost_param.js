
const r = replicad

const main = () => {

  let lx = 45.25    // width of gns receiver
  let ly = 79.25;   // length of gns receiver
  let lz = 11.4;    // thickness of gns receiver
  let lt = 0.5 ;    // tolerance for fit around the receiver    
  let th = 2   ;    // thickness of holder around the receiver
  
  let wholder = 20  ;    // width of lanyard holder
  let yholder = 10  ;    // amount that holder sticks out of body
  let rlanhol = 2   ;    // radius of lanyard hole
  let ycut   = 0.6  ; // portion of side length to be cut
  let rlandist = 7  ; // distance between two holes for lanyard, set to 0 for single hole  

  // add tolerances to the dimensions of object to be held
  lx = lx + lt; 
  ly = ly + lt;
  lz = lz + lt; 

  // shape of GNS receiver
  let receiver = r.makeBaseBox(lx,ly,lz)
  .fillet(((lz-lt)/2),(e)=>e.inDirection("Y"))
  .translate([0,th,th])

  // shape of object to be held, length increased to cut upper part
  let hollow = r.makeBaseBox(lx,ly+2*th,lz)
  .fillet(((lz-lt)/2),(e)=>e.inDirection("Y"))
  .translate([0,th,th])

  // shape of holder
  let shape = r.makeBaseBox(lx+2*th,ly+2*th,lz+2*th)
  .fillet((lz+2*th-lt)/2,(e)=>e.inDirection("Y"))

  let lanyardholder = r.makeBaseBox(wholder,ly+(2*th),th).translate([0,yholder,0])
  shape = shape.fuse(lanyardholder)
  
  // define two objects to cut away parts of the holder
  let cutter = r.makeBaseBox(lx*1.2,ly*ycut,lz*2).translate([0,0,2*th])
  cutter = cutter.fillet(5,(e)=>e.inDirection("X"))
  let cutterTop = r.makeBaseBox(lx*1.2,ly*1.2,lz).translate([0,0,(lz+2*th)*0.87])

  // create hollow holder with cutout on side
  let shape1 = shape.cut(hollow)
  let shapeUnrounded = shape1.cut(cutter)

  // now round the outer edge of the cutout
  // do this first as in this state you can select a complete loop with one point
  let shapeRounded = shapeUnrounded
  .fillet(1.0,(e)=>e.containsPoint([0, ly*ycut/2 , lz+2*th]))

  // to round the holder for the lanyard we combine two finders 
  // selecting first the edges in the z direction and the out of 
  // these only select the ones at the proper distance
  shapeRounded = shapeRounded.fillet(0.8*wholder/2,(e)=>e.inDirection("Z").inPlane("XZ",-(((ly+2*th)/2)+yholder)))
 
  let lanyardCutterL = r.makeCylinder(rlanhol,th*4,[rlandist/2,ly/2+yholder/2+th,-2*th],[0,0,1])
  let lanyardCutterR = r.makeCylinder(rlanhol,th*4,[-rlandist/2,ly/2+yholder/2+th,-2*th],[0,0,1])
  shapeRounded = shapeRounded.cut(lanyardCutterL)
  shapeRounded = shapeRounded.cut(lanyardCutterR)

  // now cut the top part of the holder 
  // as this overhang is difficult for the 3D printer,
  // then  round all remaining edges with a smaller radius
  shapeRounded = shapeRounded.cut(cutterTop).fillet(0.6)

  let shapeArray = 
  [ 
  {shape: receiver, name: "receiver", color: "dimgrey", opacity: 0.8},   
  {shape: shapeRounded, name: "holder", color: "steelblue", opacity: 1.0},
  ]
    
return shapeArray
  
  }

// colors for workbench 
// black
// grey
// dimgrey
// slategrey
// lightslategrey
// steelblue
// lightsteelblue
// red
// green
// violet
// silver
// skyblue
// magenta
// mediumpurple

