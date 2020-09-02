function getLowestValueFromMap(map, target) {
  if (map.get(target)) { //check for an easy win
    return map.get(target); 
  } else {
    for (let [key, value] of map) {
      if (target < key) {
        return value;
      }
    }
  }
  const e = new Error("Provided target larger than everything in map.")
  throw e;
}

export { getLowestValueFromMap };