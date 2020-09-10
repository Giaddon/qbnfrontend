/** */

import QualitiesAPI from '../utilities/QualitiesAPI';

class DirectorFunctions {

  static calculateChallenge(originalAction, qualities) {
    let action = {...originalAction}
    let oddsDescription = "";
    let tooltip = "";
    let passed = true;
    let odds = 0;
    const {qualityId, difficulty} = action.challenge;
    const quality = QualitiesAPI.getQualityById(qualityId);
    
    let qualityValue = qualities[qualityId]?.value || 0;
    
    
    
    if (qualityValue < difficulty) {
      passed = false;
      oddsDescription = `\n\nThis is a ${quality.name} challenge.\nYour ${quality.name} is too low to make an attempt.`
      console.log("got below odds description update")
    } else {
      odds = 50;
      let attempts = qualityValue;
      let difference = 20;
      while (attempts !== difficulty) {
        odds += difference;
        difference = Math.ceil(difference * 0.6);
        attempts -= 1;
      } 
      if (odds >= 100) odds = 100;
      oddsDescription = `\n\nThis is a ${quality.name} challenge.\nYour ${quality.name} of ${qualityValue} gives you a ${odds}% chance of passing the challenge.`   
    }
  
    tooltip = `You need ${quality.name} of at least ${difficulty} to attempt this challenge. (You have ${qualityValue}).`;
    
    action.odds = odds;
    action.tooltip = tooltip;
    action.text += oddsDescription;

    if (passed) return {action, type:'a'};
    if (!passed && action.reveal.type === 'always') return {action, type:'l'};
    else return {type: 'h'};
  }


  static prepareAction(originalAction, qualities) {
    let action = {...originalAction}
    const availableIntro = 'Unlocked with\n';
    const lockedIntro = 'Requires\n';
    let availableTooltip = [];
    let lockedTooltip = [];
    let finalTooltip = ' ';
    let qualityReport = {};  
    
    if (!action.reqs) finalTooltip = "No requirements.";
    
    else {
      for (let req of action.reqs) {
        const min = req.min || 0;
        const max = req.max || (req.max === 0 ? 0 : Infinity)
        const quality = QualitiesAPI.getQualityById(req.qualityId);
        const qualityName = quality.name;
        const playerValue = qualities[req.qualityId]?.value || 0;
        if (min <= playerValue && playerValue <= max) { // if qualities match
        if (!quality.invisible) availableTooltip.push(`${qualityName} between ${min} and ${max} (you have ${playerValue}).\n`);
          qualityReport[req.qualityId] = true;
        } else { // otherwise
          action.locked = true; // lock action
          if (!quality.invisible) lockedTooltip.push(`${qualityName} between ${min} and ${max} (you have ${playerValue}).\n`);
          qualityReport[req.qualityId] = false;
        }
      } // end req loop
    }

    if (availableTooltip.length > 0) finalTooltip += availableIntro + availableTooltip.join("\n");
    if (lockedTooltip.length > 0) finalTooltip += lockedIntro + lockedTooltip.join("\n");
    if (finalTooltip === ' ') finalTooltip = action.locked ? "Locked." : "Unlocked." // This case happens when req uses all invisible qualities

    action.tooltip = finalTooltip.trim();

    if (!action.reveal || action.reveal.type === "always") {
      if (action.locked) return {type: 'l', action };
      else return { type: 'a', action }; 
    }

    else if (action.reveal.type === "all" && 
      (Object.values(qualityReport).every(quality => quality === true))) return { type: 'a', action };
  
    else if (action.reveal?.type === "some" && 
      action.reveal.qualities.every(quality => 
        qualityReport[quality] === true
      )) {
        if (action.locked) return {type: 'l', action }
        else return { type: 'a', action };  
    }

    else return { type: 'h'};
  }

  static selectStaticActions(actions, qualities) {    
    let availableActions = [];
    let lockedActions = [];

    for (let originalAction of actions) {
      if (originalAction.results.type==="challenge") {
        const { type, action } = DirectorFunctions.calculateChallenge(originalAction, qualities);
        if (type==='a') availableActions.push(action);
        else if (type==='l') lockedActions.push(action);
      }
      else {
        const { type, action } = DirectorFunctions.prepareAction(originalAction, qualities);
        if (type==='a') availableActions.push(action);
        else if (type==='l') lockedActions.push(action);
      }
    }    
  
    return { availableActions, lockedActions };
  }

  static selectDynamicActions(actions, qualities) {
    let possibleActions = [];
    for (let originalAction of actions) {
      if (originalAction.results.type==="challenge") {
        const { type, action } = DirectorFunctions.calculateChallenge(originalAction, qualities);
        if (type==='a') possibleActions.push(action);
      } else {
        const { type, action } = DirectorFunctions.prepareAction(originalAction, qualities);
        if (type==='a') possibleActions.push(action);
      } 
    } 
    return { possibleActions }
  }

}

export default DirectorFunctions;