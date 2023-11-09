const {draw,drawRectangle,makeCylinder,makeBaseBox,importSTEP} = replicad

function main()
{
// .ellipse(dx,dy,radius_x,radius_y,rotated axis,long route?,counter clockwise?)
// startpoint and endpoint have to be different! 

let arc = draw([0,40])
.line(10,0)
.threePointsArc(20,20,40,10)
.line(-30,0)
.close()
.sketchOnPlane("XY")

let arc1 = draw([0,40])
.line(10,0)
.tangentArc(20,20)
.line(-60,0)
.close()
.sketchOnPlane("XY",5)

let arcEllipse2 = draw([20,20])
.line(10,0)
.tangentArc(20,20)
.line(-30,0)
.close()
.sketchOnPlane("XY")

let arcEllipse3 = draw([-20,20])
.line(10,0)
.tangentArc(20,10)
.line(0,10)
.line(-30,0)
.close()
.sketchOnPlane("XY")

let arcEllipse4 = draw([-20,-20])
.line(10,0)
.tangentArc(0,20)
.line(-10,0)
.close()
.sketchOnPlane("XY")

let arcEllipse5 = draw([20,-20])
.line(10,0)
.tangentArc(-15,-10)
.close()
.translate(0,20)
.sketchOnPlane("XY")


return [
//{shape: arc, color:"steelblue"}
//,{shape: arc1, color:"red", opacity:0.5}
,{shape: arcEllipse2, color:"red", opacity:0.5}
,{shape: arcEllipse3, color:"purple"}
,{shape: arcEllipse4, color:"green"}
,{shape: arcEllipse5, color:"green"}
//,{shape: dropSide, color:"green"}
]}