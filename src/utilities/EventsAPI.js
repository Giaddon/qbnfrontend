/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { events } from '../world/world.js';
import GameAPI from './GameAPI.js';

class EventsAPI {
  
  static getAllEvents() {
    const source = GameAPI.gameDataInLocalStorage()
    if (source === "preview") {
      const stringEvents = localStorage.getItem("playevents");
      const parsedEvents = JSON.parse(stringEvents);
      return {...parsedEvents}
    } else if (source === "uploaded") {
      const stringEvents = localStorage.getItem("uploadedevents");
      const parsedEvents = JSON.parse(stringEvents);
      return {...parsedEvents}
    } else {
      return {...events};
    }
  }
  static getEventById(eventId) {
    const source = GameAPI.gameDataInLocalStorage()
    if (source === "preview") {
      const stringEvents = localStorage.getItem("playevents");
      const parsedEvents = JSON.parse(stringEvents);
      return {...parsedEvents[eventId]}
    } else if (source === "uploaded") {
      const stringEvents = localStorage.getItem("uploadedevents");
      const parsedEvents = JSON.parse(stringEvents);
      return {...parsedEvents[eventId]}
    } else {
      return {...events[eventId]};
    }
  }

}

export default EventsAPI;