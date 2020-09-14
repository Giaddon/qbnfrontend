/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { domains } from '../data/world.js';
import GameAPI from './GameAPI';

class DomainsAPI {
  static getAll() {
    return domains;
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