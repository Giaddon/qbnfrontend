
import QualitiesAPI from './QualitiesAPI';
import QualityFunctions from './QualityFunctions';

class ActionFunctions {

  static selectStaticActions(actions, qualities) {    
    let availableActions = [];
    let lockedActions = [];

    for (let originalAction of actions) {
      if (originalAction.results.type === "challenge") {
        const { type, action } = ActionFunctions.calculateChallenge(originalAction, qualities);
        if (type === 'a') availableActions.push(action);
        else if (type === 'l') lockedActions.push(action);
      } else {
        const { type, action } = ActionFunctions.prepareAction(originalAction, qualities);
        if (type === 'a') availableActions.push(action);
        else if (type === 'l') lockedActions.push(action);
      }
    }    
  
    return { availableActions, lockedActions };
  }

  static selectDynamicActions(actions, qualities) {
    let possibleActions = [];
    for (let originalAction of actions) {
      if (originalAction.results.type==="challenge") {
        const { type, action } = ActionFunctions.calculateChallenge(originalAction, qualities);
        if (type==='a') possibleActions.push(action);
      } else {
        const { type, action } = ActionFunctions.prepareAction(originalAction, qualities);
        if (type==='a') possibleActions.push(action);
      } 
    } 
    return { possibleActions }
  }

  static prepareAction(originalAction, qualities) {
    let action = {...originalAction}
    const availableIntro = 'Unlocked with\n';
    const lockedIntro = 'Requires\n';
    let availableTooltip = [];
    let lockedTooltip = [];
    let finalTooltip = ' ';
    let qualityReport = {};  
    
    if (!action.reqs || action.reqs.length < 1) finalTooltip = "No requirements.";
    
    else {
      for (let req of action.reqs) {
        const min = req.min || 0;
        const max = req.max || (req.max === 0 ? 0 : Infinity);
        const quality = QualitiesAPI.getQualityById(req.qualityId);
        const qualityName = quality.name;
        const playerValue = qualities[req.qualityId] ? qualities[req.qualityId].value : 0;
        if (min <= playerValue && playerValue <= max) { // if playerValue within acceptable range
        if (!quality.invisible) availableTooltip.push(`${qualityName} between ${min} and ${max} (you have ${playerValue}).\n`);
          qualityReport[req.qualityId] = true;
        } else { // if outside acceptable range
          action.locked = true;
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
    } else if (action.reveal.type === "all" && 
      (Object.values(qualityReport).every(quality => quality === true))) {
        return { type: 'a', action };
      } else if (action.reveal?.type === "some" &&
        (Object.values(qualityReport).some(quality => quality === true))) {
          if (action.locked) return {type: 'l', action }
          else return { type: 'a', action };  
      }

    else return { type: 'h'};
  }

  static calculateChallenge(originalAction, qualities) {
    let action = {...originalAction}
    let oddsDescription = "";
    let tooltip = "";
    let passed = true;
    let odds = 0;
    const {qualityId, difficulty} = action.challenge;
    const quality = QualitiesAPI.getQualityById(qualityId);
    
    let qualityValue = qualities[qualityId]?.value || 0;
    if (originalAction.challenge.luck) {
      odds = difficulty;
      oddsDescription = `\n\nThis challenge is pure luck. There is a ${difficulty}% chance it will go in your favor.`
    } else if (qualityValue < difficulty) {
      passed = false;
      oddsDescription = `\n\nThis is a ${quality.name} challenge.\nYour ${quality.name} is too low to make an attempt.`
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
    
    if (originalAction.challenge.luck) tooltip = `This is a challenge of pure luck. There is a ${difficulty}% chance it will go in your favor.`;

    action.odds = odds;
    action.tooltip = tooltip;
    action.text += oddsDescription;

    if (passed) return {action, type:'a'};
    if (!passed && action.reveal.type === 'always') return {action, type:'l'};
    else return {type: 'h'};
  }
  
  static processActionResults(results, qualities) {
    let outcomes = [];
    let modifiedQualities = [];

    for (let change of results.changes) {
      const { id, value } = change;
      let copiedQuality = qualities[id] ? {...qualities[id]} : QualitiesAPI.getQualityById(id);
      let outcome = '';
      if(!copiedQuality.value) { 
        copiedQuality.value = 0;
      } 
      if (change.type === "adjust") {
        copiedQuality.value += value;
        if (!copiedQuality.invisible) outcome = `${copiedQuality.name} ${value > 0 ? "increased" : "decreased"} by ${Math.abs(value)}.`
      } else if (change.type === "set") { 
        copiedQuality.value = value;
        if (!copiedQuality.invisible) outcome = `${copiedQuality.name} is now ${value}.`;
      } else if (change.type === "range") { 
        const result = Math.floor(Math.random() * (change.max+1 - value) + value);
        copiedQuality.value = result;
        if (!copiedQuality.invisible) outcome = `${copiedQuality.name} is now ${result}.`;
      } else if (change.type === "percent") { 
        copiedQuality.value = Math.ceil(copiedQuality.value + (copiedQuality.value * (value/100)));
        if (!copiedQuality.invisible) outcome = `${copiedQuality.name} ${value > 0 ? "increased" : "decreased"} by ${value} percent.`;
      } 
      if (copiedQuality.value === 0 && qualities[copiedQuality.id]) {
        if (!copiedQuality.invisible) outcome = `You have lost all ${copiedQuality.name}!`;
      } else {
        copiedQuality = QualityFunctions.processAltText(copiedQuality);
      }
      modifiedQualities.push(copiedQuality);        
      outcomes.push(outcome);
    }// end of change loop  
  
    return { outcomes, modifiedQualities };
  }

}

export default ActionFunctions;