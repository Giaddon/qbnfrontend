/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { contexts } from '../data/world.js';
import GameAPI from './GameAPI.js';

class ContextsAPI {

  static getContextById(contextId) {
    const source = GameAPI.gameDataInLocalStorage()
    if (source === "preview") {
      const stringContexts = localStorage.getItem("playcontexts");
      const parsedContexts = JSON.parse(stringContexts);
      return {...parsedContexts[contextId]}
    } else if (source === "uploaded") {
      const stringContexts = localStorage.getItem("uploadcontexts");
      const parsedContexts = JSON.parse(stringContexts);
      return {...parsedContexts[contextId]}
      } else {
      return {...contexts[contextId]};
    }
  }

}

export default ContextsAPI;