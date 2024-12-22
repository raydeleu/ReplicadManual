
const { draw,
        drawRoundedRectangle,
        makeBaseBox,
        makeCylinder } = replicad;

const main = () => {
  
  // standard dimensions credit card
  const cardLength = 85.60;
  const cardWidth = 53.98;
  const cardThickness = 0.9;
  const cardRadius = 3.18; 
  const tolerance = 0.5; 

  // adjust dimensions with tolerance
  let holderLength = cardLength + tolerance;
  let holderWidth = cardWidth + tolerance; 
  let holderRadius = cardRadius+(tolerance/2);
  let wallThickness = 2.0; 

  let bodyLength = holderLength + 2*wallThickness;
  let bodyWidth = holderWidth + 2*wallThickness;
  let bodyRadius = holderRadius + wallThickness;
  let bodyHeight = 4*cardThickness

  let fingerHole = makeCylinder(20,30,"Z").rotate(90,[0,0,0],[1,0,0]).translate(0,-27,20+1.0);

 
  let creditCard = drawRoundedRectangle(holderLength,holderWidth,holderRadius);
  creditCard = creditCard.sketchOnPlane("XY").extrude(bodyHeight);
  creditCard = creditCard.translate(0,0,1.0);
  let holderBody = drawRoundedRectangle(bodyLength,bodyWidth,bodyRadius);
  holderBody = holderBody.sketchOnPlane("XY").extrude(bodyHeight); 
  
  let tapeHoleL = makeBaseBox(10,40,0.5).translate(30,0,0)
  let tapeHoleR = makeBaseBox(10,40,0.5).translate(-30,0,0)
  

  holderBody = holderBody.cut(creditCard);
  holderBody = holderBody.cut(fingerHole);
  holderBody = holderBody.cut(tapeHoleR);
  holderBody = holderBody.cut(tapeHoleL);



  return holderBody;
};
