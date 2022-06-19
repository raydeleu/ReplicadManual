const main = (
  { Sketcher, sketchRectangle, sketchRoundedRectangle, sketchCircle },
  {}
) => {
  let p0 = [0, 0];
  let p1 = [50, 100];
  let p2 = [60, -110];
  let p3 = [70, 50];
  let p4 = [100, 25];
  let points = [p1, p2, p3, p4];

// create wavy path
let basePath = new Sketcher("XZ")
    .movePointerTo(p0)
    .bezierCurveTo(p4, points)
    .done()

// sweep a rectangle along the wavy path
let baseShape = basePath.clone().sweepSketch((plane, origin) => 
                sketchRectangle(2, 30, { plane, origin }));
//                    sketchCircle(5,{ plane, origin }));

// create a path consisting of rounded rectangle
let topPath = sketchRoundedRectangle(110,30,5,{plane:"XY",origin:[50,0,26]})

// create a triangle cross section
function topSection(plane,origin) 
{let section = new Sketcher(plane,origin)
    .hLine(10)
    .vLine(-5)
    .hLine(-8)
    .vLine(-26)
    .hLine(-2)
    .close()
  return section
}  

// sweep the triangle along the rounded rectangle
let topSweep   = topPath.sweepSketch((plane, origin) => topSection(plane,origin));

// fuse the two shapes together to display them
// return baseShape.fuse(topSweep)
return basePath
};