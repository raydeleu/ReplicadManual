function main({Sketcher,Sketch, makeOffset,makeCylinder,cubicBezierCurveTo})
{
// Parameters

let length      = 100;
let width       = 40;
let height      = 20;
let r           = 15;
let r_ends      = 2;

// movePointerTo([x,y])
// lineTo([x,y])
// line(dx,dy)
// vLineTo(y)
// vLine(dy)
// hLineTo(x)
// hLine(dx)
// polarLineTo([radius,theta])
// polarLine(distance,angle)
// tangentLine(distance)
// threePointsArcTo(point_end,point_mid)
// threePointsArc(dx,dy,dx_via,dy_via)
// sagittaArcTo(point_end,sagitta)
// sagittaArc(dx,dy,sagitta)
// vSagittaArc(dy,sagitta)
// hSagittaArc(dx,sagitta)
// tangentArcTo([x,y])
// tangentArc(dx,dy)
// ellipseTo([x,y],r_hor,r_vert)
// ellipse(dx,dy,r_hor,r_vert)
// halfEllipseTo([x,y],r_min)
// halfEllipse(dx,dy,r_min)
// bezierCurveTo([x,y],points[])
// quadraticBezierCurveTo([x,y],[x_ctrl,y_ctrl])
// cubicBezierCurveTo([x,y],p_ctrl_start,p_ctrl_end)
// smoothSplineTo([x,y],splineconfig)
// smoothSpline(dx,dy,splineconfig)

let planView = new Sketcher().hLine(length-2*r).tangentArc(r,r).vLine(width-2*r).tangentArc(-0.75*r,r).line(-length*1.5+2*r,2*r).tangentArc(-r,-r).vLine(-width+2*r).tangentArc(r,-r).close().extrude(height).fillet(r_ends)

let planViewXZ = new Sketcher("XZ").hLine(length).vLine(width).line(-length*1.5+2*r,2*r).vLine(-width).close().extrude(height)
.fillet(r, (e)=>e.inDirection("Y"))
.fillet(r_ends, (e)=>e.inPlane("XZ"))
.fillet(r_ends, (e)=>e.inPlane("XZ",height))

let testSagittaArc = new Sketcher("XZ")
.hLine(10).hSagittaArc(50,-25).hLine(10).vLine(30).hLine(-70).close().extrude(20)

// let points = []
// points.push(p1)
// points.push(p2)
// points.push(p3)
// points.push(p4)

let p0 = [0,0]
let p1 = [50,100]
let p2 = [60,-95]
let p3 = [80,30]
let p4 = [100,25]

let points = [p1,p2,p3,p4]


let testBezier = new Sketcher("XZ")
        .movePointerTo(p0)
        .bezierCurveTo(p4,points)
        .done().extrude(20)


// let testBezier1 = testBezier.clone()
// let block = new Sketcher("XZ")
// .hLine(100).vLine(50).hLine(-100).close().extrude(30)
// let mollino = block.cut(testBezier)
// mollino = mollino.intersect(testBezier1.translate([0,0,5]))

let c1 = [50,50]
let c1s = [25,0]
let c1e = [25,50]
let c2 = [100,0]
let c2s = [75,50]
let c2e = [75,0]

let testCubicBezier = new Sketcher("XZ").movePointerTo([0,0]).cubicBezierCurveTo(c1,c1s,c1e).cubicBezierCurveTo(c2,c2s,c2e).vLine(-50).hLine(-100).close().extrude(20)

// let crossSection = new Sketcher("XY")
// .hLine(30)
// .vLine(5)
// .hLine(-30)
// .close()
// testBezier1 = new Sketch()
// testBezier.sweepSketch(crossSection)

// testBezier = Offset(testBezier,10)

let box = new Sketcher("XY")
            .hLine(100)
            .vLine(60)
            .hLine(-100)
            .close()
            .extrude(30)      
let boreHole = makeCylinder(40,40).translate([0,0,-5])

let boxGrown = makeOffset(box,3)
            .cut(box)
            .cut(boreHole)

 

let rectangleSketch = new Sketcher("XY")
            .hLine(100)
            .vLine(60)
            .polarLine(100/(Math.cos(30/180*Math.PI)),150)
            .close()
            .extrude(30)
let boreHole1 = makeCylinder(40,40).translate([-10,0,-5])
let symmetric = rectangleSketch.clone()
            .mirror("YZ",[-10,0])
            .fuse(rectangleSketch)
            .cut(boreHole1)
            
return [planView,planViewXZ,testSagittaArc,testBezier, testCubicBezier,boxGrown,symmetric]

} 