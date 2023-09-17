const r = replicad

async function importFile(file)
{
  let shape;  
  const fileName = file; 

  if (fileName.endsWith(".step") || fileName.endsWith(".stp")) {
    shape = await r.importSTEP([file]);
  } else if (fileName.endsWith(".stl")) {
    shape = await r.importSTL([file]);
  }

  return shape
};

const main = ({},{}) => {

  let shape; 
  let file = "./Users/ray/Downloads/test.step"
  shape = importFile(file)
  
  return shape

}
