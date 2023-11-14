const {draw, makeSphere,revolution} = replicad;
function main()
{
let ball = makeSphere(10)
let profile = draw().hLine(50).vLine(30).hLine(-50).close()
.sketchOnPlane("XZ")
let bodyRevolution = revolution(profile.face(),[0,0,0],[0,0,1],90)

return [ball,bodyRevolution]
}