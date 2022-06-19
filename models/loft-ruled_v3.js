const main = ({ sketchCircle, 
               sketchRectangle,
               sketchFaceOffset,
               sketchRoundedRectangle,
                makeSolid}) => 
{
   let s0 = sketchCircle(5,{origin:[18,0,30]})
   s0 = s0.face().rotate(-30,[0,0,0],[0,1,0])
   let s1 = sketchFaceOffset(s0,0)
   let s2 = sketchRoundedRectangle(5,7,2,{origin:[10,0,10]})
   let s3 = sketchRectangle(10,5,{origin:[-20,0,0],plane:"YZ"})

let loft = s1.loftWith([s2,s3],{ruled:false})
// loft = makeSolid(loft.face())
// loft = loft.Shape()
let loft1 = loft.shell(-0.5, (f) => f.inPlane("YZ",-20))
// containsPoint([0, -15, 80]
// loft = loft.shell(-0.5, (f) => f.containsPoint[0,-20,0])
return loft1
  
};
