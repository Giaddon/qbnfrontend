/**  */

class QualityFunctions {

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
    processedQuality.displayValue = QualityFunctions.calculateMyAltValue(processedQuality);
    processedQuality.displayDescription = QualityFunctions.calculateMyDescription(processedQuality);
   
    return processedQuality
  }

}

export default QualityFunctions;