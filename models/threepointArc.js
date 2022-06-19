function main({Sketcher})
{

let sketch = new Sketcher("XY")
            .movePointerTo([0,100])
            .hLine(20)
            // .threePointsArc(0,10,5,5)
            .tangentArc(0,10)
            .hLine(-22)
            .close()

sketch = sketch.extrude(2)

return sketch




}