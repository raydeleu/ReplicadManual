const {draw, drawRectangle, drawCircle, drawText} = replicad

const main = (r) => {
       function center(drawing) {
            const boundingBox = drawing.boundingBox;
            drawing = drawing.translate(-boundingBox.center[0], -boundingBox.center[1]);

            return drawing;
        }

        let plate = drawRectangle(5, 5).sketchOnPlane("XY").extrude(0.2)
        let cutter = drawCircle(0.5).fuse(center(drawText('test', { fontSize: 2 })).translate(0, 0.8).rotate(90))
        cutter = cutter.sketchOnPlane("XY").extrude(1.0);
        plate = plate.cut(cutter)

        return plate;
};