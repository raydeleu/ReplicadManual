// sweepSketch experiment


/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */

function main( 
{
    Sketcher,
    sketchCircle,
    sketchRoundedRectangle,
    supportExtrude
})
{

let radius = 5
let xSection1 = sketchCircle(radius,{plane:"XZ",origin: [0,0,0]})
let xSection2 = sketchCircle(radius,{plane:"XY",origin: [0,50,30]})
let xSection3 = sketchCircle(radius,{plane:"XY",origin: [0,50,50]})
let xSection4 = sketchCircle(radius,{plane:"XY",origin: [0,50,70]})
let xSection5 = sketchCircle(radius,{plane:"XZ",origin: [0,100,100]})
let pipe = xSection1.loftWith([xSection2,xSection3,xSection4,xSection5])

// let profile = sketchRoundedRectangle(50,60,10)
// let xSectionExtrude = sketchCircle(radius,{plane:"XZ",origin: [0,0,0]})
// let pipe2 = supportExtrude(xSectionExtrude,[0,0,0],[0,1,0],profile)



return pipe
}