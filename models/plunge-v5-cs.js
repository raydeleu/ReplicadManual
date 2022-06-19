// Model of the Plunge watering carafe designed by Robert Bronwasser

// side profile of the bottom of the carafe
let p0 = [0,0]
let p1 = [20,0]
let p2 = [30,5]
let p3 = [30,8]
let p4 = [8,100]
let p5 = [0,100]

let sideview = new Sketch(p0)
.LineTo(p1)
.LineTo(p2)
.LineTo(p3)
.LineTo(p4)
.LineTo(p5)
.End(true,false)
.Face(false)

// sketch that is on XY plane is revolved around y-axis and then turned 
// around x-axis to put it upright
let body = Revolve(sideview,360,[0,1,0],false,false);
body = Rotate([1,0,0],90,body,false);

// create cross sections of the filler for the carafe
// use loft functions to create the shape
let fill_hole  = Translate([-35,0,135],Rotate([0,1,0],-70,(Circle(12,true))));
let topbody = Translate([0,0,100],(Circle(8,true))); 
let bottom = Translate([0,0,80],Rotate([0,1,0],20,(Circle(9,true)))); 
let filler    = Loft([fill_hole,topbody,bottom]);

// create cross sections for the sprout 
let sprout  = Translate([48,0,150],Rotate([0,1,0],10,(Circle(5,true))));
let neck    = Translate([10,0,110],Rotate([0,1,0],10,(Circle(5,true)))); 
let neckbottom = Translate([0,0,100],(Circle(5,true)));
let nose = Loft([sprout,neck,neckbottom])

// union the main body with the filler and fillet the junction
let plunge = Union([body,filler],false,0.1,true);
plunge = FilletEdges(plunge,30,[5]);

// union the shape with the sprout and fillet the junction
let plunge2 = Union([plunge,nose],false,0.1,false);
plunge2 = FilletEdges(plunge2,10,[1,2]);
plunge2 = RemoveInternalEdges(plunge2);

// create cutter boxes 
let cutterFiller = Translate([-25,0,142],Rotate([0,1,0],-25,Box(40,40,30,true)))
let cutterSprout = Translate([48,0,145],Rotate([0,1,0],10,Box(40,40,20,true)))
// let bigCutter = Translate([-40,2,-40],Box(100,50,200))

// plunge2 = Difference(plunge2,[bigCutter],false,1,false)
plunge2 = RemoveInternalEdges(plunge2);
let plungeInner = Offset(plunge2,-1,0.5,true)

let plunge3 = Difference(plunge2,[plungeInner])
let plunge4 = Difference(plunge3,[cutterFiller])
let plunge5 = Difference(plunge4,[cutterSprout])