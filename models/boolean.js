// boolean.js
// 
// File to demonstrate boolean operations and create icons
// for Replicad

const main = (
    {makeSphere, makeCompound },
    {}
  ) => {
    
    let sphere1 = makeSphere(20).translate([45,0,0])
    let sphere2 = makeSphere(20)

   let compound = makeCompound([sphere1,sphere2])
//   return sphere1.fuse(sphere2)
//   return sphere1.cut(sphere2)  
//   return sphere1.intersect(sphere2)
    return compound
  };