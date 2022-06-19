const main = ({ sketchCircle, sketchRectangle }) => {
  
  let loft = sketchRectangle(5, 10).loftWith([
    sketchCircle(8, { origin: 10 }),
    sketchRectangle(5, 10, { origin: 20 }),
  ],{ruled:true});

// if radius of cylinder is 2, shape is absorbed in loft
// shell fails, 
// if radius is 3, you get message "shape has not type, it is null"
// if radius of cylinder is 10, shell succeeds, 
// of radius is 8 you first see a combination of shapes, then 
// the loft disappears? 
// if { ruled: false} the result are kernel errors

  let cylinder = sketchCircle(6).extrude(20)
  loft = loft.fuse(cylinder)

  loft = loft.shell(-0.5,(f) => f.inPlane("XY",[0,0,20]))

  return loft
};
