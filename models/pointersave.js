function main({Sketcher, sketchCircle})
{

const DEG2RAD = Math.PI/180.0;
const RAD2DEG = 180.0/Math.PI;
let radius1 = 20
let radius2 = 10
let distance = 100
let sep = 38
let t1 = 5
let t2 = 5
let t3 = 8
let width = 2*radius1 + 10
let angle = Math.atan((sep/2 +t1-(t2/2))/(distance-(2*t3)-radius1-radius2))*RAD2DEG

function SideView(radius1, radius2, distance, angle, sep, t1, t2, t3) {
    const sideShapeMaker = new Sketcher("XZ")
      .movePointerTo([distance + radius2 + t3, 0])
      .vLine(t2 / 2)
      .hLine(-(radius2 + t3) * 2)
      .lineTo([radius1 + t3, sep / 2 + t1])
      .hLine(-(radius1 + t3) * 2)
      .vLine(-t1)
      .hLine((radius1 + t3) * 2)
      .polarLine((sep/2)/Math.sin(angle*DEG2RAD), -angle);

    const centerPoint = sideShapeMaker.pointer;
    console.log(centerPoint);

    const sideShape = sideShapeMaker.closeWithMirror();
    return sideShape;
  }

let sideSketch = SideView(radius1, radius2, distance, angle, sep, t1, t2, t3);

return sideSketch.extrude(width)

} 

