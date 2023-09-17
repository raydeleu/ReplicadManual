import { draw, drawRectangle, importSTL } from 'replicad'
import { parse } from 'svg-parser'
import { SVGPathData } from 'svg-pathdata'

import stl from './din-top.stl'

import logoSvg from './hacklab-logo.svg'

const svgToJson = svgData => {
  const svgDoc = parse(svgData)

  const root = svgDoc.children[0]

  const objs = {}
  root.children.map(child => {
    const label =
      child.properties['inkscape:label'] || child.properties['aria-label']
    if (!label) {
      return
    }
    objs[label] = {
      paths: child.children.map(p => makerize(p)),
    }
    const trans1 = child.properties.transform
    if (trans1) {
      objs[label].transform = trans1
    }
  })
  return objs
}

const makerize = p => {
  if (p.tagName !== 'path') {
    throw new Error('unknown tagName: ' + p.tagName)
  }
  const path = new SVGPathData(p.properties.d)
  if (p.properties.transform) {
    applyTransform(p.properties.transform, path)
  }
  return path.toAbs().encode()
}

const pathToSketch = pathData => {
  const sketch = draw()
  let result = undefined
  new SVGPathData(pathData).commands.map(c => {
    switch (c.type) {
      case SVGPathData.MOVE_TO:
        sketch.movePointerTo([c.x, c.y])
        break

      case SVGPathData.CURVE_TO:
        sketch.bezierCurveTo(
          [c.x, c.y],
          [
            [c.x1, c.y1],
            [c.x2, c.y2],
          ],
        )
        break

      case SVGPathData.CLOSE_PATH:
        result = sketch.close()
        break

      default:
        throw new Error('Cannot parse unknown type ' + JSON.stringify(c))
    }
  })
  if (result !== undefined) {
    return result
  }
  console.error('while parsing', new SVGPathData(pathData).commands)
  throw new Error('path wasnt closed! ' + pathData)
}

export async function main() {
  const a = draw()
    .movePointerTo([23, -9])
    .lineTo([35, -5])
    .lineTo([57, 20])
    .lineTo([40, 35])
    .lineTo([12, 35])
    .lineTo([11, 20])
    .close()
    .sketchOnPlane('XZ')
    .extrude(2)

  const jsonData = svgToJson(logoSvg)

  const sketches = jsonData.dots.paths.map(p => pathToSketch(p))

  const b = sketches
    .map(sketch => sketch.sketchOnPlane('XZ'))
    .map(x => x.extrude(30))
    .map(x => x.translate([-703, 0, -506.5]).scale(0.13))

  let bb = b[0].boundingBox
  b.slice(1).forEach(s => bb.add(s.boundingBox))

  const w = bb.bounds[1][0] - bb.bounds[0][0]
  const h = bb.bounds[1][2] - bb.bounds[0][2]

  const holes = b.map(h => h.rotate(180, bb.center, [0, 1, 0]))

  const c = drawRectangle(w, h)
    .sketchOnPlane('XZ')
    .extrude(2)
    .translate([bb.bounds[0][0] + w / 2, 0, bb.bounds[0][2] + h / 2])

  const dinTop = a.fuse(
    (await importSTL(new Blob([stl]))).translate([0, -23, 0]),
  )

  return [
    holes.reduce((acc, h) => acc.cut(h), dinTop).translate([-40, 0, 50]),
    await importSTL(new Blob([stl])),
  ]
}
