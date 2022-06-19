// This does not work. Results in an error in RepliCad

function main({ Sketcher,sketchRectangle})
{

    function UnevenChamferEdges(shape, dist1, dist2, edgeList, face, keepOriginal) 
    {
        let mkChamfer = new oc.BRepFilletAPI_MakeChamfer(shape);
        let foundEdges = 0;
        ForEachEdge(shape, (index, edge) => {
        if (edgeList.includes(index)) { mkChamfer.Add(dist1, dist2, edge,face); foundEdges++; }
        });
        let curChamfer = new oc.TopoDS_Solid(mkChamfer.Shape());
        if (!keepOriginal)
                    {shape.delete()};
        return curChamfer;
    }


let box1 = sketchRectangle(60, 90).extrude(25);
box1 = UnevenChamferEdges(box1,1,3,[1,9,5,11],5, false);
return box1;
}