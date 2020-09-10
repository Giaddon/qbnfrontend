/** Utility class for the faux API. Will be overhauled if we have a real backend. */

import { qualities } from '../data/world.js';
import QualityData from '../dataclasses/QualityData';

class QualitiesAPI {

  static getAll() {
    return qualities;
  }

  static getStarting() {
    let startingQualities = {};
    let data = localStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);
      if (data.source==="storage") {
        const stringQualities = localStorage.getItem("playqualities");
        const parsedQualities = JSON.parse(stringQualities);
        Object.values(parsedQualities).forEach(quality => {
          if (quality.value > 0) {
            let newQuality = QualityData.processAltText(quality);
            startingQualities[newQuality.id] = newQuality;
          }
        })
        return startingQualities;
      }
    } else {
      Object.values(qualities).forEach(quality => {
        if (quality.value > 0) {
          let newQuality = QualityData.processAltText(quality);
          startingQualities[newQuality.id] = newQuality;
        }
      })
      return startingQualities;
    }
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