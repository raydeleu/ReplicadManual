let {draw} = replicad  

async function main()  
{  
let length = 100;
let width  = 40;
let bulge  = 20;

let p0 = [0,0]
let p1 = [length,0]
let p2 = [length,width]
let p3 = [0.6*length, width+bulge]
let p4 = [0,width]

let groundPlane = draw(p0)
.lineTo(p1)
.lineTo(p2)
.smoothSplineTo(p3,{startTangent:135,endTangent:180})
.smoothSplineTo(p4,{startTangent:180, endTangent:270})
.close()
.sketchOnPlane("XY")
.extrude(20)
//.fillet(5)

return groundPlane
}