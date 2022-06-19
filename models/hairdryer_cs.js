// Model of a hair dryer, loosely based on Braun model from 70'
// ============================================================

// parameters
let fanRadius       = 30;
let fanHeight    = 30;
let fanhousingThickness = 1.5;
let fanCutoutRadius = 20;
let fanCutoutDepth  = 5 ; 
let fanRounding     = 8;
let lidRadius       = 19;
let lidThickness    = 3; 
let lidRounding     = 2;
let outletLength    = 60;
let outletWidth     = 30;
let outletHeight    = 18; 
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
let handleJunctionRound = 2;
let outletJunctionRound = 5; 

// fanhousing
let fanhousing = Cylinder(fanRadius,fanHeight)
fanhousing = FilletEdges(fanhousing,fanRounding,[0,2],false);
let cutout = Translate([0,0,fanHeight-fanCutoutDepth],Cylinder(fanCutoutRadius,fanCutoutDepth+10));
fanhousing = Difference(fanhousing,[cutout],false);
let fanhousing_inner = Offset(fanhousing,-fanhousingThickness,0.01,true);

// lid on cutout /airintake
let lid = Translate([0,0,fanHeight-lidThickness],Cylinder(lidRadius,lidThickness))
lid = FilletEdges(lid,lidRounding,[0]);

// outlet
let outletBase  = (fanHeight - outletHeight)/2;
let outlet      = Translate([-0.2,0,outletBase], Box(outletWidth,outletLength,outletHeight) )
outlet          = FilletEdges(outlet,outletRounding,[1,3,5,7]);
let outlet_inner= Offset(outlet, -outletThickness, 0.001, true)
let outlet_in       = Translate([0,3,0],outlet_inner)

// handle
let handleBase = (fanHeight - handleHeight)/2;
let handle = Translate([0,-30,handleBase],Box(-handleLength,handleWidth,handleHeight))
handle = FilletEdges(handle,handleRounding,[11,10,9,8,]);
let button_cut = Translate([-50,-10,10],Box(recesWidth,recesDepth,recesHeight))
button_cut= FilletEdges(button_cut,recesRounding,[1,5,7,3])

// buttons
let button = Translate([-49,-10,11],Box(buttonWidth,buttonHeight,buttonLength))
button = FilletEdges(button,buttonRounding,[1,3,5,7]);
let button2 = Translate([5,0,0],button,true);
handle = Difference(handle,[button_cut]);

let handle_inner = Offset(handle,-handleThickness,0.001,true)

// creating hollow shape
let dryer_solid = Union([fanhousing,outlet],false,0.01,false);
dryer_solid = Union([dryer_solid,handle],false,0.01,false)
// dryer_solid = RemoveInternalEdges(dryer_solid);
dryer_solid = FilletEdges(dryer_solid,outletJunctionRound,[49]);
dryer_solid = FilletEdges(dryer_solid,handleJunctionRound,[39]);
dryer_solid = FilletEdges(dryer_solid,handleBottomRound,[70]);

let dryer_inner = Union([fanhousing_inner,outlet_in,handle_inner])
// let dryer_inner = Offset(dryer_solid,-1.5,0.3,true);
let dryer_hollow = Difference(dryer_solid,[dryer_inner],false,0.5,false);

// vanes
let vane = Translate([4,46,7.5],Box(1,15,15))
vane = ChamferEdges(vane,2,[10,11],false)
let vanes = []
for (let j=0;j<=3;j++)
{
    vanes[j] = Translate([5*(j+1),0,0],vane,true)
}

// creating a cut-away  
// comment and uncomment with CTRL-/ 
// let cutter = Translate([-100,-75,15],Box(150,150,25))
// let cutaway = Difference(dryer_hollow,[cutter]);