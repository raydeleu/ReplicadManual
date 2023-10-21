const {draw, drawCircle, drawRectangle} = replicad;

function main()
{
let bL = 20;
let h = 60; 
let baseProfile = drawRectangle(bL,bL/2).sketchOnPlane("XY")
let midProfile = drawCircle(12).sketchOnPlane("XY",h/2)
let topProfile = drawRectangle(bL/2,bL).sketchOnPlane("XY",h)

let tower = baseProfile.clone()
.loftWith([midProfile.clone(),topProfile.clone()],{ruled: false})
let tower2 = baseProfile
.loftWith([midProfile,topProfile],{ruled: true}).translate([40,40,0])

return [tower,tower2]
}
