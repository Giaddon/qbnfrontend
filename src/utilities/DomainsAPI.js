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
    if (GameAPI.gameDataInLocalStorage()) {
      const stringDomains = localStorage.getItem("playdomains");
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
    if (GameAPI.gameDataInLocalStorage()) {
        const stringDomains = localStorage.getItem("playdomains");
        const parsedDomains = JSON.parse(stringDomains);
        return {...parsedDomains[id]};
    } else {
      return {...domains[id]};
    }
  }

}

export default DomainsAPI;