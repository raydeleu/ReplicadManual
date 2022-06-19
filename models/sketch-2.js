function main({Sketcher})
{
let sketch = new Sketcher("XZ",-5)
// .hLine(20)
// .vLine(20)
// .hLineTo(25)
// .vLineTo(25)
.ellipse(10,10,5,20,180,360,true)
// .hLine(-30)
// .tangentLine(2)
// .halfEllipse(-10,-10,10,270,360,true)
// .hLine(5)
.close()

// let sketch2 = new Sketcher("XZ",5)
// .hLine(20)
// .smoothSpline(20,20,null,270)
// .hLine(-40)
// .close()



let shape  = sketch.extrude(5)
// let shape2 = sketch2.extrude(5)

return shape
}