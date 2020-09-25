const defaultQualities = {
  domain: {
    id: "domain",
    name: "Domain",
    category: "Location",
    value: 1,
    descriptions: [
      {
        value: 1,
        description: "The current domain.",
      },
    ],
    alts: [
      {
        value: 1,
        alt: "The start of the story.",
      },
    ],
    invisible: true,
  },
}

const defaultDomains = {
  1: {
    id: 1,
    title: "Starting Domain",
    text: "The story begins here.",
    actions: [],
    slotsCount: 2,
    locked: false,
  }
};

const defaultActions = {};

const defaultContexts = {};

const defaultEvents = {};

export { 
  defaultQualities, 
  defaultDomains, 
  defaultActions, 
  defaultContexts, 
  defaultEvents, 
};