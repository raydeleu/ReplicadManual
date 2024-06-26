const { sketchRoundedRectangle } = replicad;

function main() 
{
  // code to describe the shape
  const bandWidth = 22.5;    // width of watch band, 20mm
  const keeperWidth = 6;    // length of the keeper
  const bandThickness = 3.25*2; // thickness of watch band
  const thickness = 1.5 ; // garmin 2.2, fillet 1.5
  const fillet = 0.5;  // thickness 1.5 with fillet 1.5 has more flex

  let innerShape = sketchRoundedRectangle(bandWidth,bandThickness,fillet);
  innerShape = innerShape.extrude(keeperWidth+2);
  let oBw = bandWidth + 2*thickness;
  let oBt = bandThickness + 2*thickness;
  let outerShape = sketchRoundedRectangle(oBw,oBt,fillet+thickness)
  outerShape = outerShape.extrude(keeperWidth)
  outerShape = outerShape.cut(innerShape)
  outerShape = outerShape.fillet(0.5)

  // nub to catch the band, printed in PLA it is not usable. 
  // let nub = sketchRoundedRectangle(4,2,0.5).extrude(3)
  // nub = nub.rotate(90,[0,0,0],[1,0,0]).translateZ(1).translateY(-2)
  // outerShape = outerShape.fuse(nub)

return outerShape 
} 
