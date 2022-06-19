// const main = ({ sketchCircle, sketchRectangle }) => {
//   return sketchRectangle(5, 10).loftWith([
//     sketchCircle(8, { origin: 10 }),
//     sketchRectangle(5, 10, { origin: 20 }),
//   ]);
// };

// multiple lofted sketches


// const main = ({ sketchCircle, sketchRectangle }) => {
//     return sketchRectangle(5, 10).loftWith(sketchCircle(3, { origin: 10 }), {
//       endPoint: [2, 2, 15],
//     });
//   };

// revolve is by default around the z-axis

const main = ({ Sketcher }) => {
    return new Sketcher("XZ")
      .hLine(25)
      .halfEllipse(0, 40, 5)
      .hLine(-25)
      .close()
      //.revolve([1,0,0]);
      .revolve();
  };

  