const { draw, drawCircle, drawRectangle} = replicad;

const main = () => {
let axleRadius = 11
let keySlotHeight = 6
let keySlotWidth  = 2.50  

let axleHole = drawCircle(axleRadius)
let axleHole2 = drawCircle(axleRadius).translate(3*axleRadius,0)
let keySlot  = drawRectangle(2*keySlotWidth,keySlotHeight)
.translate(-axleRadius,0)
let keySlot2  = drawRectangle(2*keySlotWidth,keySlotHeight)
.translate(-axleRadius,0).translate(3*axleRadius,0)
let axleShape = axleHole.cut(keySlot).sketchOnPlane("XZ")
let axleShape2 = axleHole2.fuse(keySlot2).sketchOnPlane("XZ",10)
let axle = axleShape.extrude(25)
let axle2 = axleShape2.extrude(25)
  return [axle,axle2];
};