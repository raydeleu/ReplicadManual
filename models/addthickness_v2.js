// addthickness experiments

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */

function main( 
{
    Sketcher,
    sketchRectangle,
    sketchCircle,
    EdgeFinder
})
{
let length = 120;
let width  = 20;
let height = 10;
let radius = 20;
let fillet = 4;

// create a sketch to be revolved
let sketch = new Sketcher("XZ")
    .hLine(width)
    .threePointsArc(0,2*fillet,fillet,fillet)
    .hLine(-width)
    .close()
let revolved = sketch.revolve()    

// create a sketch to be extruded
let rectangle = sketchRectangle(length,width/2,{plane: "XZ"})
let box = rectangle.extrude(height)
// box = box.fillet(2, (e) => e.inDirection("X"))

// create sketch of circle offset from x-axis and extrude this
let wheel = sketchCircle(radius,{plane:"XZ",origin: [30,0,0]}).extrude(2).translateY(-10)

// use same sketch and try to revolve this to create a donut => FAIL?? 
let donut = sketchCircle(radius/2,{plane:"XZ",origin: [length/2,0,0]}).revolve([0,0,1],{origin:[0,0,0]})
 
// box = box.fuse(wheel)
box = box.fuse(donut)
// box = box.fillet(1 , (e) => e.inDirection("X"))
// box = box.fuse(revolved)
return {shape: box, higlight: new EdgeFinder().inDirection("X")} 
}