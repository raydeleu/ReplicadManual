const main = ({ Sketcher, 
                makeOffset }) => 

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

// create a shape with a wave-like curve
let p0 = [0,0]
let p1 = [50,100]
let p2 = [60,-95]
let p3 = [80,30]
let p4 = [100,25]
let points = [p1,p2,p3,p4]

let testBezier = new Sketcher("XZ")
        .movePointerTo(p0)
        .bezierCurveTo(p4,points)
        .vLine(-30)
        .hLine(-100)
        .close()
testBezier = testBezier.extrude(30)

// offset this shape
// testBezier = makeOffset(testBezier,3)

house = house.fuse(testBezier)

return house
}