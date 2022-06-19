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
let p1 = [20,50]
let p2 = [40,50]
let p3 = [50,50]
let p4 = [70,20]
let p5 = [78,10]
let p6 = [100,10]
let p7 = [90,20]
let p8 = [100,25]

let points = [p0,p1,p2,p3,p4]

let testBezier = new Sketcher("XZ")
        .movePointerTo(p0)
        .quadraticBezierCurveTo(p2,p1)
        .quadraticBezierCurveTo(p4,p3)
        .quadraticBezierCurveTo(p6,p5)
        .vLine(-40)
        .hLine(-100)
        .close()
testBezier = testBezier.extrude(30)

// offset this shape
testBezier = makeOffset(testBezier,5,1e-2)

house = house.fuse(testBezier)
house = house.fuse(cylinder)

return house
}