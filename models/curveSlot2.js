const { draw, drawCircle, drawRectangle} = replicad;

const main = () => {

// dimensions of slotted lever
let axleHoleRadius = 22/2;
let axleRadius = 35/2;
let keySlotHeight = 6;
let keySlotWidth  = 2.50;  
let axleWidth = 30;
let dist = 100;
let slotOuterRadius = 12
let slotAngle = 30/180*Math.PI
let dh = axleRadius - slotOuterRadius
let minAngle = Math.asin(-dh/dist);
let maxAngle = minAngle + slotAngle;
let startPoint = [Math.cos(minAngle)*(dist+slotOuterRadius),Math.sin(minAngle)*(dist+slotOuterRadius)]
let endPoint = [Math.cos(maxAngle)*(dist+slotOuterRadius),Math.sin(maxAngle)*(dist+slotOuterRadius)]
let startPointCircle = [Math.cos(minAngle)*(dist),Math.sin(minAngle)*(dist)]
let endPointCircle = [Math.cos(maxAngle)*(dist),Math.sin(maxAngle)*(dist)]

let axle = drawCircle(axleRadius)
.sketchOnPlane("XZ").extrude(axleWidth);

let plate = draw()
.movePointerTo([0,-axleRadius+6])
.lineTo([0,-axleRadius])
.lineTo([100,-axleRadius])
.lineTo([90,-axleRadius+6])
.lineTo([38,-axleRadius+6])
.tangentArc(-5,30)
.tangentArc(50,28)
.polarLineTo([100,33.5])
.ellipseTo([0,axleRadius],175,175)
.lineTo([0,axleRadius-6])
.ellipseTo([0,-axleRadius+6],11,11)
.close().sketchOnPlane("XZ",3).extrude(14)

let slotOuter = drawCircle(dist+slotOuterRadius)
let slotInner = drawCircle(dist-slotOuterRadius)
let segment = draw().lineTo(startPoint).line(0,50).lineTo(endPoint).close()
let slotRing = slotOuter.cut(slotInner)  
let slotSegment = slotRing.intersect(segment)
let slotRoundStart = drawCircle(slotOuterRadius).translate(startPointCircle)
let slotRoundEnd = drawCircle(slotOuterRadius).translate(endPointCircle)
slotSegment = slotSegment.fuse(slotRoundStart)
slotSegment = slotSegment.fuse(slotRoundEnd)
let slotSegmentInner = slotSegment.offset(-6)
let slotSegmentOuter = slotSegment.cut(slotSegmentInner).sketchOnPlane("XZ",2).extrude(16)
// let lowerArm = drawRectangle(100,6).sketchOnPlane("XZ",3).extrude(14).translate(50,0,-axleRadius+3)

let axleHole = drawCircle(axleHoleRadius)
let keySlot  = drawRectangle(2*keySlotWidth,keySlotHeight)
.translate(-axleHoleRadius,0)
let axleHoleShape = axleHole.fuse(keySlot).sketchOnPlane("XZ",-10)
let axleCutter = axleHoleShape.extrude(30+20)
axle = axle.cut(axleCutter)

axle = axle.fuse(slotSegmentOuter)
axle = axle.fuse(plate).fillet(0.8,(e)=>e.inPlane("XZ",2))
axle = axle.fillet(0.8,(e)=>e.inPlane("XZ",2+16))

return [
//{shape: axleCutter, color: "silver", opacity: 0.6}
,{shape: axle, color: "steelblue"}
// ,{shape: slotSegmentOuter, color: "steelblue"}
//,lowerArm
// ,{shape: plate, color: "steelblue"}
];
};