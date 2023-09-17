const defaultParams = {             
    // dimensions of GNS3000 GPS receiver
    gnsLength:     79.25,
    gnsWidth:      45.25,
    gnsHeight:      11.4,
    fit:            1.0,  // tolerance to fit receiver in holder
    thickness:      2.0,  // thickness of holder around receiver
    portionTop:     0.9, // height of holder compared to height of receiver, max 0.87    
    portionSide:    0.85,  // percentage of side cutout compared to length
    assimSide:      0    // asymmetry of side cutout (and increase in length)
    }

const r = replicad

function main(
   {  },   // functions used in main, can be empty if r.function notation is used
   { gnsLength, gnsWidth, gnsHeight, fit, 
   thickness, portionTop, portionSide,assimSide} )  // parameters to adjust the model

  { 
      let length = gnsLength + fit + assimSide;
      let width  = gnsWidth + fit;
      let height = gnsHeight + fit;
      let radius = gnsHeight/2;

    // create shape of GNS3000 receiver  
    let receiverBody = r.makeBaseBox(length,width,height)
    .fillet(radius,(e)=>e.inDirection("X"));
    
    // create holder by adding thickness to the shape of the GNS receiver
    let holder = r.makeBaseBox(length+2*thickness,width+2*thickness,height+2*thickness)
    .fillet(radius+thickness,(e)=>e.inDirection("X"))
    .translate(0,0,-thickness)
      
    // number of shapes to create cut-outs in the holder  
    let cutterTop = r.makeBaseBox(length+4*thickness, width+4*thickness, height)
    .translate(0,0,portionTop*height)
    let cutterSide= r.makeBaseBox(length*portionSide, width+4*thickness, height)
    .translate(assimSide,0,4)
    let cutterBottom = r.makeBaseBox(length,width*0.8,height)
    .fillet(3,(e)=>e.inDirection("X"))
    .translate(length/2,0,2.0)

    // create two holes for a lanyard
    let cylLength = thickness*10  // length of drill for lanyard holes
    let cylRad    = 2             // radius of drill for lanyard holes 
    let holeDist = 7             // distance between lanyard holes
    holeDist = holeDist/2        // half distance for symmetrical holes
    let cutterLanyardL = r.makeCylinder(cylRad,cylLength,[-length/2-cylLength/2,holeDist,5],[1,0,0])
    let cutterLanyardR = r.makeCylinder(cylRad,cylLength,[-length/2-cylLength/2,-holeDist,5],[1,0,0])
    let cutterLanyard = r.makeCompound([cutterLanyardL,cutterLanyardR])

    
    holder = holder.cut(receiverBody)
    holder = holder.cut(cutterTop)
    holder = holder.cut(cutterSide)
    holder = holder.cut(cutterBottom)
    holder = holder.cut(cutterLanyard)
    holder = holder.fillet(2.5,(e)=>e.inBox([length/2-5,50,3],[-length/2+5,-50,3+height]).inDirection("Y"))
    // holder = holder.fillet(0.5,(e)=>e.inDirection("X"))
    // holder = holder.fillet(0.5,(e)=>e.inDirection("Y"))
    // let list = [61,68]
    // holder = holder.fillet(0.5,(e)=>e.containsPoint([0, -24.42, 11.92]))
    holder = holder.fillet(0.5)
    holder = holder.translate(0,0,thickness)
    receiverBody = receiverBody.translate(0,0,thickness)

    let shapeArray = [
        {shape: receiverBody, name:"receiver", color:"grey" },
      //  {shape: cutterTop, name:"cutterTop", color: "green" , opacity: 0.5},
      //  {shape: cutterSide, name:"cutterSide", color: "green", opacity:0.5},
      //  {shape: cutterBottom, name:"cutterBottom", color: "green", opacity:0.5},
      //  {shape: cutterLanyard, name:"cutterLanyard", color: "green", opacity:0.5},
        {shape: holder, name:"holder", opacity: 1.0},
    ]   

    return  shapeArray
   }