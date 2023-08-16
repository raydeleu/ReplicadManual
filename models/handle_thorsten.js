// UpwindBuddy axle mount for aluminum mast, V1
// Copyright ©2023, Thorsten von Eicken

/* global replicad */
/** @typedef { typeof import("replicad") } replicad */

const r = replicad

const fct = 2
export const defaultParams = {
  // main axle
  axleDia: 19,
  axleLen: 100 / fct,
  axleWall: 3,
  // handle
  handleLen: 70 / fct,
  handlePos: 70 / fct, // position along axle
  handleAngle: 85, // angle to slant handle upwards
  // sleeve to hold aluminum extrusion
  sleeveLen: 75 / fct,
  sleeveWall: 5, // thickness of wall around U profile
  uWidth: 10.5, // width of (bottom of) U profile
  uDepth: 13, // height of (sides of) U profile
  uThick: 1.5, // thickness of profile walls
  // strengthening fillet/triangle
  triLen: 10,
  // screw to lock alu extrusion
  screwDia: 5,
  screwOff: 1.5, // offset from center
}

function cloneArray(a) { return a.map(el => el.clone()) }

const fuseAll = (a) => a.slice(1).reduce((acc, s) => acc.fuse(s.clone()), a[0].clone())

export default function main(p) {
  const axle = r.makeCylinder(p.axleDia / 2, p.axleLen).
    rotate(90, [0, 0, 0], [-1, 0, 0]). // length in Y axis
    translateZ(p.axleDia / 2) // lay onto XY plane

  const handle =fuseAll([
    // main handle cylinder
    r.makeCylinder(p.axleDia / 2, p.handleLen).
      rotate(p.handleAngle, [0, 0, 0], [0, -1, 0]). // length in -X axis (slightly slanted upwards)
      translateZ(p.axleDia / 2), // lay onto XY plane
    // support/keyway
    r.makeBaseBox(p.handleLen, p.axleDia / 2, p.axleDia / 2).
      translate(-p.handleLen / 2, 0, 0),
    // knob
     r.makeSphere(p.axleDia*0.55).
    // r.drawCircle(p.axleDia*0.55).sketchOnPlane().revolve([1,0,0]).
    // r.drawPolysides(p.axleDia*0.55, 20).sketchOnPlane().revolve([1,0,0]).
    //r.drawPolysides(p.axleDia * 0.55, 20).cut(r.drawRectangle(p.axleDia, p.axleDia).translate(0, -p.axleDia / 2)).sketchOnPlane().revolve([1, 0, 0]).
      translate(-p.handleLen, 0, p.axleDia / 2 + p.handleLen * Math.cos(p.handleAngle * r.DEG2RAD))
  ]).
    translateY(p.handlePos).
    rotate(90, [0, 0, p.axleDia / 2], [0, 1, 0]) // rotate so handle points up

  const sleeveDepth = p.uDepth + 2 * p.sleeveWall
  const sleeveWidth = p.uWidth + 2 * p.sleeveWall
  const screwHole = r.makeCylinder(p.screwDia/2, sleeveWidth+2).translate(0, -sleeveWidth/2+p.screwOff, -1)
  const sleeve = r.makeBaseBox(p.sleeveLen, sleeveDepth, sleeveWidth).
    fillet(2).
    cut(
      r.makeBaseBox(p.sleeveLen + 1, p.uDepth, p.uWidth).
        translate(0, 0, p.sleeveWall)
    ).
    translateY(-sleeveDepth / 2).
    cut(screwHole)
  
  //const triBase = new r.FaceFinder().inPlane("XZ", 0).find(sleeve, {unique: true})
  const triBase = r.drawRectangle(p.axleDia+p.triLen*2, sleeveWidth-2).translate(0,sleeveWidth/2).sketchOnPlane("XZ", 2)
  const triTop = r.drawCircle(p.axleDia / 2).
    translate(0, p.axleDia / 2). // lay onto XY plane
    sketchOnPlane("XZ", -p.triLen)
  const tri = triTop.loftWith(triBase).fillet(1)

  // create final object
  const all = fuseAll([axle, handle, sleeve, tri])

  // create test section to check fit with aluminium extrusion
  const testSectBox = r.makeBaseBox(20, sleeveDepth + p.triLen + 10, sleeveWidth + 10).
    translate(0, -5, -5)
  const testAll = all.clone()
  //const testSect = all.clone().intersect(testSectBox.clone())
  const testSect = testSectBox.clone().intersect(all.clone())

  return [
    { shape: all.translateX(100), name: "all", color: "#ffeeee" },
    { shape: axle.translateX(-100), name: "axle", color: "orange" },
    { shape: handle.translateX(-100), name: "handle", color: "blue" },
    { shape: sleeve.translateX(-100), name: "sleeve", color: "green" },
    { shape: screwHole.translateX(-100), name: "screwHole", color: "yellow"},
    { shape: tri.translateX(-100), name: "tri", color: "olive" },
    { shape: testSect, name: "testSect", color: "purple" },
    { shape: testSectBox, name: "testSectBox", color: "steelblue" },
    { shape: testAll, name: "testSectAll", color: "lightgreen" },
  ]
}
