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
    invisibile: true,
  },

  "1": {
    id: "1",
    name: "Coins",
    category: "Money",
    value: 0,
    descriptions: [
      {
        value: 1,
        description: "A single, solitary coin. Almost sad.",
      },
      {
        value: 3,
        description: "Enough to jingle, at least.",
      },
      {
        value: 5,
        description: "A shining heap!",
      },
    ],
    alts: [],
    invisibile: false,
  },
}

const defaultDomains = {
  1: {
    id: 1,
    title: "Starting Domain",
    text: "The story begins here.",
    staticActions: [{id:"1"}],
    dynamicActions: [{id:"2"}],
    slotsCount: 1,
    locked: false,
  }
};

const defaultActions = {
  "1": {
    id: "1",
    title: "A modify action.",
    text: "I change some of the player's qualities.",
    results: {
      type: "modify",
      changes:[{id: "1", type:"adjust", value: 1}],
      hide: false,
      report: {
        title: "A shiny coin!",
        text: "You don't know whose it was... but it's yours now."
      },
    },
    reqs: [],
    reveal: {
      type: "always",
    },
  },

  "2": {
    id: "2",
    title: "A context action.",
    text: "I open a new context for the player.",
    results: {
      type: "context",
      context: '1',
    },
    reqs: [
      {
        qualityId: "1",
        min: 0,
      }
    ],
    reveal: {
      type: "always",
    },
  },

  "3": {
    id: "3",
    title: "A challenge action.",
    text: "I branch into a success or failure result.",
    reveal: {
      type: "always"
    },
    challenge: [
      {
        qualityId: "1",
        difficulty: 2,
        luck: false,
      },
    ],
    results: {
      type: "challenge",
      success: {
        changes: [
          {
            id: "1",
            type: "adjust",
            value: 5,
          },
        ],
        report: {
          title: "A pile of coins!",
          text: "Wealth becomes you.",
        },
      },
      failure: {
        changes: [
          {
            id: "1",
            type: "set",
            value: 0,
          }
        ],
        report: {
          title: "You lost it all!",
          text: "Oh no.",
        },
      },
    },
  },
};

const defaultContexts = {
  "1": {
    id: "1",
    title: "Starting context",
    text: "More actions here.",
    staticActions: [{id: "3"}],
    locked: false,
  }
};

export { defaultQualities, defaultDomains, defaultActions, defaultContexts };