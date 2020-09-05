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

function requirementsMet(reqs, qualities, qualityNames) {
  let passed = true;
  let tooltip = "";
  for (let {id, min, max} of reqs) {  
    let qualityValue = qualities[id]?.value || 0
    if (min && !max) { //is player quality greater than or equal to?
      if (min <= qualityValue) {
        tooltip += `${qualityNames[id]} no less than ${min}. (You have ${qualityValue}).\n`
      } else {
        tooltip += `${qualityNames[id]} no less than ${min}. (You have ${qualityValue}).\n`
        passed = false;
      }
    } else if (!min && max) { //is player quality less than or equal to?
      if (max >= qualityValue) {
        tooltip += `${qualityNames[id]} no more than ${max}. (You have ${qualityValue}).\n`
      } else {
        tooltip += `${qualityNames[id]} no more than ${max}. (You have ${qualityValue}).\n`
        passed = false;
      }
    } else if (min === max) { // is the player quality exactly equal?
      if (qualityValue === min) {
        tooltip += `${qualityNames[id]} equal to ${min}. (You have ${qualityValue}).\n`
      } else {
        tooltip += `${qualityNames[id]} equal to ${min}. (You have ${qualityValue}).\n`
        passed = false;
      }
    } else if (min < max) {
      if (min <= qualityValue && qualityValue <= max) {
        tooltip += `${qualityNames[id]} between ${min} and ${max}. (You have ${qualityValue}).\n`
      } else {
        tooltip += `${qualityNames[id]} between ${min} and ${max}. (You have ${qualityValue}).\n`
        passed = false;
      }
    } else if (max === 0) { // This means the check wants the player to not have the quality.
      if (!qualityValue) {
        tooltip += `You don't have ${qualityNames[id]}.`;
      } else {   
        tooltip += `No ${qualityNames[id]}. (You have ${qualityValue}).\n`;
        passed = false;
    }
  }
} // end loop

  tooltip = passed ? "Unlocked with\n" + tooltip : "Requires\n" + tooltip;
  
  return {passed, tooltip};
}

function challengeRequirementsMet(reqs, qualities, qualityNames) {
  let oddsDescription = "";
  let tooltip = "";
  let passed = true;
  let odds = 0;
  const {id, difficulty} = reqs[0];
  let qualityValue = qualities[id]?.value || 0;
  if (qualityValue < difficulty) {
    passed = false;
    oddsDescription = `\n\nThis is a ${qualityNames[id]} challenge.\nYour ${qualityNames[id]} is too low to make an attempt.`
  } else {
    odds = 50;
    let attempts = qualityValue;
    let difference = 25;
    while (attempts !== difficulty) {
      odds += difference;
      difference = Math.floor(difference/2);
      attempts -= 1;
    } 
    oddsDescription = `\n\nThis is a ${qualityNames[id]} challenge.\nYour ${qualityNames[id]} of ${qualityValue} gives you a ${odds}% chance of passing the challenge.`   
  }

  tooltip = `You need ${qualityNames[id]} of at least ${difficulty} to attempt this challenge. (You have ${qualityValue}).`;
  return {passed, oddsDescription, odds, tooltip}
}





export { getLowestValueFromMap, requirementsMet, challengeRequirementsMet };







// if (req.comparison) { // If the requierment uses value comparison.
//   switch (req.comparison.type) {
//     case "equal":
//       if (req.comparison.value === qualityValue) {
//         tooltip += `${qualities[req.id].name} equal to ${req.comparison.value}. (You have ${qualityValue}.)\n`
//         break;
//       } else {
//         passed = false;
//         tooltip += `${qualities[req.id].name} equal to ${req.comparison.value}. (You have ${qualityValue}.)\n`
//         break;
//       }
//     case "not":
//       if (req.comparison.value !== qualityValue) {
//         tooltip += `${qualities[req.id].name} not ${req.comparison.value}. (You have ${qualityValue}.)\n`
//         break;
//       } else {
//         tooltip += `${qualities[req.id].name} not ${req.comparison.value}. (You have ${qualityValue}.)\n`
//         passed = false;
//         break;
//       }
//     case "smaller":
//       if (req.comparison.value >= qualityValue) {
//         tooltip += `${qualities[req.id].name} no more than ${req.comparison.value}. (You have ${qualityValue}.)\n`
//         break;
//       } else {
//         tooltip += `${qualities[req.id].name} no more than ${req.comparison.value}. (You have ${qualityValue}.)\n`
//         passed = false;
//         break;
//       }
//     case "bigger":
//       if (req.comparison.value <= qualityValue) {
//         tooltip += `${qualities[req.id].name} no less than ${req.comparison.value}. (You have ${qualityValue}.)\n`
//         break;
//       } else {
//         tooltip += `${qualities[req.id].name} no less than ${req.comparison.value}. (You have ${qualityValue}.)\n`
//         passed = false;
//         break;
//       }
//     default:
//       passed = false;
//   }
// } else if (req.range) { // end comparison check, start range check 
//   if (req.range.min <= qualityValue && qualityValue <= req.range.max ) {
//     tooltip += `${qualities[req.id].name} between ${req.range.min} and ${req.range.max}. (You have ${qualityValue}.)\n`
//   } else {
//     tooltip += `${qualities[req.id].name} between ${req.range.min} and ${req.range.max}. (You have ${qualityValue}.)\n`
//     passed = false;
//   }
// } // end range check; 