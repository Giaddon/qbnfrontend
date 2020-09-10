/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { domains } from '../data/world.js';

class DomainsAPI {
  static getAll() {
    return domains;
  }
  
  static getDomainById(id) {
    let data = localStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);
      if (data.source === "storage") {
        const stringDomains = localStorage.getItem("playdomains");
        const parsedDomains = JSON.parse(stringDomains);
        return {...parsedDomains[id]};
      }
    } else {
      return {...domains[id]};
    }
  }

}

export default DomainsAPI;