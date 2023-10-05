function main({Sketcher, sketchCircle,Lever,leverHoles, makeCylinder},{})
{

let r1  = 12.5;
let r2  = 6;
let d   = 35;
let t   = 3;
let h   = 22;
let fl  = 22;

// function to create a lever consisting of two circles connected with tangent lines 
// 
// radius1 = radius of circle that is located around the origin
// radius2 = radius of circle that is located at distance D along x-axis
// distance = distance between the two circles
// leverheight = distance over which lever is extruded in z-direction
// 
// note that this function creates a closed shape. If you want holes you have to create two cylinders at 
// the correct position, extrude these a bit more than the leverheight and subtract these from the shape.  

function Lever(radius1, radius2, distance, leverHeight)
{
    let sinus_angle = (radius1 - radius2) / distance
    let angle = Math.asin(sinus_angle);

    // points of outer contour of the lever
    let p1 = [radius1 * Math.sin(angle), radius1 * Math.cos(angle)];
    let p2 = [distance + radius2 * Math.sin(angle), radius2 * Math.cos(angle)];
    let p3 = [distance + radius2, 0];
    let p4 = [distance + radius2 * Math.sin(angle), - radius2 * Math.cos(angle)];
    let p5 = [radius1 * Math.sin(angle), - radius1 * Math.cos(angle)];
    let p6 = [- radius1, 0 ];

    let sketchLever = new Sketcher("XY").movePointerTo(p1)
                    .lineTo(p2)
                    .threePointsArcTo(p4,p3)
                    .lineTo(p5)
                    .threePointsArcTo(p1,p6)
                    .close();
              
    let leverBody = sketchLever.extrude(leverHeight);
       
    return leverBody
}


// function to create lever with holes with standard wallthickness around the holes
// radii refer to outer radii, the holes will be radius - wallThickness
// uses the function lever to create the basic shape 

function leverHoles(radius1,radius2,distance,leverHeight,wallThickness)
{ 
    let leverBody = Lever(radius1,radius2,distance,leverHeight);

    let orig_hole  = sketchCircle(radius1-wallThickness).extrude(leverHeight + 10);
    let dist_hole =  sketchCircle(radius2-wallThickness).extrude(leverHeight + 10).translate([distance,0,0]);
    let lever   = leverBody.cut(orig_hole)
    lever       = lever.cut(dist_hole);
    return lever
}


// test of lever functions



let arm1 = Lever(r1,r2,d,h);
let arm2 = Lever(r1,r2,d,h).rotate(120,[0,0,0],[0,0,1])
let arm3 = Lever(r1,r2,d,h).rotate(240,[0,0,0],[0,0,1])
let threeArm = arm1.fuse(arm2);
threeArm = threeArm.fuse(arm3).fillet(fl,(e)=>e.inDirection("Z"));

let side = new Sketcher("XZ").movePointerTo([41,6])
.lineTo([50,6]).lineTo([50,30]).lineTo([0,30])
.lineTo([0,22]).lineTo([11,22]).lineTo([11,6+(30*Math.sin(22*Math.PI/180))])
.close()

let sideCutter = side.revolve()
// NOTE: sideCutter is rotated to avoid edge over first arm!!!
sideCutter = sideCutter.rotate(60,[0,0,0],[0,0,1]);
threeArm = threeArm.cut(sideCutter,false,false)
threeArm = threeArm.fillet(1,(e)=>e.inBox([50,50,2],[-50,-50,20]));

let bigBore = sketchCircle(8).extrude(40).translate([0,0,-10]);
threeArm = threeArm.cut(bigBore);

let smallBore = makeCylinder(4.5/2,22,[0,0,0],[0,0,1]).translate([35,0,-5])
let smallBore1 = makeCylinder(4.5/2,22,[0,0,0],[0,0,1]).translate([35,0,-5]).rotate(120,[0,0,0],[0,0,1])
let smallBore2 = makeCylinder(4.5/2,22,[0,0,0],[0,0,1]).translate([35,0,-5]).rotate(240,[0,0,0],[0,0,1])
let smallBore3 = makeCylinder(4.5/2,22,[0,0,0],[0,0,1]).translate([35,0,-5]).rotate(360,[0,0,0],[0,0,1])
// let smallBore1 = smallBore.clone().rotate(120,[0,0,0],[0,0,1])

//let smallBore2 = smallBore1.clone().rotate(120,[0,0,0],[0,0,1])
// threeArm = threeArm.cut(smallBore)
threeArm = threeArm.cut(smallBore1)
threeArm = threeArm.cut(smallBore2)
threeArm = threeArm.cut(smallBore3)

let counterBore1 = makeCylinder(6/2,22,[0,0,0],[0,0,1]).translate([35,0,4])
let counterBore2 = makeCylinder(6/2,22,[0,0,0],[0,0,1]).translate([35,0,4]).rotate(120,[0,0,0],[0,0,1])
let counterBore3 = makeCylinder(6/2,22,[0,0,0],[0,0,1]).translate([35,0,4]).rotate(240,[0,0,0],[0,0,1])
threeArm = threeArm.cut(counterBore1)
threeArm = threeArm.cut(counterBore2)
threeArm = threeArm.cut(counterBore3)




let shapeArray =[{shape: threeArm, color: "steelblue"}
//{shape: sideCutter, color:"grey", opacity:0.5}
]

return shapeArray;

}



