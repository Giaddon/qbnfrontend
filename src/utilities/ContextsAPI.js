/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { contexts } from '../data/world.js';

class ContextsAPI {
  static getAll() {
    return contexts;
  }
  static getContextById(contextId) {
    let data = localStorage.getItem("data");
    if (data) data = JSON.parse(data);
    if (data.source==="storage") {
      console.log("searching for context ", contextId);
      const stringContexts = localStorage.getItem("playcontexts");
      const parsedContexts = JSON.parse(stringContexts);
      return {...parsedContexts[contextId]}
    } else {
      return {...contexts[contextId]};
    }
  }

  static getByDomainId(domainId, contextId) {
    return {...contexts[domainId][contextId]};
  }
}

export default ContextsAPI;