const main = (
{draw,
makeSphere,
assembleWire,
EdgeFinder,
makeBaseBox,
makeOffset,
makeCylinder,
Sketcher},
{},    
) => {

let sideView = draw()
.movePointerTo([-60,0])
.ellipse(20*Math.sin(Math.PI/6),20*Math.cos(Math.PI/6),20,20,0,0,false)
//.tangentArcTo([0,32])
.smoothSplineTo([0,32])
//.lineTo([0,32])
.ellipse(32,-32,32,32,Math.PI/2,0,false)
.close()

let sweepRail = draw()
.movePointerTo([-100,0])
.lineTo([-60,0])
.ellipse(20*Math.sin(Math.PI/6),20*Math.cos(Math.PI/6),20,20,0,0,false)
.smoothSplineTo([0,32])
.ellipse(32,-32,32,32,Math.PI/2,0,false)
//.lineTo([100,0])
//.lineTo([100,100])
//.lineTo([-100,100])
.close()

let frontview = draw()
.movePointerTo([32,-30])
.halfEllipseTo([-32,-30],32)
.lineTo([-32,-40])
.lineTo([32,-40])
close()

let frontView = draw()
.movePointerTo([-40,-30])
.lineTo([-32,-30])
.ellipse(32,32,32,32)
.ellipse(32,-32,32,32)
.lineTo([40,-30])
.lineTo([40,4])
.lineTo([-40,4])
.close()

let frontCut = frontView.sketchOnPlane("XZ")

function sketchFunction(plane,origin)
            {let section = new Sketcher(plane,origin)
.movePointerTo([-40,-30])
.lineTo([-32,-30])
.ellipse(32,32,32,32)
.ellipse(32,-32,32,32)
.lineTo([40,-30])
.lineTo([40,4])
.lineTo([-40,4])
.close()
return section}

// let profileCut = sweepRail.sketchOnPlane("YZ")
//.sweepSketch((plane,origin) => sketchFunction(plane,origin))			

sideView = sideView.sketchOnPlane("YZ").extrude(32).translate([-16,0,0])
// sideView = sideView.cut(profileCut)
// let top = new EdgeFinder().not((e)=>e.inPlane("XY"));
sideView = sideView.fillet(5,(e)=>e.containsPoint([16,0,32]))
sideView = sideView.fillet(5,(e)=>e.containsPoint([-16,0,32]))

let ball = makeSphere(30);
let cutBall = makeBaseBox(80,80,40).translate(0,0,-40)
ball =ball.cut(cutBall);
sideView  = sideView.fuse(ball)
sideView = sideView.fillet(5,(e)=>e.inBox([18,40,1],[-18,-40,50]))
let intersectBall = sideView;
sideView = sideView.shell(-4,(f)=>f.containsPoint([0,0,0]))

//let intersectBall = makeSphere(30);

let rib =  makeBaseBox(4,40,40).translate(0,20,4);
let rib1 = makeBaseBox(4,40,40).translate(0,20,4).rotate(120,[0,0,0],[0,0,1]);
let rib2 = makeBaseBox(4,40,40).translate(0,20,4).rotate(240,[0,0,0],[0,0,1]);
let stem = makeCylinder(10,30,[0,0,0],[0,0,1]).translate(0,0,4);

rib = rib.fuse(rib1)
rib = rib.fuse(rib2)
stem = rib.fuse(stem)
let stemHole = makeCylinder(6,40,[0,0,0],[0,0,1]);
stem = stem.cut(stemHole);
stem = stem.intersect(intersectBall)

sideView  = sideView.fuse(stem)
sideView  = sideView.fillet(1,(e)=>e.inDirection("Z"));
//sideView  = sideView.fillet(1,(e)=>e.inBox([-32,-32,3],[32,32,32]));
//sideView  = sideView.fillet(0.5,(e)=>e.atAngleWith("YZ",0));
//sideView  = sideView.fillet(0.5);


let shapeArray = [
{shape: sideView, name: "sideView"},
// {shape: profileCut, name:"profileCut"},
// {shape: frontCut,name:"frontCut"}
]; 

return shapeArray

}