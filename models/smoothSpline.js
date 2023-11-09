const {draw} = replicad

function main()
{
let spline = draw()
.smoothSplineTo([20,0],
{startTangent:90, startFactor: 2, 
endTangent:-90, endFactor: 2}).done()

let  spline2 = draw()
.smoothSplineTo([10,7.5])
.smoothSplineTo([20,0]).done()

let spline3 = draw()
.lineTo([0,3])
.smoothSplineTo([10,7.5])
.line(0,-3)
.smoothSplineTo([20,3])
.lineTo([20,0]).done()

let spline4 = draw()
.smoothSplineTo([0,10],
{startTangent:180, startFactor: 2.63, 
endTangent:0, endFactor: 2.63})
.done().translate(10.0)

let arc = draw()
.threePointsArcTo([0,10],[-5,5])
.done().translate(10,0)

return [
{shape: spline, color: "red"},
{shape: spline2, color: "blue"},
{shape: spline3, color: "green"},
//{shape: spline4, color: "black"},
//{shape: arc, color: "purple"}
]
}