# Introduction

Since a long time I started using replicad again. The 3D printer is mostly standing around, my last useful prints were 

* a tick remover (which I could find and print within 1/2 hour to save our cat),

* a cap for a nut of the windscreen wiper arm of my Tesla model 3,

* coins for shopping carts.

All of these were found on Thingiverse or Printables. Therefore I had no need to use replicad since my last endeavors to print a large ring spanner to mount a new faucet in my kitchen.    

# BMW key fob cover

Today however I was looking for a cover for the key of a BMW 4-series or i4. There are models on Printables such as: 

https://www.printables.com/model/1346381-bmw-key-cover

https://www.printables.com/model/897350-bmw-g-series-key-cover

They seem to be prepared with a 3D scanning device, as the inner shape of the cover seems to follow all ridges in the key fob. The outline however does not follow the contour correctly and the surfaces are faceted instead of flat. For me that degrades the quality of the model. 

# Creating the outline

The biggest challenge was to create the outline of the key fob as it has almost no straight edges. I started to create a rough sketch of the top view and to print this just at 0.2 mm thickness. After a first attempt I adjusted the points of the contour and found that I was relatively close. I cheated on the top of the key fob as this side is only slightly rounded. 

The source code for the contour looked like this: 

`const { draw,` 
`makeOffset,` 
`makeBaseBox,` 
`makeSolid,`
`translateY,`
`translateZ,`
`makeCylinder } = replicad;`

`const main = () => {`

  `let p0 = [0,42]`
  `let p1 = [40,41] // midpoint of the long edge, not used after all`
  `let p2 = [88,28];`
  `let p3 = [69,0]`
  `let p4 = [6,0]` 

  `const topView =` 
  `draw(p0)`
    `.sagittaArcTo(p2,3)`
    `.customCorner(4)`
    `.lineTo(p3)`
    `.customCorner(25)`
    `.lineTo(p4)`
    `.customCorner(8)`
    `.closeWithCustomCorner(5);`

  `let topViewHolder = topView.clone().offset(2)`

  `let contour = topView.sketchOnPlane("XY")`
  `let contourHolder = topViewHolder.sketchOnPlane("XY") '''` 

# Creating the 3 dimensional shape

I created an offset of this contour with the thickness of the wall, i.e. 2mm, then extruded this shape and beveled the edges.  I created to cut-outs, one to hold the key which was a beveled cube and one to create the hole for the key ring. The complete code then looked like this: 

`const { draw,` 
`makeOffset,` 
`makeBaseBox,` 
`makeSolid,`
`translateY,`
`translateZ,`
`makeCylinder } = replicad;`

`const main = () => {`

  `let p0 = [0,42]`
  `let p1 = [88,28];`
  `let p2 = [69,0]`
  `let p3 = [6,0]` 

  `const topView =` 
  `draw(p0)`
    `.sagittaArcTo(p1,3)`
    `.customCorner(4)`
    `.lineTo(p2)`
    `.customCorner(25)`
    `.lineTo(p3)`
    `.customCorner(8)`
    `.closeWithCustomCorner(5);`

  `let topViewHolder = topView.clone().offset(2)`

  `let contour = topView.sketchOnPlane("XY")`
  `let contourHolder = topViewHolder.sketchOnPlane("XY")`

`let fob = contour.extrude(14.5)`
`fob = fob.fillet(3)`

`let holder = contourHolder.extrude(18.5).fillet(3)`
`holder = holder.translateZ(-2)`

`let cutter = makeBaseBox(100,50,14.5).fillet(3)`
`cutter = cutter.translateY(26)`
`cutter = cutter.translateX(40)`
`cutter = cutter.translateZ(0)`

`let holeCutter = makeCylinder(3,50,[10,30,-10],[0,0,1])`

`holder = holder.cut(cutter)`
`holder = holder.cut(holeCutter)`

`return [` 
  `// { shape: fob, color: "blue" },` 
  `{shape:holder}`
  `,{shape:cutter, color: "red"}`
  `,{shape:holeCutter, color: "red"}`
  `]}` 

To export this shape I removed the cutters from the view. 

# Improvements to first version

The following improvements would make the key fob cover for a BMW key even better: 

- the sharp ends of the cover are indeed sharp, as there is only a bevel on the outside, not on the side of the cut-out;
- the hole for the key ring could be placed a little bit closer to the edge to make inserting the ring easier;
- the cover can be 1 to 2 mm thicker, this would reduce the risk of breaking or bending it and allowing for a two-sided bevel. 

Creating a thicker model added significantly to the printing time: 

* at 2 mm wall thickness the printing time was 1h 38 m
* at 3 mm wall thickness the printing time was 2h 16m, increase of 38 min
* at 4 mm wall thickness the printing time was 2h 25m, increase of only 9 min

May be the inner bevel adds most to the printing time and not so much the thickness of the wall. 

