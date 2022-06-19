const main = ({ Sketcher, 
                makeOffset,
                makeCylinder 
            }) => 

{

// create a house with a pointed roof
let houseSketch = new Sketcher("XZ")
        .vLine(50)
        .line(10,25)
        .line(10,-25)
        .vLine(-50)
        .close()

let house = houseSketch.extrude(40)

// offset this shape
house = makeOffset(house,3).translate([0,60,0])

// create a cylinder
let cylinder = makeCylinder(10,30,[0,90,0],[0,0,1])
cylinder = makeOffset(cylinder,3)



// create a shape with a wave-like curve
let p0 = [0,0]
let p1 = [40,50]
let p1s = [0,20]
let p1e = [20,50]
let p2s = [50,50]
let p2e = [60,40]
let p2 = [60,30]
let p3s = [60,20]
let p3e = [70,30]
let p3 = [80,30]
let p4 = [100,20]
let points = [p0,p1,p2,p3,p4]

let testBezier = new Sketcher("XZ")
        .movePointerTo(p0)
        .cubicBezierCurveTo(p1,p1s,p1e)
        .cubicBezierCurveTo(p2,p2s,p2e)
        .cubicBezierCurveTo(p3,p3s,p3e)
        .vLine(-40)
        .hLine(-80)
        .close()
testBezier = testBezier.extrude(30)

// offset this shape
testBezier = makeOffset(testBezier,5,1e-2)

house = house.fuse(testBezier)
house = house.fuse(cylinder)

return house
}