/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { domains } from '../data/world.js';

class DomainsAPI {
  static getAll() {
    return domains;
  }
  
  static getStarting() {
    console.log(domains["1"]);
    return domains["1"];
  }

  static getDomainById(id) {
    console.log(domains);
    return domains[id];
  }
}

export default DomainsAPI;