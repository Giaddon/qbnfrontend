

class EventFunctions {


  static evaluateEvents(originalEvents, qualities) {
    let possibleEvents = [];
    for (let originalEvent of originalEvents) {
      let event = {...originalEvent}
      for (let trigger of event.triggers) {
        const min = trigger.min || 0;
        const max = trigger.max || (trigger.max === 0 ? 0 : Infinity);
        const playerValue = qualities[trigger.qualityId] ? qualities[trigger.qualityId].value : 0;
        if (min <= playerValue && playerValue <= max) {
          
        } else {
          event.noMatch = true;
        }
      } // end trigger loop
      if (!event.noMatch) {
        possibleEvents.push(event);
      }
    } // end event loop
    //find the highest priority event
    let lowest = Infinity;
    let selectedEvent = null;
    for (let event of possibleEvents) {
      if (event.priority < lowest) {
        lowest = event.priority;
        selectedEvent = event;
      }
    }

    return selectedEvent; 
  }
}

export default EventFunctions