function main({Sketcher, sketchCircle,Lever,leverHoles},{})
{

let r1  = 30;
let r2  = 12;
let d   = 90;
let t   = 5;
let h   = 20;

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



let shape = leverHoles(r1,r2,d,h,t);
let shapeArray =[{shape: shape, color: "steelblue"}]

return shapeArray;

}



