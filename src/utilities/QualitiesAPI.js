/** Utility class for the faux API. Will be overhauled if we have a real backend. */

import { qualities } from '../world/world.js';
import QualityFunctions from './QualityFunctions.js';
import GameAPI from './GameAPI.js';

class QualitiesAPI {

  static getStarting() {
    let startingQualities = {};
    let selectedQualities = {};
    const source = GameAPI.gameDataInLocalStorage()
    if (source === "preview") {
      const stringQualities = localStorage.getItem("playqualities");
      selectedQualities = JSON.parse(stringQualities);
    } else if (source === "uploaded") {
      const stringQualities = localStorage.getItem("uploadqualities");
      selectedQualities = JSON.parse(stringQualities);
    } else {
      selectedQualities = qualities;
    }
    
    Object.values(selectedQualities).forEach(quality => {
      if (quality.value > 0) {
        let newQuality = QualityFunctions.processAltText(quality);
        newQuality.pinned = newQuality.creatorPinned;
        startingQualities[newQuality.id] = newQuality;
      }
    })
      
    return startingQualities;
  }
  
  static getQualityById(id) {
    const source = GameAPI.gameDataInLocalStorage()
    if (source === "preview") {
      const stringQualities = localStorage.getItem("playqualities");
      const parsedQualities = JSON.parse(stringQualities);
      return {...parsedQualities[id]};
    } else if (source === "uploaded") {
      const stringQualities = localStorage.getItem("uploadqualities");
      const parsedQualities = JSON.parse(stringQualities);
      return {...parsedQualities[id]};
    } else {
      return {...qualities[id]};
    }
  }

}

export default QualitiesAPI;