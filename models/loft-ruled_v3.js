const main = ({ sketchCircle, 
               sketchRectangle,
               sketchFaceOffset,
               sketchRoundedRectangle,
                makeSolid}) => 
{
   let s0 = sketchCircle(10,{origin:[18,0,30]})
   s0 = s0.face().rotate(20,[0,0,0],[0,1,0])
   let s1 = sketchFaceOffset(s0,0)
   let s2 = sketchRoundedRectangle(10,14,2,{origin:[10,0,10]})
   let s3 = sketchRectangle(10,20,{origin:[5,0,0],plane:"XY"})

   let e1 = s1.clone()
   e1 = e1.extrude(-0.5).scale(1.02);
   let e2 = (s2.clone()).extrude(0.5).scale(1.02)
   let e3 = (s3.clone()).extrude(0.5).scale(1.02).translate([0,0,-1])

   let loft = s1.loftWith([s2,s3],{ruled:false})
// loft = makeSolid(loft.face())
// loft = loft.Shape()
// let loft1 = loft.shell(-0.5, (f) => f.inPlane("YZ",-20))
// containsPoint([0, -15, 80]
// loft = loft.shell(-0.5, (f) => f.containsPoint[0,-20,0])

let shapes = [   
{shape: loft, name:"loft", color: "steelblue"},
{shape: e1, color:"grey"},
{shape: e2, color:"grey"},
{shape: e3, color:"grey"}
]
return shapes
  
};
