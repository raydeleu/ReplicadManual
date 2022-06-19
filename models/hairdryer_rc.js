// const defaultParams = {};

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */

// Model of a hair dryer, loosely based on Braun model from 70'
// ============================================================

const main = (
{ 
    sketchCircle,
    sketchRectangle,
    EdgeFinder
}
) => {

// parameters
let fanRadius       = 30;
let fanHeight       = 30;
let fanhousingThickness = 1.5;
let fanCutoutRadius = 20;
let fanCutoutDepth  = 5 ; 
let fanRounding     = 8;
let lidRadius       = 19;
let lidThickness    = 3; 
let lidRounding     = 2;
let stemRadius      = 5;
let outletLength    = 60;
let outletWidth     = 18;
let outletHeight    = 30; 
let outletRounding  = 5;

let outletThickness = 1.45;
let handleLength    = 80;
let handleWidth     = 25;
let handleHeight    = 16; 
let handleRounding  = 5;
let handleThickness = 1.45;
let handleBottomRound = 2;
let buttonLength    = 8;
let buttonWidth     = 3;
let buttonHeight    = 6;
let buttonRounding  = 1.4;
let recesDepth      = 20;
let recesWidth      = 10;
let recesHeight     = 10;
let recesRounding   = 2; 
let handleJunctionRound = 5;
let outletJunctionRound = 5; 

// fanhousing
let fanhousing = sketchCircle(fanRadius).extrude(fanHeight).fillet(fanRounding);
let cutout     = sketchCircle(fanCutoutRadius).extrude(fanCutoutDepth+10).translateZ(fanHeight-fanCutoutDepth);
fanhousing = fanhousing.cut(cutout);

// lid
let lid = sketchCircle(lidRadius).extrude(lidThickness);
lid = lid.fillet(lidRounding, (e) => e.ofCurveType("CIRCLE").inPlane("XY",lidThickness) );
lid = lid.translateZ(fanHeight-lidThickness);
let lidstem = sketchCircle(stemRadius).extrude(fanHeight)
lid = lid.fuse(lidstem);

// outlet
let outletBase  = (fanHeight - outletWidth)/2;
let outlet      = sketchRectangle(outletHeight,outletLength).extrude(outletWidth);
outlet = outlet.translate([(-fanRadius+(outletHeight/2.0)),-outletLength/2,outletBase]);
outlet  = outlet.fillet(outletRounding, (e) => e.inDirection("Y"));

fanhousing = fanhousing.fuse(outlet);
let corner1 = [0, -outletLength,-fanHeight/2];
let corner2 = [-fanRadius,-fanRadius-5,fanHeight/2];
fanhousing = fanhousing.fillet(outletJunctionRound, (e) => e.inDirection("Z").not( (f) => f.inBox(corner1,corner2)))

// handle
let handleBase = (fanHeight - handleHeight)/2;
let handle = sketchRectangle(handleLength,handleWidth).extrude(handleHeight)
handle = handle.translate([handleLength/2,fanRadius-handleWidth/2,handleBase])
handle = handle.fillet(handleRounding, (e) => e.inDirection("X"))
handle = handle.fillet(handleBottomRound, (e) => e.inPlane("YZ",handleLength))
fanhousing = fanhousing.fuse(handle);
let corner3 = [fanRadius+2,fanRadius+2,-fanHeight/2+1]
let corner4 = [0 ,0 ,fanHeight/2-1]
// fanhousing = fanhousing.fillet(handleJunctionRound, (e) => e.inBox(corner3,corner4));
fanhousing = fanhousing.fillet(handleJunctionRound, (e) => e.inDirection("Z").not( (f) => f.inBox(corner1,corner2)));

// create a shell with thickness of the combined shape
fanhousing = fanhousing.shell(-fanhousingThickness, (f) => f.inPlane("XZ",[-fanRadius,-outletLength,0]))

// add the lid into the reces of the fanhousing
fanhousing = fanhousing.fuse(lid);
// return [fanhousing,lid];
return fanhousing
}

// Todo: below is the original code for buttons

// let button_cut = Translate([-50,-10,10],Box(recesWidth,recesDepth,recesHeight))
// button_cut= FilletEdges(button_cut,recesRounding,[1,5,7,3])

// // buttons
// let button = Translate([-49,-10,11],Box(buttonWidth,buttonHeight,buttonLength))
// button = FilletEdges(button,buttonRounding,[1,3,5,7]);
// let button2 = Translate([5,0,0],button,true);
// handle = Difference(handle,[button_cut]);

// let handle_inner = Offset(handle,-handleThickness,0.001,true)


// // vanes
// let vane = Translate([4,46,7.5],Box(1,15,15))
// vane = ChamferEdges(vane,2,[10,11],false)
// let vanes = []
// for (let j=0;j<=3;j++)
// {
//     vanes[j] = Translate([5*(j+1),0,0],vane,true)
// }

// creating a cut-away  
// comment and uncomment with CTRL-/ 
// let cutter = Translate([-100,-75,15],Box(150,150,25))
// let cutaway = Difference(dryer_hollow,[cutter]);