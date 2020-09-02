/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { qualities } from '../data/qualities.js';

class QualitiesAPI {
  static getAll() {
    return qualities;
  }
  
  static getStarting() {
    let startingQualities = {};
    Object.values(qualities).forEach(quality => {
      if (quality.value) startingQualities[quality.id] = quality;
    })
    return startingQualities;     
  }

  static getById(id) {
    return qualities[id];
  }
}

export default QualitiesAPI;