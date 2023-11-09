const {draw,drawRectangle,makeCylinder,makeBaseBox,importSTEP} = replicad

function main()
{
// .ellipse(dx,dy,radius_x,radius_y,rotated axis,long route?,counter clockwise?)
// startpoint and endpoint have to be different! 

let arcEllipse = draw([0,40])
.line(10,0)
.ellipse(10,10,20,10,0,true,true)
.close()
.sketchOnPlane("XY")

let arcEllipse2 = draw([0,20])
.line(10,0)
.ellipse(10,10,20,10,0,false,true)
.close()
.sketchOnPlane("XY")

let arcEllipse3 = draw([0,0])
.line(10,0)
.ellipse(10,10,20,10,0,true,false)
.close()
.sketchOnPlane("XY")

let arcEllipse4 = draw([0,-20])
.line(10,0)
.ellipse(10,10,50,10,135,false,true)
.close()
.sketchOnPlane("XY")

return [
{shape: arcEllipse, color:"steelblue"}
,{shape: arcEllipse2, color:"red"}
,{shape: arcEllipse3, color:"purple"}
,{shape: arcEllipse4, color:"green"}
//,{shape: dropSide, color:"green"}
]}