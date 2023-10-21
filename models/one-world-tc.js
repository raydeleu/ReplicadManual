const {draw, drawRectangle, makePolygon, makeSolid, makeBaseBox} = replicad;

function main()
{
let bL = 200/10;  // base length is 200 ft
let h = 1368/10;  // height 1368 ft
let m = (60/0.3048)/10; // first 60 meters are straight, converted to feet

    function antiPrism(bLength,prismHeight,endScale)
    {
        let bL = bLength/2;
        let tL = bL/Math.sin(Math.PI/4)
        let base=[]
        base[1] = [-bL,-bL,0];
        base[2] = [bL,-bL,0];
        base[3] = [bL,bL,0];
        base[4] = [-bL,bL,0];
        base[5] = base[1]   // trick to avoid need for modulus 4

        let top=[]
        top[1] = [0  ,-tL*endScale ,prismHeight]
        top[2] = [tL*endScale  , 0  ,prismHeight]
        top[3] = [0 ,tL*endScale  ,prismHeight]
        top[4] = [-tL*endScale ,0   ,prismHeight]
        top[5] = top[1]    // trick to avoid need for modulus 4

        let face=[]
        face[1] = makePolygon([base[1],base[4],base[3],base[2]]);        
        // not defined counterclockwise to have face facing in negative z-direction
        for (let i=2 ; i<=8; i+=2)
            {
            face[i]     = makePolygon([top[i/2],base[i/2],base[i/2+1]]);
            face[i+1]   = makePolygon([base[i/2+1],top[i/2+1],top[i/2]]);
            }
        face[10] = makePolygon([top[1],top[2],top[3],top[4]]);
        return face;
        }
let faces = antiPrism(bL,h-m,Math.sin(Math.PI/4));
let tower = makeSolid(faces).translate(0,0,m);
let towerbase = drawRectangle(bL,bL).sketchOnPlane("XY").extrude(m)
tower = tower.fuse(towerbase)
// let cutter = makeBaseBox(bL*2,bL*2,h).translate(0,bL*1.,0)
// tower = tower.cut(cutter)
return tower}