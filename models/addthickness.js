// addthickness experiments

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */

function main( 
{
    Sketcher,
    sketchRectangle,
    sketchCircle,
})
{
let length = 60;
let width  = 15;
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
let rectangle = sketchRectangle(length,width,{plane: "XZ"})
let box = rectangle.extrude(30)

// create sketch of circle offset from x-axis and extrude this
let wheel = sketchCircle(radius,{plane:"XZ",origin: [30,0,0]}).extrude(2).translateY(-10)

// use same sketch and try to revolve this to create a donut => FAIL?? 
// let donut = sketchCircle(radius,{plane:"XZ",origin: [30,0,0]}).revolve()
 
box = box.fuse(wheel)
box = box.fuse(revolved)
// box = box.fuse(donut)

return box
}