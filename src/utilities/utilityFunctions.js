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

function requirementsMet(reqs, qualities) {
  let passed = true;
  let lockedTooltip = "Requires\n";
  let unlockedTooltip = "Unlocked with\n";
  for (let req of reqs) {
    if (qualities[req.id]) {  
      let qualityValue = qualities[req.id]?.value
        if (req.comparison) { // If the requierment uses value comparison.
          switch (req.comparison.type) {
            case "equal":
              if (req.comparison.value === qualityValue) {
                unlockedTooltip += `${qualities[req.id].name} equal to ${req.comparison.value}. (You have ${qualityValue}.)\n`
                break;
              } else {
                passed = false;
                lockedTooltip += `${qualities[req.id].name} equal to ${req.comparison.value}. (You have ${qualityValue}.)\n`
                break;
              }
            case "not":
              if (req.comparison.value !== qualityValue) {
                unlockedTooltip += `${qualities[req.id].name} not ${req.comparison.value}. (You have ${qualityValue}.)\n`
                break;
              } else {
                lockedTooltip += `${qualities[req.id].name} not ${req.comparison.value}. (You have ${qualityValue}.)\n`
                passed = false;
                break;
              }
            case "smaller":
              if (req.comparison.value >= qualityValue) {
                unlockedTooltip += `${qualities[req.id].name} no more than ${req.comparison.value}. (You have ${qualityValue}.)\n`
                break;
              } else {
                lockedTooltip += `${qualities[req.id].name} no more than ${req.comparison.value}. (You have ${qualityValue}.)\n`
                passed = false;
                break;
              }
            case "bigger":
              if (req.comparison.value <= qualityValue) {
                unlockedTooltip += `${qualities[req.id].name} no less than ${req.comparison.value}. (You have ${qualityValue}.)\n`
                break;
              } else {
                lockedTooltip += `${qualities[req.id].name} no less than ${req.comparison.value}. (You have ${qualityValue}.)\n`
                passed = false;
                break;
              }
            default:
              passed = false;
          }
        } else if (req.range) { // end comparison check, start range check 
          if (req.range.min <= qualityValue && qualityValue <= req.range.max ) {
            unlockedTooltip += `${qualities[req.id].name} between ${req.range.min} and ${req.range.max}. (You have ${qualityValue}.)\n`
          } else {
            lockedTooltip += `${qualities[req.id].name} between ${req.range.min} and ${req.range.max}. (You have ${qualityValue}.)\n`
            passed = false;
          }
        } // end range check; 
      } else { // if player doesn't have quality.
        passed = false;
        lockedTooltip += `Missing quality.\n`;
      }
   } // end loop
  
  return {passed, unlockedTooltip, lockedTooltip};
}


export { getLowestValueFromMap, requirementsMet };