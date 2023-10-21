const {draw} = replicad;

function main()
{
let baseProfile = draw([-10,-10]).hLine(20).vLine(20).hLine(-20).close()

let tower = baseProfile.clone().sketchOnPlane("XY")
.extrude(100,{extrusionProfile: { profile: "linear", endFactor: 0.7 }, twistAngle:45})

let tower2 = baseProfile.clone().sketchOnPlane("XY")
.extrude(100,{extrusionProfile: { profile: "s-curve", endFactor: 0.7 }, twistAngle:45})

let tower3 = baseProfile.clone().translate([30,30]).sketchOnPlane("XY")
.extrude(100,{origin: [30,30],twistAngle:45})

let tower4 = baseProfile.clone().translate([30,30]).sketchOnPlane("XY")
.extrude(100,{twistAngle:45})

let tower5 = baseProfile.clone().translate(60,60).sketchOnPlane("XY")
.extrude(100)

return [tower,
{shape: tower2, color: "red"},
tower3,
{shape: tower4, color:"grey"},
tower5
]
}