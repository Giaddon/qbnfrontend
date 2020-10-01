/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { domains } from '../data/world.js';
import GameAPI from './GameAPI';

class DomainsAPI {
  static getAll() {
    return domains;
  }
  
  static getStartingDomains() {
    let startingDomains = [];
    let allDomains;
    let source = GameAPI.gameDataInLocalStorage()
    if (source === "preview") {
      const stringDomains = localStorage.getItem("playdomains");
      allDomains = JSON.parse(stringDomains);
    } else if (source === "uploaded") {
      const stringDomains = localStorage.getItem("uploaddomains");
      allDomains = JSON.parse(stringDomains);
    } else {
      allDomains = domains;
    }
    Object.values(allDomains).forEach(d => {
      if (d.availableAtStart) startingDomains.push({id: d.id, title: d.title});
    })
    return startingDomains;
  }

  static getDomainById(id) {
    const source = GameAPI.gameDataInLocalStorage();

    if (source === "preview") {
        const stringDomains = localStorage.getItem("playdomains");
        const parsedDomains = JSON.parse(stringDomains);
        return {...parsedDomains[id]};
    } else if (source === "uploaded") {
      const stringDomains = localStorage.getItem("uploaddomains");
      const parsedDomains = JSON.parse(stringDomains);
      return {...parsedDomains[id]};
    } else {
      return {...domains[id]};
    }
  }

}

export default DomainsAPI;