const {draw,makeCylinder,makeBaseBox} = replicad

function main()
{
// Model Mania 2001 part 1

// break part apart into several components

// cylinder
let startPoint = [-146,0,64];
let cylinderAngle = 45*Math.PI/180;
let cylinderDirection = [Math.cos(cylinderAngle),0,Math.sin(cylinderAngle)]
let cylinderHeight = 32;
let cylinderOuterRadius = 52/2;
let cylinderInnerRadius = 32/2

let cylinderOuter = makeCylinder(cylinderOuterRadius,
cylinderHeight,startPoint,cylinderDirection)
let cylinderInner = makeCylinder(cylinderInnerRadius,
cylinderHeight,startPoint,cylinderDirection)
cylinderOuter = cylinderOuter.cut(cylinderInner)

// flange
let flangeWidth = 64;
let flangeRoundingTop = 64/2;
let flangeThickness = 12;
let flangeRounding = 15;

let pStart = [-146,64]
let pDir1 = 45
let pLen1 = 32
let pDir2 = 135
let pLen2 = 32
let pDir3 = 45
let pLen3 = 12
let pDir4 = -45



// rib 
let ribHeight = 26;
let ribRounding = 55;

// base
let baseHeight = 20;
let baseWidth = 96;
let baseLength = 64;
let holeSpacing = 60;
let holeMarginSide = 18;
let holeRadius = 6/2;
let holeOuterRadius = 10/2;
let holeMarginFront = 32;

// M6 outer 11,20mm depth 6mm dia 6.8 mm

let baseBlock = makeBaseBox(20,96,64).translate([-baseHeight/2,0,0])
let holeCutter = makeCylinder(holeRadius,baseHeight*4,[0,-holeSpacing/2,holeMarginFront],[-1,0,0])
let holeCutter2 = holeCutter.clone().translate([0,holeSpacing,0])


baseBlock = baseBlock.cut(holeCutter).cut(holeCutter2) 





return [
{shape: cylinderOuter, color: "steelblue"}
,{shape:baseBlock, color: "red"}
// ,{shape:topProfile, color: "red"}
// ,{shape: tower, color: "steelblue", opacity: 0.5}
// ,{shape: tower1}
// ,{shape: tower2}
]

}