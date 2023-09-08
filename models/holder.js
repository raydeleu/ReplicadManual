const defaultParams = {             // setting the value of the parameters
    length:   100,   
    width:    50,    
    height:   12,                     
    thickness: 2,
    portion:   0.85
    }
  
    function main(
   { makeBaseBox, Sketcher, makeCylinder,makeCompound },   // functions used within the main program
   { length, width, height, thickness, portion} )  // parameters to adjust the model
  {
    
    let receiverBody = makeBaseBox(length,width,height)
    .fillet(5,(e)=>e.inDirection("X"));
    let cutter = makeBaseBox(length+4*thickness, width+4*thickness, height)
    .translate(0,0,portion*height)
    let cutterSide= makeBaseBox(length*portion, width+4*thickness, height)
    .translate(0,0,3)
    let cutterBottom = makeBaseBox(length,width*0.8,height)
    .fillet(3,(e)=>e.inDirection("X"))
    .translate(length/2,0,2.0)

    let cutterLanyardL = makeCylinder(2,20,[-length/2-10,3.5,5],[1,0,0])
    let cutterLanyardR = makeCylinder(2,20,[-length/2-10,-3.5,5],[1,0,0])
    let cutterLanyard = makeCompound([cutterLanyardL,cutterLanyardR])
    //let cutterLanyard1 = Translate([0,gnsWidth/2+3,gnsDepth/2],cutterLanyard,true);
    //let cutterLanyard2 = Translate([0,gnsWidth/2-3,gnsDepth/2],cutterLanyard,false);



    // let holder = makeOffset(receiverBody,thickness)
    let holder = makeBaseBox(length+2*thickness,width+2*thickness,height+2*thickness)
    .fillet(5+thickness,(e)=>e.inDirection("X"))
    .translate(0,0,-thickness)
    holder = holder.cut(receiverBody)
    holder = holder.cut(cutter)
    holder = holder.cut(cutterSide)
    holder = holder.cut(cutterBottom)
    holder = holder.cut(cutterLanyard)
    holder = holder.fillet(2.5,(e)=>e.inBox([length/2-5,50,3],[-length/2+5,-50,3+height]).inDirection("Y"))
    // holder = holder.fillet(0.3,(e)=>e.inBox([-1.2*length/2,-1.2*width/2,5],[1.2*length/2,1.2*width/2,height]))
    holder = holder.fillet(0.5)

    let shapeArray = [
        {shape: receiverBody, name:"reeiver", color:"red" },
        {shape: cutter, name:"cutter", color: "green" , opacity: 0.5},
        {shape: cutterSide, name:"cutterSide", color: "green", opacity:0.5},
        {shape: cutterBottom, name:"cutterBottom", color: "green", opacity:0.5},
        {shape: cutterLanyard, name:"cutterLanyard", color: "green", opacity:0.5},
        {shape: holder, name:"holder", opacity: 1.0},
    ]   

    return  shapeArray
   }
