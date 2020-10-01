
class DataFunctions {
  static prepareActions(actionContainers, createData) {
    if (actionContainers.length === 0) return actionContainers;
    
    for (let i = 0; i < actionContainers.length; i++) {
      let staticActions = [];
      let dynamicActions = [];
      let limit = actionContainers[i].actions ? actionContainers[i].actions.length : 0
      for (let j = 0; j < limit; j++) {  
        if (createData.actions[actionContainers[i].actions[j].id].dynamic) {
          dynamicActions.push(createData.actions[actionContainers[i].actions[j].id])
        } else {
        staticActions.push(createData.actions[actionContainers[i].actions[j].id]);
        }
      }
      actionContainers[i].staticActions = staticActions;
      if (dynamicActions.length > 0) actionContainers[i].dynamicActions = dynamicActions;
    }
    return actionContainers;
  }
  
  static prepareData(createData) {
    let domains = Object.values(createData.domains).map(domain => ({ ...domain }));
    let contexts = Object.values(createData.contexts).map(context => ({ ...context }));
    let events = Object.values(createData.events).map(event =>({...event}));
    
    domains = this.prepareActions(domains, createData);
    contexts = this.prepareActions(contexts, createData);
    events = this.prepareActions(events, createData);

    let objectifiedDomains = {};
    let objectifiedContexts = {};
    let objectifiedEvents = {};
    let objectifiedQualities = {};

    domains.forEach(domain => {
      objectifiedDomains[domain.id] = domain;
    }); 

    contexts.forEach(context => {
      objectifiedContexts[context.id] = context;
    }); 

    events.forEach(event => {
      objectifiedEvents[event.id] = event;
    });

    let qualities = Object.values(createData.qualities).map(quality => ({ ...quality }));

    for (let quality of qualities) {
      let processedDescriptions = {};
      if (quality.descriptions.length > 0) {
        quality.descriptions.forEach(d => {
          processedDescriptions[d.value] = d.description
        });
      } else {
        processedDescriptions = {1: ''};
      }  
      let processedAlts = {}
      if (quality.alts && quality.alts.length > 0) {
        quality.alts.forEach(a => {
          processedAlts[a.value] = a.alt;
        }) 
      } else {
        processedAlts = null;
      }
      quality.descriptions = processedDescriptions;
      quality.alts = processedAlts;
      objectifiedQualities[quality.id] = quality;
    }


    const stringQualities = JSON.stringify(objectifiedQualities);
    const stringDomains = JSON.stringify(objectifiedDomains);
    const stringContexts = JSON.stringify(objectifiedContexts);
    const stringEvents = JSON.stringify(objectifiedEvents);

    return { stringQualities, stringDomains, stringContexts, stringEvents }
  }

  static getCreateDataFromStorage() {
    let domains, contexts, events, qualities, actions;
    
    const stringDomains = localStorage.getItem("createdomains");
    if (stringDomains) domains = JSON.parse(stringDomains);
    
    const stringContexts = localStorage.getItem("createcontexts");
    if (stringContexts) contexts = JSON.parse(stringContexts);

    const stringEvents = localStorage.getItem("createevents");
    if (stringEvents) events = JSON.parse(stringEvents);

    const stringActions = localStorage.getItem("createactions");
    if (stringActions) actions = JSON.parse(stringActions);

    const stringQualities = localStorage.getItem("createqualities");
    if (stringQualities) qualities = JSON.parse(stringQualities);

    return {
      domains, 
      contexts: contexts || {}, 
      events: events || {}, 
      qualities, 
      actions: actions || {}
    }
  }

}

export default DataFunctions;