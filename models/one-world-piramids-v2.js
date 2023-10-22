const {draw,drawRectangle,drawCircle,makeCylinder} = replicad

function main()
{
let scale = 1/10
let baseLength = 200*scale;
let topLength = Math.sqrt((2*Math.pow((baseLength/2),2)))
let totalHeight = 1368*scale
let baseHeight = 196.85*scale
let heightTop = (totalHeight-baseHeight)
let cylinderHeight = 50*scale
let spikeHeight = 250*scale
let spikeBaseR = 10*scale

// create 4 piramids 
let pMid1 = drawRectangle(topLength,topLength).sketchOnPlane("XY")
.extrude(heightTop,{extrusionProfile: {profile: "linear", endFactor: 0.01}})
.rotate(45,[0,0]).translate(-baseLength/2,-baseLength/2)
let pMid2 = pMid1.clone().translate(baseLength,0)
let pMid3 = pMid1.clone().translate(0,baseLength)
let pMid4 = pMid1.clone().translate(baseLength,baseLength)

// create straight segment, cut with piramids, rotate and translate
let baseProfile = drawRectangle(baseLength,baseLength).sketchOnPlane("XY")
let towerTopPrism = baseProfile.clone().extrude(heightTop)
let towerTop = towerTopPrism.clone().cut(pMid1).cut(pMid2).cut(pMid3).cut(pMid4)
towerTop = towerTop.rotate(180,[0,0,0],[0,1,0]).translate(0,0,totalHeight)
let towerBase = baseProfile.extrude(baseHeight)
let tower = towerBase.fuse(towerTop)
let topCylinder = makeCylinder(topLength/1.8,5).translate(0,0,totalHeight)
tower = tower.fuse(topCylinder);
let spike = drawCircle(spikeBaseR).sketchOnPlane("XY")
spike = spike.extrude(spikeHeight,{extrusionProfile: {profile: "linear", endFactor: 0.01}})
.translate(0,0,totalHeight+cylinderHeight)
tower = tower.fuse(spike).translate(40,0,0)

return [
{shape: pMid1, color: "yellow"},
{shape: pMid2, color: "yellow"},
{shape: pMid3, color: "yellow"},
{shape: pMid4, color: "yellow"},
{shape: towerTopPrism, color: "darkred"},
{shape: tower}
]
}