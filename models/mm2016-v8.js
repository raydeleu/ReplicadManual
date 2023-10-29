const {draw,drawRectangle,makeCylinder,makeBaseBox,importSTEP} = replicad

function dropView(radius1, radius2, distance)
{
    let sinus_angle = (radius1 - radius2) / distance
    let angle = Math.asin(sinus_angle);

    // points of outer contour of the lever
    let p1 = [radius1 * Math.sin(angle), radius1 * Math.cos(angle)];
    let p2 = [distance + radius2 * Math.sin(angle), radius2 * Math.cos(angle)];
    let p3 = [distance + radius2, 0];
    let p4 = [distance + radius2 * Math.sin(angle), - radius2 * Math.cos(angle)];
    let p5 = [radius1 * Math.sin(angle), - radius1 * Math.cos(angle)];
    let p6 = [- radius1, 0 ];

    let dropDrawing = draw(p1)
                    .lineTo(p2)
                    .threePointsArcTo(p4,p3)
                    .lineTo(p5)
                    .threePointsArcTo(p1,p6)
                    .close();

    return dropDrawing}

function main()
{
// Model Mania 2016 part 1

let dropDrawing = dropView(20,14,44).rotate(90,[0,0]).translate(0,20)
let dropHalf = drawRectangle(40,200).translate(-20,0)
dropDrawing = dropDrawing.cut(dropHalf)
let dropSide = dropDrawing.sketchOnPlane("XZ").revolve()

let lowerCutter = makeBaseBox(15,100,38).fillet(2)
let upperCutter = makeBaseBox(100,20,40).translate(0,16,46).fillet(2)
let upperCutter2 = upperCutter.clone().translate(0,-32,0)

dropSide = dropSide.cut(lowerCutter).cut(upperCutter).cut(upperCutter2).fillet(2)
// drop = drop.fillet(2,(e)=>e.inPlane("XY",46))

let holeTop = makeCylinder(7.5,100,[0,-20,64],[0,1,0])
let holeBottom = makeCylinder(9/2,100,[-40,0,20],[1,0,0])
let holeBottom2 = makeCylinder(11/2,20,[0,0,20],[1,0,0])
let counterBore = makeCylinder(18.5/2,20,[14.5,0,20],[1,0,0])
dropSide = dropSide.cut(holeTop)
.cut(holeBottom)
.cut(holeBottom2)
.cut(counterBore)

// // following coordinates generated from g-code exported from SolveSpace. 
// let drop = draw([3.69,-2.89])
// .lineTo([3.7,-2.89])
// .lineTo([5.79,-2.78])
// .lineTo([7.89,-2.44])
// .lineTo([9.97,-1.88])
// .lineTo([11.98,-1.09])
// .lineTo([13.9,-0.09])
// .lineTo([15.69,1.1])
// .lineTo([17.33,2.47])
// .lineTo([18.78,3.97])
// .lineTo([20.07,5.62])
// .lineTo([21.2,7.42])
// .lineTo([22.14,9.35])
// .lineTo([22.87,11.39])
// .lineTo([23.37,13.5])
// .lineTo([23.65,15.63])
// .lineTo([23.69,17.76])
// .lineTo([23.52,19.84])
// .lineTo([17.57,63.02])
// .lineTo([17.05,65.33])
// .lineTo([16.1,67.62])
// .lineTo([14.7,69.77])
// .lineTo([12.9,71.67])
// .lineTo([10.78,73.19])
// .lineTo([8.46,74.28])
// .lineTo([6.06,74.91])
// .lineTo([3.7,75.11])
// .lineTo([3.69,75.11])
// .lineTo([3.69,-2.89])
// .close()
// .translate(-3.69,2.89)
// .sketchOnPlane("XZ")
// .revolve()
// .translate(-60,0,0)
// .fillet(5)  // can go up to 8 

// let fileReader = new FileReader('/Users/ray/Downloads/test.txt')

let textArray = []
let file = new File(textArray,'/Users/ray/Downloads/foot.step')
let drawing = importSTEP(file)
// var textBlob = new Blob(textArray, { type: "text/html" })
// fileReader.onload = function(e) {
//   var textArray = fileReader.result;
// }
// fileReader.readAsText(textBlob,"utf8")

// fileReader.addEventListener
// fileReader.onload = function (event) {
// 	let textArray = fileReader.result;
// };

console.log(textArray)
console.log(file.text())

// // getting arrayBuffer from blob
// let fileReader = new FileReader();
// fileReader.readAsArrayBuffer(blob);
// fileReader.onload = function (event) {
// 	let arrayBuffer = fileReader.result;
// };


return [
//{shape: drop, color:"steelblue"}
,{shape: dropSide, color:"green"}]
}