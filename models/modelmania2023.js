// Model mania 2023
const r = replicad

// next lines allow intellisense help in VS Code
/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */

function main()
{
let filletRadius = 2;

let mainCylinder = r.makeCylinder(50/2,30,[0,0,0],[0,0,1])
.translate(0,0,-30/2)
.fillet(filletRadius)
let mainBore = r.makeCylinder(42/2,50,[0,0,-10],[0,0,1])
.translate(0,0,-30/2)

let holder = r.makeBaseBox(65.5-15,15,30)
.translate((65.5-15)/2,50/2-15/2,-30/2)
.fillet(filletRadius,(e)=>e.inDirection("X"))
let holderRound = r.makeCylinder(30/2,15,[65.5-15,50/2,0],[0,-1,0])
.fillet(filletRadius)
let holderHole = r.makeCylinder(6.6/2,40,[65.5-15,50/2+30/2,0],[0,-1,0])
let holderCounterR = r.makeCylinder(11/2,12,[65.5-15,50/2+6,0],[0,-1,0])
let holderCounterL = r.makeCylinder(11/2,12,[65.5-15,50/2-15+6,0],[0,-1,0])
let holderHollow = r.makeBaseBox(30,50,14)
.translate(30/2,20,-14/2)
.fillet(filletRadius,(e)=>e.inPlane("YZ",30))

let clamp = r.makeBaseBox(42.5-12.5,30,25)
.translate(-(42.5-12.5)/2,0,-25/2)
.fillet(filletRadius,(e)=>e.inDirection("X"))
let clampRound = r.makeCylinder(12.5,30,[-42.5+12.5,30/2,0],[0,-1,0])
.fillet(filletRadius)
let clampHole = r.makeCylinder(6.6/2,40,[-42.5+12.5,40/2,0],[0,-1,0])
let clampCounterR = r.makeCylinder(11/2,8,[-42.5+12.5,15-6,0],[0,1,0])
let clampCounterL = r.makeCylinder(11/2,8,[-42.5+12.5,-15+6,0],[0,-1,0])
let gapHole = r.makeBaseBox(42.5,2,50)
.translate(-42.5/2,0,-50/2)

holder = holder.fuse(holderRound).cut(holderHollow).cut(holderHole)
holder = holder.cut(holderCounterL).cut(holderCounterR)
clamp = clamp.fuse(clampRound)
clamp = clamp.cut(clampHole).cut(clampCounterL).cut(clampCounterR)
mainCylinder = mainCylinder.fuse(holder)
mainCylinder = mainCylinder.fuse(clamp)
mainCylinder = mainCylinder.cut(mainBore)
mainCylinder = mainCylinder.fillet(0.9,(e)=>e.inBox([-17,-30,-15],[-22,30,15]))
mainCylinder = mainCylinder.cut(gapHole)
mainCylinder = mainCylinder.fillet(2,(e)=>e.inBox([17,-30,-20],[22,30,20]))

// mainCylinder = mainCylinder.fillet(filletRadius,(e)=>e.inDirection("Z"))

let shapes= [
{shape: mainCylinder, name:"mainCylinder"},
// {shape: mainBore, color: "red"},
// {shape: holder, color: "yellow"},
// {shape: holderRound, color: "green"},
// {shape: holderHole, color: "red"},
// {shape: holderCounterR, color: "grey"},
// {shape: holderCounterL, color: "grey"},
// {shape: clamp, color: "yellow"},
// {shape: clampRound, color: "green"},
// {shape: clampHole, color: "red"},
// {shape: clampCounterR, color: "grey"},
// {shape: clampCounterL, color: "grey"},
// {shape: holderHollow, color: "red"},
// {shape: gapHole, color: "red"}
]  

return shapes

}

