const {draw} = replicad;

function main()
{
let bL = 20;
let tL = bL*0.7;
let h = 1260/10; 
let baseProfile = draw([-bL/2,-bL/2]).hLine(bL).vLine(bL).hLine(-bL).close()
let midProfile = draw([-bL/2,-bL/2]).hLine(bL).vLine(bL).hLine(-bL).close()
let topProfile = draw([-tL/2,-tL/2]).hLine(tL).vLine(tL).hLine(-tL).close().rotate(45)
baseProfile = baseProfile.sketchOnPlane("XY")
midProfile = midProfile.sketchOnPlane("XY",60)
topProfile = topProfile.sketchOnPlane("XY",h)
let tower = baseProfile.clone().loftWith([midProfile.clone(),topProfile.clone()],{ruled: false})
let tower2 = baseProfile.loftWith([midProfile,topProfile],{ruled: true}).translate([40,40,0])

return [tower,tower2]
}