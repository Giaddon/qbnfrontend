/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { domains } from '../data/domains.js';

class DomainsAPI {
  static getAll() {
    return domains;
  }
  
  static getStarting() {
    return domains.beginning;
  }

  static getDomainById(id) {
    return domains[id];
  }
}

export default DomainsAPI;