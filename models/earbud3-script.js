
const defaultParams = {             // setting the value of the parameters
    earbudStemWidth:        4.5,    // the stem of the earbud is modelled as an ellipse on XZ, with two parameters 
    earbudStemThickness:    4,      // Width is the x-dimension of the ellipse, Thickness the z-dimension
    earbudStemHeight:       20.0    // The height of the stem, in the y direction is not relevant
                                    // can be the length of the holder or grip around the stem plus some mm    
    }
  
  // next lines allow intellisense help in VS Code
  /** @typedef { typeof import("replicad") } replicadLib */
  /** @type {function(replicadLib, typeof defaultParams): any} */
  
  function main(
   { draw, Sketcher, sketchRectangle,sketchEllipse },   // functions used within the main program
   { earbudStemWidth,earbudStemThickness,earbudStemHeight} )  // parameters to adjust the model
  {
    // points cubicBezierCurve
    // throughPoints are tp1 .. tp2
    // controlPoints are cp1s, cp1e (control point start/end)

    let tp1 = [15,25]
    let st1 = 45  // startTangent point 1
    let et1 = 90  // endTangent point 1
    let tp2 = [2,42]
    let tp3 = [-20,15]
    let tp4 = [-24,15]
    
    // let hookCurveDraw = draw().cubicBezierCurveTo(tp1,cp1s,cp1e).cubicBezierCurveTo(tp2,cp2s,cp2e).cubicBezierCurveTo(tp3,cp3s,cp3e).cubicBezierCurveTo(tp4,cp4s,cp4e).done().sketchOnPlane("XY")

    // let hookCurveSketch = new Sketcher("XY",1)
    // .movePointerTo([0,0])
    // .cubicBezierCurveTo(tp1,cp1s,cp1e)
    // .cubicBezierCurveTo(tp2,cp2s,cp2e)
    // .cubicBezierCurveTo(tp3,cp3s,cp3e)
    // .cubicBezierCurveTo(tp4,cp4s,cp4e)
    // .done()

    let hookCurveSpline = new Sketcher("XY",0)
    .movePointerTo([0,0])
    .smoothSplineTo(tp1,{startTangent: 45, endTangent: 80})
    .smoothSplineTo(tp2,{startFactor: 1.5, endTangent: 180, endFactor: 1.5})
    .smoothSplineTo(tp3,{startFactor: 1.5, endTangent: 180, endFactor: 1.5})
    .smoothSplineTo(tp4,{endTangent: 180})
    .done()

    let hookWidth =   3;
    let hookHeight =  2

    let loftedHook = hookCurveSpline.sweepSketch((plane, origin) => 
    sketchRectangle(hookWidth, hookHeight, { plane, origin }) );

    loftedHook = loftedHook.fillet(1,(e) => e.inDirection("Z"))
    loftedHook = loftedHook.fillet(0.75,(e) => e.inPlane("XY",-1))
    loftedHook = loftedHook.fillet(0.75,(e) => e.inPlane("XY",1))
    loftedHook = loftedHook.translateZ(1) 

    let tolerance = 0.5
    earbudStemThickness = earbudStemThickness + tolerance
    earbudStemWidth     = earbudStemWidth + tolerance

    let holderThickness = 1.5;
    let holderWidth   = earbudStemWidth +  (2* holderThickness)
    let holderLength  = 8; 
    let holderHeight =  earbudStemThickness + holderThickness + hookHeight;

    let earPodHolder = sketchRectangle(holderWidth,holderLength).extrude(holderHeight)
    earPodHolder = earPodHolder.translate([0,-((holderLength/2)-(hookWidth/2)),0])

    let earPodStem = sketchEllipse(earbudStemWidth/2,earbudStemThickness/2,{plane:"XZ"}).extrude(earbudStemHeight).translate([0,earbudStemHeight/8, earbudStemThickness/2+hookHeight])
 
    let slit = sketchRectangle(2,40,{plane:"XY"}).extrude(holderHeight).translate([0,0,holderHeight/2])

    earPodHolder = earPodHolder.fuse(loftedHook.clone())
    earPodHolder = earPodHolder.cut(earPodStem.clone())
    earPodHolder = earPodHolder.cut(slit)
    earPodHolder = earPodHolder.fillet(0.75,(e)=>e.inDirection("Y").inPlane("XY",holderHeight))
  
    let earPodHolderR = earPodHolder.clone().mirror("YZ",[-30,0])


    let shapeArray = [
        {shape: loftedHook, name:"loftedHook", color:"gray" },
        {shape: earPodHolder, name:"holderL"},
        {shape: earPodHolderR, name:"holderR"},
        {shape: earPodStem,name:"earPodStem"}
    ]   

    return  shapeArray
   }