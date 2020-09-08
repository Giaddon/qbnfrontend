/**  */

class QualityData {

  static calculateMyAltValue(quality) {
    if (!quality.alts) return quality.value; // should be set toString()?
    let highest;
    for (let breakpoint of Object.keys(quality.alts)) {
      if (quality.value >= breakpoint) {
        highest = breakpoint;
      }
    }
    return quality.alts[highest];
  }

  static calculateMyDescription(quality) {
    if (!quality.descriptions) return '';
    let highest;
    for (let breakpoint of Object.keys(quality.descriptions)) {
      if (quality.value >= breakpoint) {
        highest = breakpoint;
      }
    }
    return quality.descriptions[highest];
  }

  static processAltText(quality) {
    let processedQuality = {...quality};
    if (!quality.alts) processedQuality.displayValue = quality.value; // should be set toString()?
    else {
      let highest;
      for (let breakpoint of Object.keys(quality.alts)) {
        if (quality.value >= breakpoint) {
          highest = breakpoint;
        }
      }
      processedQuality.displayValue = quality.alts[highest];
    }

    if (!quality.descriptions) processedQuality.displayDescription = '';
    else {  
      let highest;
      for (let breakpoint of Object.keys(quality.descriptions)) {
        if (quality.value >= breakpoint) {
          highest = breakpoint;
        }
      }
      processedQuality.displayDescription = quality.descriptions[highest];
    }
    
    
    return processedQuality
  }

}

export default QualityData;