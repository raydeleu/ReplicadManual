const main = ({ sketchCircle, 
               sketchRectangle,
               sketchFaceOffset,
               sketchRoundedRectangle,
               makeOffset }) => 
{
   let s1 = sketchCircle(5,{origin:[18,0,30]})
   s1 = s1.face().rotate(-30,[0,0,0],[0,1,0])
   s1 = sketchFaceOffset(s1,0)
   let s2 = sketchRoundedRectangle(5,7,2,{origin:[10,0,10]})
   let s3 = sketchRectangle(10,5,{origin:[-20,0,0],plane:"YZ"})

let loft = s1.loftWith([s2,s3],{ruled:false},false)
// let loftShell = loft.shell(1,(f)=>f.inPlane("YZ",20))
// return loftShell

return loft
  
};
