const defaultParams = {
  width: 50,
  height: 70,
  thickness: 30,
};

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */
const main = (
  { Sketcher, FaceSketcher, makeCylinder, makeOffset, FaceFinder},
  { width: myWidth, height: myHeight, thickness: myThickness }
) => {
  
    let bottleBelly = new Sketcher()
    .movePointerTo([-myWidth / 2, 0])
    .vLine(-myThickness / 4)
    .threePointsArc(myWidth, 0, myWidth / 2, -myThickness / 4)
    .vLine(myThickness / 4)
    .closeWithMirror()
    .extrude(myHeight)
    .fillet(myThickness / 12);

  const myNeckRadius = myThickness / 4;
  const myNeckHeight = myHeight / 10;
  
  const neck = makeCylinder(
    myNeckRadius,
    myNeckHeight,
    [0, 0, myHeight],
    [0, 0, 1]
  );

  let roughBottle = bottleBelly.fuse(neck);

  let hollowBottle = roughBottle.shell(myThickness / 50, (f) =>
    f.inPlane("XY", [0, 0, myHeight + myNeckHeight])
  );

  const neckFace = new FaceFinder()
    .containsPoint([0, myNeckRadius, myHeight])
    .ofSurfaceType("CYLINDRE")
    .find(hollowBottle.clone(), { unique: true });

  const bottomThreadFace = makeOffset(neckFace, -0.01 * myNeckRadius).faces[0];
  const baseThreadSketch = new FaceSketcher(bottomThreadFace)
    .movePointerTo([0.75, 0.25])
    .halfEllipse(2, 0.5, 0.2)
    .close();

  const topThreadFace = makeOffset(neckFace, 0.05 * myNeckRadius).faces[0];
  const topThreadSketch = new FaceSketcher(topThreadFace)
    .movePointerTo([0.75, 0.25])
    .halfEllipse(2, 0.5, 0.05)
    .close();

   const thread = baseThreadSketch.loftWith(topThreadSketch);
  
   let threadedBottle = hollowBottle.clone().fuse(thread)

    let display = [
//    bottleBelly, 
//    neck, 
    roughBottle,
    hollowBottle,
    neckFace,
//    bottomThreadFace,
//    baseThreadSketch,
//    topThreadFace,
//     topThreadSketch, 
    thread,
    threadedBottle
    ]

return display

};