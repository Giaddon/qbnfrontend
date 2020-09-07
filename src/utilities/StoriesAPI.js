/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { storylets } from '../data/world.js';

class StoriesAPI {
  static getAll() {
    return storylets;
  }
  static getById(storyletId) {
    return storylets[storyletId];
  }


  static getByDomainId(domainId, storyletId) {
    return storylets[domainId][storyletId];
  }
}

export default StoriesAPI;