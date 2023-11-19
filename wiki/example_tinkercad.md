## TinkerCad examples

In the program TinkerCad (www.tinkercad.com) you can create 3D models by combining a range of standard shapes. The image below shows some of the shapes that are offered to beginners:  

![image](https://github.com/raydeleu/ReplicadManual/assets/38007983/9df9f824-8278-409b-979f-3f39d659a04c)

Most of these shapes can be created easily in Replicad using just a combination of a 2D drawing and one of the methods offered to create 3D solids, such as `.extrude()` , `.loftWith()`, `.revolve()`. 

<img width="822" alt="image" src="https://github.com/raydeleu/ReplicadManual/assets/38007983/07cfa7f4-607a-4c84-8410-e2b679ac322d">

``` javascript
// Demonstration of creating standard shapes
// as available in AutoCad TinkerCad. 

const {draw,drawRectangle,drawCircle,drawText,
drawRoundedRectangle,
drawPolysides,
makeCylinder,makeBaseBox,makeSphere
,makeSolid,makePolygon} = replicad

function main()
{
let bDim = 10;
let hDim = 10;

function projectOnSphere(radius, vertex) {
  // function to project a vertex on to a sphere with radius "radius"
  let x = vertex[0];
  let y = vertex[1];
  let z = vertex[2];
  let currentRadius = Math.sqrt(
    Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)
  );
  let scale = radius / currentRadius;
  let scaledVertex = [scale * x, scale * y, scale * z];
  return scaledVertex;
}

const icosahedronFaces = (radius) => {
  let golden = (1 + Math.sqrt(5)) / 2;

  let v = [
    // vertices determined by 4 rectangles
    projectOnSphere(radius, [-1, golden, 0]),
    projectOnSphere(radius, [1, golden, 0]),
    projectOnSphere(radius, [-1, -golden, 0]),
    projectOnSphere(radius, [1, -golden, 0]),

    projectOnSphere(radius, [0, -1, golden]),
    projectOnSphere(radius, [0, 1, golden]),
    projectOnSphere(radius, [0, -1, -golden]),
    projectOnSphere(radius, [0, 1, -golden]),

    projectOnSphere(radius, [golden, 0, -1]),
    projectOnSphere(radius, [golden, 0, 1]),
    projectOnSphere(radius, [-golden, 0, -1]),
    projectOnSphere(radius, [-golden, 0, 1]),
  ];

  // faces added so that they always have an edge in common
  // with the previous ones
  return [
    [v[0], v[11], v[5]],
    [v[0], v[5], v[1]],
    [v[0], v[10], v[11]],
    [v[0], v[7], v[10]],
    [v[5], v[11], v[4]],
    [v[4], v[9], v[5]],
    [v[3], v[9], v[4]],
    [v[3], v[8], v[9]],
    [v[3], v[6], v[8]],
    [v[3], v[2], v[6]],
    [v[6], v[2], v[10]],
    [v[10], v[7], v[6]],
    [v[8], v[6], v[7]],
    [v[0], v[1], v[7]],
    [v[1], v[5], v[9]],
    [v[11], v[10], v[2]],
    [v[7], v[1], v[8]],
    [v[3], v[4], v[2]],
    [v[2], v[4], v[11]],
    [v[9], v[8], v[1]],
  ];
};

  function makeIcosahedron(radius) {
    const faces = icosahedronFaces(radius).map((f) => makePolygon(f));
    return makeSolid(faces);
  }

// Actual creation of shapes starts here:   
let stdCylinder = makeCylinder(bDim/2,hDim,[-45,0],[0,0,1]);
let stdBox = makeBaseBox(bDim,bDim,hDim).translate([-30,0,0]);
let stdSphere = makeSphere(bDim/2).translate([-15,0,bDim/2]);

let stdRoof = draw().hLine(bDim).line(-bDim/2,hDim).close()
.sketchOnPlane("XZ").extrude(bDim).translate([-bDim/2,bDim/2,0])

// the hexagon can also be created with the drawPolysides(length,numCorners) function  
let stdHex = draw().hLine(bDim/2).polarLine(bDim/2,60)
.polarLine(bDim/2,120).polarLine(bDim/2,180).polarLine(bDim/2,240)
.polarLine(bDim/2,300).close().sketchOnPlane("XY").extrude(hDim)
.translate([1.25*bDim,bDim*Math.cos(60)/2,0])

let stdCone = draw().hLine(bDim/2).line(-bDim/2,hDim).close()
.sketchOnPlane("XZ").revolve().translate([-45, -bDim*1.5,0])

// piramid is created as a loft  
let piramidBase=drawRectangle(bDim,bDim).sketchOnPlane("XY")
let piramidMid=drawRectangle(bDim/2,bDim/2).sketchOnPlane("XY",hDim/2)
let piramid = piramidBase.loftWith(piramidMid,{endPoint:[0,0,hDim]})
.translate(-30,-bDim*1.5,0)

// piramid can be approximated with extrusion to a very small endFactor
// note that endFactor:0 yields a kernel error! 
let approxPiramidExtrude = drawRectangle(bDim,bDim).sketchOnPlane("XY")
.extrude(hDim,{extrusionProfile:{profile:'linear',endFactor:0.001}})
.translate(-30,1.5*bDim,0)

// piramid can be approximated with loft between to drawings that are 
// very close to each other  
let piramidBaseDrawing=drawRectangle(bDim,bDim)
let baseOne = piramidBaseDrawing.clone().sketchOnPlane("XY")
let baseTwo = piramidBaseDrawing.clone().sketchOnPlane("XY",0.001)  
let approxPiramidLoft = baseOne.loftWith(baseTwo,{endPoint:[0,0,hDim]})
.translate(-45,bDim*1.5,0)  
 
let halfDome = draw().hLine(bDim/2).ellipse(-bDim/2,bDim/2,bDim/2,bDim/2,0,false,true).close().sketchOnPlane("XZ").revolve()
.translate([-15,-bDim*1.5,0])
let cheese = draw().hLine(bDim).vLine(hDim).close()
.sketchOnPlane("XZ").extrude(bDim)
.translate([-5,-bDim*1,0])

// based on function declared at top of this file  
let icosahedron = makeIcosahedron(bDim/2)
.translate([bDim*1.5,-bDim*1.5,bDim/2])
  
let squareRing = draw([bDim/2,0]).hLine(-bDim/4).vLine(hDim/2)
.hLine(bDim/4).close().sketchOnPlane("XZ").revolve()
.translate([-45,-bDim*3,0])

let halfPipe = draw().hLine(bDim/2)
.ellipse(-bDim/2,bDim/2,bDim/2,bDim/2,0,false,true)
.ellipse(-bDim/2,-bDim/2,bDim/2,bDim/2,0,false,true)
.close().sketchOnPlane("XZ").extrude(bDim)
.translate([-30,-bDim*2.5,0])

let donut=drawCircle(bDim/6).translate(bDim/2-bDim/6,bDim/8).sketchOnPlane("XZ").revolve()
.translate([-15,-bDim*3,0])
let capsule = draw([bDim/2,hDim/2+hDim/4]).vLine(-hDim/4)
.tangentArc(-bDim/2,-bDim/2).vLine(bDim+hDim/4)
.ellipse(bDim/2,-bDim/2,bDim/2,bDim/2,0,false,false)
.close().sketchOnPlane("XZ").revolve()
.translate([-45,-bDim*4.5,0])

let text = drawText("RD",{fontSize:bDim})
.sketchOnPlane("XZ").extrude(hDim/2)
.translate([-30-bDim/2,-bDim*4-bDim/4,0])

let roundedCube=drawRoundedRectangle(bDim,bDim,bDim/8)
.sketchOnPlane("XY").extrude(hDim)
.translate([bDim*1.5,-bDim*3,0])

let octPilar = drawPolysides(bDim/2,8)
.sketchOnPlane("XY").extrude(hDim)
.translate([0,-bDim*3,0])

let spinner = draw()
.ellipse(bDim/2,bDim/2,bDim/2,bDim/2,0,false,false)
.ellipse(-bDim/2,bDim/2,bDim/2,bDim/2,0,false,false)
.close().sketchOnPlane("XZ").revolve()
.translate([0,-4.5*bDim,0])

// Clover created by boolean fues on 2D drawings
let clover1=drawCircle(bDim/3).translate(bDim/5,bDim/4)
let clover2=drawCircle(bDim/3).translate(-bDim/5,bDim/4)
let clover3=drawCircle(bDim/3).translate(0,-bDim/6)
let clover=clover1.fuse(clover2).fuse(clover3).sketchOnPlane("XY")
.extrude(hDim/2).translate(1.5*bDim,-4.5*bDim,0)

// alternative to using makeSphere function
let makeBall = draw()
.ellipse(0,bDim,bDim/2,bDim/2,0,false,true)
.close().sketchOnPlane("XZ").revolve()
.translate([-15,1.5*bDim,0])

let parabol = draw().hLine(bDim/2).ellipse(-bDim/2,bDim,bDim/2,bDim,0,false,true).close().sketchOnPlane("XZ").revolve()
.translate([-15,-bDim*4.5,0])

let shapeArray = [
{shape: stdCylinder, color:"orange"}
,{shape: stdBox, color: "red"}
,{shape: stdSphere, color: "blue"}
,{shape:stdRoof, color: "green"}
,{shape:stdHex, color: "darkblue"}
,{shape:stdCone, color: "purple"}
,{shape:piramid, color: "yellow"}
,{shape:halfDome, color: "fuchsia"}
,{shape:cheese, color: "darkblue"}
,{shape:parabol, color: "white"}
,{shape:icosahedron, color: "red"}
,{shape:squareRing, color: "orange"}
,{shape:halfPipe, color: "lightblue"}
,{shape:donut, color: "blue"}
,{shape:capsule, color: "white"}
,{shape:text, color: "green"}
,{shape:roundedCube, color: "purple"}
,{shape:octPilar, color: "orange"}
,{shape:approxPiramidExtrude, color: "yellow"}
,{shape:approxPiramidLoft, color: "yellow"}  
,{shape:spinner, color: "fuchsia"}
,{shape:makeBall, color: "blue"}
,{shape:clover, color: "green"}
]
return shapeArray} ```

