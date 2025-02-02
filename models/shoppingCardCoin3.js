// Fake coin to unlock your shopping cart 
// with a small extension to attach it to your key ring

const { draw,
        drawCircle,
        drawRoundedRectangle,
        drawPolysides,
      } = replicad;

const main = () => {
  
  // standard dimensions euro coin, choose right one by 
  // adding or deleting comment marking

  const coinDiameter = 23.25;  // 1 euro
  // const coinDiameter = 24.25;  // 0.50 euro
  // const coinDiameter = 25.75;  // 2 euro
  
  const coinThickness = 2.38; // 1 euro 
  // const coinThickness = 2.33; // 0.50 euro
  // const coinThickness = 2.20; // 2 euro
  
  const handleLength = 22;
  const handleWidth = 8;
  const handleHoleDia = handleWidth - 4;

  // draw the coin with a handle and a hole for your keyring

  let coinContour = drawCircle(coinDiameter/2);
  let handleContour = drawRoundedRectangle(handleLength,handleWidth,handleWidth/2)
  .translate(handleLength/2);
  let handleHole = drawCircle(handleHoleDia/2)
  .translate(handleLength-(handleWidth/2));
  let hexagon = drawPolysides(6.5,6,0);
  
  // the drawing consists of the circle for the coin, adding a rounded
  // rectangle for the handle and subtracting a circle to create a hole
  let totalContour = coinContour
  .fuse(handleContour)
  .cut(handleHole)
  .cut(hexagon);

  let shoppingCartCoinContour = totalContour.sketchOnPlane("XY");
  let shoppingCartCoin = shoppingCartCoinContour
  .extrude(coinThickness)
  .fillet(0.5);

  // return [
  //   {shape: handleContour, color: "red", opacity: 0.5},
  //   {shape: coinContour, color: "red", opacity: 0.5}, 
  //   {shape: totalContour, color: "blue"}
  //   ];
  return shoppingCartCoin;
};

