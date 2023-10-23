const { draw, drawCircle } = replicad;

const main = () => {

let drawing1 = draw().hLine(25).halfEllipse(0, 40, 5).hLine(-25).close()
let drawing2 = drawCircle(8).translate([20,10])
drawing1 = drawing1.cut(drawing2)
// drawing1 = drawing1.fuse(drawing2)
// drawing1 = drawing1.intersect(drawing2)


  return drawing1;
};