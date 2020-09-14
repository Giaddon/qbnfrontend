/** Utility class for the faux API. Will be overhauled if we have a real backend. */

import { qualities } from '../data/world.js';
import QualityFunctions from './QualityFunctions.js';
import GameAPI from './GameAPI.js';

class QualitiesAPI {

  static getAll() {
    return qualities;
  }

  static getStarting() {
    let startingQualities = {};
    let selectedQualities = {};
    if (GameAPI.gameDataInLocalStorage) {
      const stringQualities = localStorage.getItem("playqualities");
      selectedQualities = JSON.parse(stringQualities);
    } else {
      selectedQualities = qualities;
    }
    
    Object.values(selectedQualities).forEach(quality => {
      if (quality.value > 0) {
        let newQuality = QualityFunctions.processAltText(quality);
        startingQualities[newQuality.id] = newQuality;
      }
    })
      
    return startingQualities;
  }
  

  static getQualityById(id) {
    let data = localStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);
      if (data && data.source==="storage") {
        const stringQualities = localStorage.getItem("playqualities");
        const parsedQualities = JSON.parse(stringQualities);
        return {...parsedQualities[id]};
      }
    } else {
      return {...qualities[id]};
    }
  }
}

export default QualitiesAPI;