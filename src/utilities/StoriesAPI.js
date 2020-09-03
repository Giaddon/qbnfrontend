/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { stories } from '../data/stories.js';

class StoriesAPI {
  static getAll() {
    return stories;
  }
  
  static getByDomain(domain) {
    return stories[domain];
  }
}

export default StoriesAPI;