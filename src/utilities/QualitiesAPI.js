/** Utility class for the faux API. Will be overhauled if we have a real backend. */

import { qualities } from '../data/qualities.js';
import QualityData from '../dataclasses/QualityData';

class QualitiesAPI {

  static getAll() {
    return qualities;
  }

  static getStarting() {
    let startingQualities = {};
    Object.values(qualities).forEach(quality => {
      if (quality.value > 0) {
        let newQuality = QualityData.processAltText(quality);
        startingQualities[newQuality.id] = newQuality;
      }
    })
    return startingQualities;
  }

  static getQualityById(id) {
    return {...qualities[id]};
  }
}

export default QualitiesAPI;