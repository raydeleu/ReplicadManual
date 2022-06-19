// sweepSketch experiment

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */

function main( 
{
    Sketcher,
    sketchRoundedRectangle,
    roundedRectangleBlueprint,
    BlueprintSketcher
})
{
let circleDiameter = 10;
let length = 50;
let width  = 50;
let fillet = 5;
let dim = 10;

let path = roundedRectangleBlueprint(length,width,fillet)
.sketchOnPlane("XY");
// let profile = sketchCircle(circleDiameter);
// let profile = new Sketcher("XZ").hLine(10).tangentArc(dim/2,dim/2)
// .vLine(dim)
// .tangentArc(-dim/2,dim/2)
// .hLine(-dim)
// .tangentArc(-dim/2,-dim/2)
// .vLine(-dim)
// .tangentArc(dim/2,-dim/2)
// .done()

let profile = new BlueprintSketcher([0,0]).vLine(-2).hLine(-1).vLine(-1).done().translate([1,0])

let tube = path.sweepSketch(profile,{forceSpineOthogonality:true});
// let tube = genericSweep(path,profile,{
//     withContact: true,
//     forceProfileSpineOthogonality: true,
//   })





return profile
}