const {draw,makeCylinder,makeBaseBox} = replicad

// Number of functions to make drawing easier
function Polar(currentPoint,distance,angleDegToX)
{
    let newPoint = [];
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + distance * Math.cos(angleRad);
    newPoint[1]  = currentPoint[1] + distance * Math.sin(angleRad);
    return newPoint
}

function PolarX(currentPoint,xdistance,angleDegToX)
{
    let newPoint = [];
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + xdistance;
    newPoint[1]  = currentPoint[1] + xdistance * Math.tan(angleRad);
    return newPoint
}

function PolarY(currentPoint,ydistance,angleDegToX)
{
    let newPoint = [];
    let angleRad = angleDegToX * Math.PI/180;
    newPoint[0]  = currentPoint[0] + ydistance/Math.tan(angleRad);
    newPoint[1]  = currentPoint[1] + ydistance;
    return newPoint
}


function main()
{
let radius1 = 20

let p1 = [radius1,0]
let p2 = PolarY(p1,5,100)
let p3 = PolarY(p2,5,120)
let p4 = PolarY(p3,5,135)
let p5 = [0,radius1]
let p6 = PolarY(p5,-5,200)
let p7 = PolarY(p6,-5,220)
let p8 = PolarY(p7,-5,240)
let p9 = PolarY(p8,-5,260)

let circle1 = draw()
.lineTo(p1)
.lineTo(p2)
.lineTo(p3)
.lineTo(p4)
.lineTo(p5)
.lineTo(p6)
.lineTo(p7)
.lineTo(p8)
.close()
.sketchOnPlane("XZ")
.extrude(10)

return circle1

}