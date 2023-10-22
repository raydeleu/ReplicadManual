const {draw} = replicad

function main()
{
let scale = 1/10
let baseLength = 200*scale;
let topLength = Math.sqrt((2*Math.pow((baseLength/2),2)))
let height = (1368-196.85)*scale

let baseProfile = draw()
.hLine(baseLength).vLine(baseLength).hLine(-baseLength)
.close()
baseProfile = baseProfile.translate([-baseLength/2,-baseLength/2]).sketchOnPlane("XY")

let midProfile = draw().hLine(baseLength/2).polarLine(topLength/2,45).vLine(baseLength/2)
.polarLine(topLength/2,135).hLine(-baseLength/2).polarLine(topLength/2,225)
.vLine(-baseLength/2).close()
midProfile = midProfile.translate([-baseLength/4,-baseLength/2]).sketchOnPlane("XY",height/2) 


let topProfile = draw().polarLine(topLength,45).polarLine(topLength,135)
.polarLine(topLength,225).close()
topProfile = topProfile.translate([0,-baseLength/2]).sketchOnPlane("XY", height)

let tower = baseProfile.clone().loftWith([midProfile.clone(),topProfile.clone()],{ruled:true})
let tower1 = baseProfile.clone().loftWith([midProfile.clone(),topProfile.clone()],{ruled:false})
.translate(30,0,0)
let tower2 = baseProfile.clone().loftWith(topProfile.clone(),{ruled:true}).translate(60,0,0)



return [
{shape: baseProfile}
,{shape:midProfile}
,{shape:topProfile}
,{shape: tower}
,{shape: tower1}
,{shape: tower2}
]

}