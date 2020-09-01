/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { qualities } from '../data/qualities.js';

class QualitiesAPI {
  static getAll() {
    return qualities;
  }
  
  static getStarting() {
    return Object.values(qualities).filter(quality => quality.value);
    
  }

  static getById(id) {
    return qualities[id];
  }
}

export default QualitiesAPI;