const defaultParams = {
  modelURL:
    "https://cors-anywhere.herokuapp.com/https://gitlab.steamos.cloud/SteamDeck/hardware/-/raw/master/steamdeck_step_20220202.stp",
};

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */
const main = async ({ importSTEP }, { modelURL }) => {
  const response = await fetch(modelURL, { mode: "cors" });
  const rawModel = await response.blob();
  const shape = await importSTEP(rawModel);
  return shape;
};