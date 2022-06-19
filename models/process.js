function main({
    Sketcher,
    makeCircle,
    sketchRectangle,
    sketchCircle,
    makeCompound,
    assembleWire,
    makeSphere,
    makeCylinder})
{ 
let sketch = new Sketcher("XY")
    .line(10,-5)
    .hLine(10)
    .vLine(10)
    .line(5,5)
    .vLine(10)
    .hLine(-25)
    .close()
    .extrude(30)
    .fillet(2)
    .rotate(45,[0,0,0],[0,1,0])
    .rotate(-60,[0,0,0],[1,0,0])

// let sketch = sketchCircle(5,[0,-100,0]).extrude(0.1)
// let sketch2 = makeCircle(5,[-2,-150,0]).extrude(0.1)
// let sketch = sketchRectangle(10,20,{origin:[-10,-20,0]}).extrude(0.1)
// sketch = assembleWire(sketch1,sketch3)

let shape = makeSphere(15,[0,0,0])
// let box = makeCylinder(10,20).translateX(15)
// return shape.fuse(box)
return sketch.fuse(shape).fillet(2)
}
