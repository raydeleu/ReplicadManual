const main = ({ Sketcher }) => {
  const shape = new Sketcher()
    .movePointerTo([50, 50])
    .hLine(-120)
    .vSagittaArc(-80, -20)
    .sagittaArc(100, 20, 60)
    .close()
    .extrude(100, { extrusionProfile: { profile: "s-curve", endFactor: 0.5 } });

  return shape;
};