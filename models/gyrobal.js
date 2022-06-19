// steering-wheel-experiment

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */

function main( 
{
    sketchRectangle,
    sketchCircle
})
{
let wheelDiameter = 120;
let width  = 10;
let height = 10;
let radius = 10;
let filletSpoke = 1.5;  // fails if larger than 1.6 
let filletWheelSpoke = 3;

// create a box shape 
let rectangle = sketchRectangle(wheelDiameter,width,{plane: "XZ"})
let box = rectangle.extrude(height)
box = box.fillet(filletSpoke, (e) => e.inDirection("X"))

// create a large donut by revolving a circle that is placed off-center
let donut = sketchCircle(radius,{plane:"XZ",origin: [wheelDiameter/2,0,0]}).revolve([0,0,1],{origin:[0,0,0]})

let donut2 = sketchCircle(radius,{plane: "XY",origin: [0,wheelDiameter/2,0]}).revolve([1,0,0],{origin:[0,0,0]}).scale(0.99)

// box = box.fuse(donut)
// box = box.fillet(filletWheelSpoke , (e) => e.inBox([40,-20,0],[60,20,30]))
// box = box.fillet(filletWheelSpoke , (e) => e.inBox([-40,-20,0],[-60,20,30]))
// box = box.fuse(donut2)
// donut = donut.fuse(donut2)
return donut.fuse(donut2) 
}