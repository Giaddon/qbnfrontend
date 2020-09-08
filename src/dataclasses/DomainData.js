/** */

import QualitiesAPI from '../utilities/QualitiesAPI';

class DomainData {

  static selectActions(actions, qualities) {    
    let availableActions = [];
    let lockedActions = [];
    let possibleActions = [];
    const availableIntro = 'Unlocked with\n';
    const lockedIntro = 'Requires\n';
    
    for (let originalAction of actions.static) {
      let action = {...originalAction}
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
      if (finalTooltip.length === 1) finalTooltip = "Unlocked."
      action.tooltip = finalTooltip.trim();

      if (action.reveal?.type === "all" && 
        (Object.values(qualityReport).every(quality => quality === true))) availableActions.push(action);
    
      else if (action.reveal?.type === "some" && 
        action.reveal.qualities.every(quality => 
          qualityReport[quality] === true
        )) {
          if (action.locked) lockedActions.push(action);
          else availableActions.push(action);  
      }

      else if (!action.reveal?.type || action.reveal.type === "always") {
        if (action.locked) lockedActions.push(action);
        else availableActions.push(action);   
      }
    } // end static action loop
    if (actions.dynamic?.length > 0) {  
      for (let originalAction of actions.dynamic) {
        let action = {...originalAction}
        let availableTooltip = [];
        let finalTooltip = ' ';

        if (!action.reqs) finalTooltip = "No requirements.";
        else {
          for (let req of action.reqs) { 
            const min = req.min || 0;
            const max = req.max || req.max === 0 ? 0 : Infinity 
            const quality = QualitiesAPI.getQualityById(req.qualityId);
            const qualityName = quality.name;
            const playerValue = qualities[req.qualityId]?.value || 0;
            if (min <= playerValue && playerValue <= max) { // if qualities match
              if (!quality.invisible) availableTooltip.push(`${qualityName} between ${min} and ${max} (you have ${playerValue}).\n`);
            } else { // otherwise
              action.locked = true; // lock action
            }
          } // end req loop
        }
        if (availableTooltip.length > 0) finalTooltip += availableIntro + availableTooltip.join("\n");

        action.tooltip = finalTooltip.trim();

        if (!action.locked) possibleActions.push(action);
      } // end dynamic action loop
    }
  
    return { availableActions, lockedActions, possibleActions };
  }

}

export default DomainData;