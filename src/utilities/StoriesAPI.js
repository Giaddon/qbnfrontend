/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { storylets } from '../data/storylets.js';

class StoriesAPI {
  static getAll() {
    return storylets;
  }
  
  static getByDomainId(domainId, storyletId) {
    return storylets[domainId][storyletId];
  }
}

export default StoriesAPI;