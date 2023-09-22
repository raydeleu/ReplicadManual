// Experiment to create a holder for GPS Receiver
// added code to create honeycomb pattern 
// within a rectangular shape

const r = replicad

const main = () => {

  // Dimensions of the GPS receiver
  let lx = 45.25;      // width of gns receiver
  let ly = 79.25;      // length of gns receiver
  let lz = 11.4;       // thickness of gns receiver
  let lt = 0.5 ;       // tolerance for fit around the receiver    
  
  let th = 2   ;       // thickness of holder around the receiver
  let wholder = 20  ;    // width of lanyard holder
  let yholder = 10  ;    // amount that holder sticks out of body

  let rlanhol = 2   ;    // radius of lanyard hole
  let ycut    = 0.6  ; // portion of side length to be cut

  let rlandist = 0  ; // distance between two holes for lanyard, set to 0 for single hole  
  
  // code to create a hexagon face 
  function Hexagon(size)
  { 
    let sketchHexagon 
    for(let i = 0 ; i <= 5 ; i += 1)
    {
        const angle = i * 2 * Math.PI / 6
        const xvalue = size * Math.cos(angle);
        const yvalue = size * Math.sin(angle);
        const point = [xvalue,yvalue];

        if (i === 0){
            sketchHexagon = new r.Sketcher("XY",-1).movePointerTo(point)
        }
        else {
            sketchHexagon.lineTo(point)
        }    
    }
    return sketchHexagon.close()
    }

    // code to create a hexagonal column, adding height to hexagon face
    function hexColumn(size,height)
    {
      return Hexagon(size).extrude(height);
    }

  // add tolerances to the dimensions of object to be held
  lx = lx + lt; 
  ly = ly + lt;
  lz = lz + lt; 

  // shape of GNS receiver
  let receiver = r.makeBaseBox(lx,ly,lz)
  .fillet(((lz-lt)/2),(e)=>e.inDirection("Y"))
  .translate([0,0,th])

  // shape of object to be held, length increased to cut upper part
  let hollow = r.makeBaseBox(lx,ly+2*th,lz)
  .fillet(((lz-lt)/2),(e)=>e.inDirection("Y"))
  .translate([0,th,th])

  // shape of holder, selected only top edges for filleting
  // so that the bottom is flat, which is better for 3D printing without supports
  let shape = r.makeBaseBox(lx+2*th,ly+2*th,lz+2*th)
  .fillet((lz+2*th-lt)/2,(e)=>e.inDirection("Y").inPlane("XY",lz+2*th))

  // create a lip on the holder to attach it to a lanyard
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

  // to round the lip for the lanyard we combine two finders 
  // selecting first the edges in the z direction,  out of 
  // these only select the ones at the proper distance
  shapeRounded = shapeRounded.fillet(8,(e)=>e.inDirection("Z").inPlane("XZ",-(((ly+2*th)/2)+yholder)))
 
  // punch two holes in the lip, with distance rlanhol 0 it becomes one hole
  let lanyardCutterL = r.makeCylinder(rlanhol,th*4,[rlandist/2,ly/2+yholder/2+th,-2*th],[0,0,1])
  let lanyardCutterR = r.makeCylinder(rlanhol,th*4,[-rlandist/2,ly/2+yholder/2+th,-2*th],[0,0,1])
  shapeRounded = shapeRounded.cut(lanyardCutterL)
  shapeRounded = shapeRounded.cut(lanyardCutterR)

  // now cut the top part of the holder 
  // as a closed shape is difficult for the 3D printer,
  // then  round all remaining edges with a smaller radius
  // used a chamfer instead of fillet(0.6)
  shapeRounded = shapeRounded.cut(cutterTop).chamfer(0.4)

  // dimensions of honeycomb grid 
  let hc_width  = 35;
  let hc_length = 65;
  let hc_depth  = 10;  
  // note that hexagons are defined at plane XY, -1

  // number of rows and columns from center of rectangle 
  let rowNumber = 5;
  let colNumber = 2;
  // cellsize and wallthickness of honeycomb 
  let wallThickness = 1;
  let cellSize = 5;
    
  let deg30 = Math.PI / 6
  let delta_x = (1+Math.sin(deg30)) * cellSize + wallThickness*Math.cos(deg30)
  let delta_y = 0.5*wallThickness + Math.cos(deg30)*cellSize

 
  let point = [];
  let cutColumn;
  
  for(let rowCount = 1 ; rowCount <= rowNumber; rowCount += 1)
    {
      for (let colCount = 1 ;  colCount <= colNumber ; colCount += 1)
          {
          // two cells are defined and then replicated in each quadrant 
          // around the center of the grid, so 8 holes are defined each time 
          // This way the grid is always nicely symmetrical. 
          point[1] = [(colCount-1) * 2 * delta_x,(rowCount-1) * delta_y * 2 ,0];
          point[2] = [-(colCount-1) * 2 * delta_x,(rowCount-1) * delta_y * 2 ,0];
          point[3]= [(colCount-1) * 2 * delta_x,-(rowCount-1) * delta_y * 2 ,0];
          point[4] = [-(colCount-1) * 2 * delta_x,-(rowCount-1) * delta_y * 2 ,0];
          point[5] = [(((colCount-1)*2)+1) * delta_x, (rowCount-1)*delta_y*2+delta_y,0];  
          point[6] = [(((colCount-1)*2)+1) * -delta_x, (rowCount-1)*delta_y*2+delta_y,0];
          point[7] = [(((colCount-1)*2)+1) * delta_x, -(rowCount-1)*delta_y*2+delta_y,0];
          point[8] = [(((colCount-1)*2)+1) * -delta_x, -(rowCount-1)*delta_y*2+delta_y,0];
          for (let j=1; j<=8; j+=1)
            { 
              cutColumn = hexColumn(cellSize,5*th).translate(point[j]);
              // the defined column is intersected with a box to limit the grid 
              // within a rectangular shape
              cutColumn = cutColumn.intersect(r.makeBaseBox(hc_width,hc_length,hc_depth)) 
              shapeRounded = shapeRounded.cut(cutColumn);
            }
          }
    }
  
  let shapeArray = 
  [ 
  {shape: receiver, name: "receiver", color: "dimgrey", opacity: 0.8},   
  {shape: shapeRounded, name: "holder", color: "steelblue", opacity: 1.0}
  ]
    
return shapeArray
  
}
