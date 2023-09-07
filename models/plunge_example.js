 // Model of the Plunge watering carafe designed by Robert Bronwasser

function main({
                Sketcher,
                sketchCircle,
                sketchFaceOffset,
                makeCylinder,
                sketchRectangle,
                FaceFinder,
            })
{

// side profile of the bottom of the carafe
let p0 = [0,0]
let p1 = [20,0]
let p2 = [30,5]
let p3 = [30,8]
let p4 = [8,100]   // radius of the top at 100 mm is 8 mm
let p5 = [0,100]

let sideview = new Sketcher("XZ")
.lineTo(p1)
.lineTo(p2)
.lineTo(p3)
.lineTo(p4)
.lineTo(p5)
.close()

// sketch is created on XZ plane, revolve is per default around z-axis
let body = sideview.revolve()

// create cross sections of the filler for the carafe
//          used a workaround to rotate and translate the sketch to the required position
let fillHole = sketchCircle(12).face().rotate(-20,[0,0,0],[0,1,0]).translate([-35,0,135])
fillHole = sketchFaceOffset(fillHole,0);
let topBody = sketchCircle(8).face().translate([0,0,100]);   // radius 8 at 100 mm 
topBody = sketchFaceOffset(topBody,0); 
let fillBottom = sketchCircle(9).face().rotate(20,[0,0,0],[0,1,0]).translate([0,0,80]); 
fillBottom = sketchFaceOffset(fillBottom,0); 

// filler shape is created as a loft between the three wires
let filler    = fillHole.loftWith([topBody,fillBottom],{ruled: false});

// create spout, a cylinder with radius 5, length "lengthSpout"
let angleSpout = 45
let lengthSpout = 70
let spout = makeCylinder(5,lengthSpout,[0,0,0],[0,0,1]).rotate(angleSpout,[0,0,0],[0,1,0]).translate([0,0,100])

// // union the main body with the filler and fillet the junction with radius 30
let plunge = body.fuse(filler);
plunge = plunge.fillet(30,(e)=>e.inPlane("XY",100)) 

// union the shape with the sprout and fillet the junction with radius 10
plunge = plunge.fuse(spout).fillet(10,(e)=>e.inBox([20,20,100],[-20,-20,120]));

// Create a shell 
let pointFiller = [-35,0,135]
let spoutOpening = []
spoutOpening[0] = Math.cos(angleSpout*Math.PI/180)*lengthSpout
spoutOpening[1] = 0
spoutOpening[2] = 100 + Math.sin(angleSpout*Math.PI/180)*lengthSpout

const orifices = new FaceFinder().either([
    (f) => f.containsPoint(pointFiller),
    (f) => f.containsPoint(spoutOpening)]);

// plunge = plunge.shell(-0.5,(f)=>f.inBox([20,20,130],[[-20,-20,155]])); // Kernel Error
// plunge = plunge.shell(-0.5,(f)=>f.containsPoint(pointFiller)); // works!
// plunge = plunge.shell(-0.5,orifices); // Kernel Error
plunge = plunge.shell(-1,(f)=>f.containsPoint(spoutOpening)); // works!

// create cutter boxes 
//      approach to open up another face by subtracting a box from the shape
let cutterFiller = sketchRectangle(40,30).extrude(20).rotate(-20,[0,0,0],[0,1,0]).translate([-30,0,135])
// let cutterSpout = sketchRectangle(40,30).extrude(20).rotate(10,[0,0,0],[0,1,0]).translate([48,0,145])

plunge = plunge.cut(cutterFiller)
// plunge = plunge.cut(cutterSpout)  // resulted in Kernel error without the shell command

// let plungeInner = makeOffset(plunge,-1)  // resulted in Kernel error
// let hollowPlunge = plunge.cut(plungeInner)  // not possible as makeOffset failed

let shapeArray = [
{shape: plunge, name: "plunge", color:"steelblue"}, 
// {shape: fillHole, color:"black"},   // note that after the loft these sketches are deleted? 
// {shape: topBody, color:"black"},
// {shape: fillBottom, color: "black"},
// {shape: filler, color: "yellow"},
// {shape: sprout, color: "blue"},
// {shape: cutterFiller},
// {shape:cutterSpout},
// {shape: test}
]

return shapeArray
}
