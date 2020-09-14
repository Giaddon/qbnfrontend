/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { contexts } from '../data/world.js';
import GameAPI from './GameAPI.js';

class ContextsAPI {
  static getAll() {
    return contexts;
  }
  static getContextById(contextId) {
    if (GameAPI.gameDataInLocalStorage) {
      const stringContexts = localStorage.getItem("playcontexts");
      const parsedContexts = JSON.parse(stringContexts);
      return {...parsedContexts[contextId]}
      }  else {
      return {...contexts[contextId]};
    }
  }
  
}

export default ContextsAPI;