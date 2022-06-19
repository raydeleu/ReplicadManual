const main = ({ Sketcher, 
                BlueprintSketcher,
                genericSweep }) => {

let width = 30
let thickness = 1
let p0 = [0,0]
let p1 = [50,100]
let p2 = [60,-95]
let p3 = [80,30]
let p4 = [100,25]
let points = [p1,p2,p3,p4]

let testBezier = new Sketcher("XZ")
        .movePointerTo(p0)
        .bezierCurveTo(p4,points)
        // .vLine(-30)
        // .hLine(-100)
        // .close()
        .done()
testBezier = testBezier.extrude(30)    

let testBezier1 = new Sketcher("XZ",40)
        .movePointerTo(p0)
        .bezierCurveTo(p4,points)
        .done()        


// let sideFace = offset2D(testBezier,2,{})

let profile = new Sketcher("YZ")
    .hLine(width)
    .vLine(thickness)
    .hLine(-width)
    .close()


// let base = complexExtrude(testBezier,[0,0,0],[0,-20,0],{},false);

// let base = testBezier.sweepSketch(profile, {forceProfileSpineOthogonality: true,withContract: true,  })
// let base = testBezier.sweepSketch(profile, {withContract: true,  })
// let base = genericSweep(profile,testBezier,{},false)

// let base = (testBezier.loftWith(testBezier1,{}))
// let base = testBezier.extrude(40)
// base = makeOffset(base,0.1) // => kernel error
// let baseInner = base.clone()
// let baseOuter = makeOffset(base,-2)

// base = makeOffset(base,3); // => kernel error
let base = (testBezier)
return base

}