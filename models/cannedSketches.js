function main({
    sketchCircle,
    sketchEllipse,
    sketchRectangle,
    sketchRoundedRectangle,
    sketchPolysides,
    polysideInnerRadius,
    sketchParametricFunction,
    Plane})
{

let height = 10;
let radius = 20;
let fillet = 2;
let sides = 6;
let sagitta = -1;
let thickness = 1;

// sketchCircle
let circle = sketchCircle(radius,new Plane([0, 0, height])).extrude(height)

// sketchEllipse
let ellipse = sketchEllipse(1.5*radius,radius/2,
    {
    plane: "YZ",
    origin: [0, 0, height / 2]
    })
    .extrude(height)

// sketchRectangle
let box = sketchRectangle(radius,radius*2).extrude(30)
// 

// sketchRoundedRectangle
let box2 = sketchRoundedRectangle(radius*2,radius*3,fillet).extrude(2)

// sketchPolysides
let innerRadius = polysideInnerRadius(radius,sides,sagitta);
let poly = sketchPolysides(radius,sides,sagitta).extrude(height*5)
let hole = sketchCircle(innerRadius-thickness,{plane:"XY",origin:[0,0,4*height]}).extrude(20)

// sketchParametricFunction

// let wave = sketchParametricFunction((t)=>radius*(2-Math.sin(t*2*Math.PI))).extrude(6*height)

circle = circle.fuse(ellipse)
circle = circle.fuse(box)
circle = circle.fuse(box2)
circle = circle.fuse(poly)
circle = circle.cut(hole)
// circle = circle.fuse(wave)


return circle


}     