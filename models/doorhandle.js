//home/lee/Code/lee/ScreenDoorHandle/main.rcad:1.1,58.1
// All measurements are in millimeters.

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */

const defaultParams = {
};

const main = ({ Sketcher, sketchRectangle, sketchCircle, Plane, makeSphere,FaceFinder }, {}) => {
  const handleBase = new Sketcher("XY")
    .vLine(89.0)
    .hLine(20.5)
    .line( 57.0 - 20.5, -3.5)
    .vLine(-82.0)
    .line(-57.0 + 20.5, -3.5)
    .hLine(-20.5)
    .close()
    .extrude(9.0)
    .fillet(5.0, e => e.inDirection('Z').containsPoint([57, 3.5, 0]))
    .fillet(5.0, e => e.inDirection('Z').containsPoint([57, 89.0 - 3.5, 0]))
    .fillet(1.0, e => e.inBox([0,0,9], [20.5, 89.0, 0]))
   
  const border = 3.0;

  const fingerAreaNegative = new Sketcher("XY")
    .line( 57.0 - 20.5 - border, -3.5)
    .vLine(-82.0 + (border * 2))
    .line(-57.0 + 20.5 + border, -3.5)
    .close()
    .extrude(30.0)  // =RD= increased this to 30 mm as example
    .fillet(5.0, edgeFilter => edgeFilter.inDirection('Z'))
    .fillet(1.5);   // =RD= added a fillet here

  const lockNegative = sketchRectangle(25.0, 7.0)
    .extrude(20.0)
    .rotate(90, undefined, [1, 0, 0])
    .rotate(90, undefined, [0, 0, 1])
    .translate([0, 0, 3.5]);

  const lockSmallTabSpaceNegative = sketchRectangle(15.0, 5.0)
    .extrude(3.0)
    .rotate(90, undefined, [1, 0, 0])
    .rotate(90, undefined, [0, 0, 1])
    .translate([0, 0, 2.5]);

  const screwHole = sketchCircle(4.0, new Plane([0, 0, 0]))
    .loftWith([
      sketchCircle(1.5, new Plane([0, 0, -3.0])),
      sketchCircle(1.5, new Plane([0, 0, -9.0]))
    ])
    .translate([0.0, 0.0, 9.0]);

  const cutFingerArea = handleBase.cut(fingerAreaNegative.translate([20.5, 89 - border, 2.0]));
  // const filletFingerArea = cutFingerArea.fillet(0.8) // Here
  const filletFingerArea = cutFingerArea // Here
  const cutLock = filletFingerArea.cut(lockNegative.translate([2.0, 89.0 / 2, 0]));
  const cutLockTab = cutLock.cut(lockSmallTabSpaceNegative.translate([57 - 3, 89.0 / 2, 0]));
  const cutScrewHoleTop = cutLockTab.cut(screwHole.clone().translate([10.0, 6.0, 0.0]));
  const cutScrewHoleBottom = cutScrewHoleTop.cut(screwHole.translate([10.0, 89.0 - 6.0, 0.0]));
  
  const handle = cutScrewHoleBottom
 //  let marker = makeSphere(1).translate([57.0 - 20, 89 / 2, 2.0]);
 //  const handle = cutScrewHoleBottom.fuse(marker);
  return {shape: handle,  highlight: new FaceFinder().inPlane("XY", 9)};
}