// Knob that was used in SolidWorks Model Mania 2006

const main = (
{draw,
makeSphere,
EdgeFinder,
makeBaseBox,
makeCylinder,
Sketcher},
{},    
) => {

// create sketch of sideview of finger of the knob  
let sideView = draw()
.movePointerTo([-60,0])
.ellipse(20*Math.sin(Math.PI/6),20*Math.cos(Math.PI/6),20,20,0,0,false)
.smoothSplineTo([0,32])
.ellipse(32,-32,32,32,Math.PI/2,0,false)
.close()

// identical to side view but only top edge
// to be used as a rail to sweep the 32mm radius profile  
let sweepRail = draw()
.movePointerTo([-60,0])
.ellipse(20*Math.sin(Math.PI/6),20*Math.cos(Math.PI/6),20,20,0,0,false)
.smoothSplineTo([0,32])
.ellipse(32,-32,32,32,Math.PI/2,0,false)
.done()
.sketchOnPlane("YZ")

// create a rounded profile to shape finger of knob  
function sweepProfile(plane,origin)
{
// variable used to define the rounded profile of r=32mm on top of knob  
// the knob to cut is 2*16 mm wide, so cutter to 18mm
// r=32, so height is SQRT(SQR(32)-SQR(16))	
let segmentHeight = 32 - Math.sqrt((32*32)-(16*16))
let section = new Sketcher(plane,origin)
.movePointerTo([segmentHeight,-20])
.lineTo([segmentHeight,-16])
.threePointsArcTo([segmentHeight,16],[0,0])
.lineTo([segmentHeight,20])
.lineTo([-1,20])
.lineTo([-1,-20])
.close()
return section}

// create sweep of profile  
let profileCut = sweepRail.clone()
.sweepSketch((plane,origin) => sweepProfile(plane,origin))		

// create finger of knob by extruding sideview
sideView = sideView.sketchOnPlane("YZ").extrude(32).translate([-16,0,0])

// cut the profile out of finger  
sideView = sideView.cut(profileCut)

// fillet the sides of the finger  
sideView = sideView.fillet(4,(e)=>e.containsPoint([16,0,32-segmentHeight]))
sideView = sideView.fillet(4,(e)=>e.containsPoint([-16,0,32-segmentHeight]))

// create a half dome   
let ball = makeSphere(30);
let cutBall = makeBaseBox(80,80,40).translate(0,0,-40)
ball = ball.cut(cutBall);

// fuse the half dome with the finger and fillet the edges  
sideView  = sideView.fuse(ball)
sideView = sideView.fillet(4,(e)=>e.inBox([18,40,1],[-18,-40,50]))

// store the shape to be used later on to create inside structure of the knob  
let intersectBall = sideView;

// make a hollow shape, removing the bottom face  
// thickness should be 4, but this yields kernel error
// probably because outer fillet is 4 mm results in inner fillet problem
sideView = sideView.shell(-3.9,(f)=>f.containsPoint([0,0,0]))

// create 3 ribs and a stem   
let rib =  makeBaseBox(4,40,40).translate(0,20,4);
let rib1 = makeBaseBox(4,40,40).translate(0,20,4).rotate(120,[0,0,0],[0,0,1]);
let rib2 = makeBaseBox(4,40,40).translate(0,20,4).rotate(240,[0,0,0],[0,0,1]);
let stem = makeCylinder(10,30,[0,0,0],[0,0,1]).translate(0,0,4);

rib = rib.fuse(rib1)
rib = rib.fuse(rib2)
stem = rib.fuse(stem)

// make the stem hollow, note that ribs had to be created first  
let stemHole = makeCylinder(6,40,[0,0,0],[0,0,1]);
stem = stem.cut(stemHole);

// intersect the ribs and stem with the contour of the knob   
stem = stem.intersect(intersectBall)

// fuse inner parts with the hollow knob  
sideView  = sideView.fuse(stem)
sideView  = sideView.fillet(2,(e)=>e.inDirection("Z"));
// EXPERIMENTS: inner structure should be filleted with 1mm radius
// seems impossible, also in OnShape!   
// sideView  = sideView.fillet(0.3,(e)=>e.inBox([-32,-32,3],[32,32,32]));
// sideView  = sideView.fillet(0.5,(e)=>e.atAngleWith("YZ",0));
// sideView  = sideView.fillet(1);

// display the resulting shapes
let shapeArray = [
{shape: sideView, name: "sideView"},
{shape: profileCut, name:"profileCut"},
{shape: frontCut,name:"frontCut"}
]; 

return shapeArray

}
