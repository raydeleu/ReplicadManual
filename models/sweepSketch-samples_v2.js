const {Sketcher, sketchRectangle, sketchRoundedRectangle,draw}=replicad

const main = () => {
  let p0 = [0, 0];
  let p1 = [50, 100];
  let p2 = [60, -110];
  let p3 = [70, 50];
  let p4 = [100, 25];
  let points = [p1, p2, p3, p4];

// create wavy path on XZ plane
let basePath = new Sketcher("XZ")
    .movePointerTo(p0)
    .bezierCurveTo(p4, points)
    .done()

// sweep a rectangle along the wavy path
let baseShape = basePath.clone().sweepSketch((plane, origin) => 
                sketchRectangle(2, 30, { plane, origin }))
                .translate(0,-40);

// create a path consisting of rounded rectangle
let topPath = sketchRoundedRectangle(110,30,5,{plane:"XY",origin:[50,0,26]})

// create an L-shaped cross section
function ringSection(plane,origin) 
{let section = new Sketcher(plane,origin)
    .hLine(10).vLine(-3).hLine(-8)
    .vLine(-26).hLine(-2).close()
  return section}  

let ringSectionDraw=draw()
.hLine(10).vLine(-3).hLine(-8)
.vLine(-26).hLine(-2).close().sketchOnPlane("YZ")

// sweep the L-shaped section along the rounded rectangle
let topSweep   = topPath.sweepSketch((plane, origin) => ringSection(plane,origin))
.translate(0,60)

return [topSweep, baseShape, ringSectionDraw]}