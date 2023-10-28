const {draw,makeCylinder,makeBaseBox} = replicad

// Number of functions to make drawing easier
function Polar(currentPoint,distance,angleDegToX)
{
    let newPoint = [];
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + distance * Math.cos(angleRad);
    newPoint[1]  = currentPoint[1] + distance * Math.sin(angleRad);
    return newPoint
}

function PolarX(currentPoint,xdistance,angleDegToX)
{
    let newPoint = [];
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + xdistance;
    newPoint[1]  = currentPoint[1] + xdistance * Math.tan(angleRad);
    return newPoint
}

function PolarY(currentPoint,ydistance,angleDegToX)
{
    let newPoint = [];
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + ydistance/Math.tan(angleRad);
    newPoint[1]  = currentPoint[1] + ydistance;
    return newPoint
}

function main()
{
// Model Mania 2001 part 1

// break part apart into several components

// cylinder
let startPoint = [-146,0,64];
let cylinderAngleDeg = 45
let cylinderAngle = cylinderAngleDeg*Math.PI/180;
let cylinderDirection = [Math.cos(cylinderAngle),0,Math.sin(cylinderAngle)]
let cylinderHeight = 32; 
let cylinderOuterRadius = 52/2;
let cylinderInnerRadius = 32/2

let cylinderOuter = makeCylinder(cylinderOuterRadius,
cylinderHeight+1,startPoint,cylinderDirection) 
// add millimeter to intrude into the flange
let cylinderInner = makeCylinder(cylinderInnerRadius,
cylinderHeight*2,startPoint,cylinderDirection)
cylinderOuter = cylinderOuter.cut(cylinderInner.clone())
// clone the inner cylinder as we want to re-use it to cut the flange

// base
let baseHeight = 20;
let baseWidth = 96;
let baseLength = 64;
let baseBlock = makeBaseBox(baseHeight,baseWidth,baseLength)
.translate([-baseHeight/2,0,0])

// flange
let flangeWidth = 64;
let flangeRoundingTop = 64/2;
let flangeThickness = 12;
let flangeRounding = 15;
let flangeLength = 146
let pStart = [startPoint[0],startPoint[2]] // 2D representation

let p1 = Polar(pStart,cylinderHeight,cylinderAngleDeg)   // middle of cylinder
let p2 = Polar(p1,flangeRoundingTop,cylinderAngleDeg+90) // clockwise around
let p3 = Polar(p2,flangeThickness,cylinderAngleDeg)
let p4 = PolarY(p3,-p3[1]+baseLength,cylinderAngleDeg-90)   // note that Dy is negative! 
let p5 = [-10,baseLength]
let p6 = [-10,baseLength-flangeThickness]
let p7 = PolarY(p1,-p1[1]+(baseLength-flangeThickness),cylinderAngleDeg-90)

let flange = draw(p1)
.lineTo(p2)
.lineTo(p3)
.lineTo(p4)
.customCorner(flangeRounding)
.lineTo(p5)
.lineTo(p6)
.lineTo(p7)
.customCorner(flangeRounding+flangeThickness)
.close()
.sketchOnPlane("XZ")
.extrude(flangeWidth)
.translate([0,flangeWidth/2,0])
.fillet(31.99,(e)=>e.atAngleWith("X",45).ofLength(flangeThickness))

// rib 
let ribHeight = 26;
let ribRounding = 55;

let r1 = Polar(pStart,cylinderHeight-ribHeight,45)
let r2 = PolarY(r1,-r1[1]+(64-12-26),-45)
let r8 = Polar(r1,ribHeight,45)
let r3 = [r2[0]+25,r2[1]]
let r4 = [-20,0]
let r5 = [-10,0]
let r6 = [-10,52]
let r7 = PolarY(r8,+52-r8[1],-45)

let rib = draw(r1)
.lineTo(r2)
.customCorner(53)
.lineTo(r3)
.tangentArcTo(r4)  // not possible to enter a ribRounding, depends on r3[1]
.lineTo(r5)
.lineTo(r6)
.lineTo(r7)
.customCorner(27)
.lineTo(r8)
.close()
.sketchOnPlane("XZ")
.extrude(12)
.translate([0,6,0])

// M6 outer 11,20mm depth 6mm dia 6.8 mm
let holeSpacing = 60;
let holeMarginSide = 18;
let holeRadius = 6/2;
let holeOuterRadius = 10/2;
let holeMarginFront = 32;

let holeCutter = makeCylinder(holeRadius,baseHeight*4,[0,-holeSpacing/2,holeMarginFront],[-1,0,0])
let holeCutter2 = holeCutter.clone().translate([0,holeSpacing,0])
baseBlock = baseBlock.cut(holeCutter).cut(holeCutter2) 

let counterCutter = makeCylinder(holeOuterRadius,baseHeight*4,[-14,-holeSpacing/2,holeMarginFront],[-1,0,0])
let counterCutter2 = counterCutter.clone().translate([0,holeSpacing,0])
baseBlock = baseBlock.cut(counterCutter).cut(counterCutter2) 

baseBlock = baseBlock.fuse(flange).fuse(rib).fuse(cylinderOuter)
baseBlock = baseBlock.cut(cylinderInner)
.fillet(2,(e)=>e.inDirection("X"))
//.fillet(2,(e)=>e.inDirection("Y"))
.fillet(2,(e)=>e.atAngleWith("X",45))
//.fillet(1,(e)=>e.inBox([0,-10,50],[-40,10,60]))
.rotate(90,[0,0,0],[0,1,0])

return [{shape:baseBlock, color: "steelblue"}]
}