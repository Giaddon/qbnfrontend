/** Utility class for the faux API. Will be overhauled when we have a real backend. */

import { events } from '../data/world.js';
import GameAPI from './GameAPI.js';

class EventsAPI {
  static getAllEvents() {
    if (GameAPI.gameDataInLocalStorage()) {
      const stringEvents = localStorage.getItem("playevents");
      const parsedEvents = JSON.parse(stringEvents);
      return {...parsedEvents}
    } else {
      return {...events};
    }
  }
  static getEventById(eventId) {
    if (GameAPI.gameDataInLocalStorage()) {
      const stringEvents = localStorage.getItem("playevents");
      const parsedEvents = JSON.parse(stringEvents);
      return {...parsedEvents[eventId]}
      }  else {
      return {...events[eventId]};
    }
  }

}

export default EventsAPI;