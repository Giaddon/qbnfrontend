const defaultQualities = {
  domain: {
    id: 'domain',
    name: "Domain",
    value: 1,
    invisible: true,
    
  },

}

const defaultDomains = {
  1: {
    id: 1,
    title: "A beginning.",
    description: "Something is starting.",
    locked: true,
    actions: [
      {id: "2"}
    ],
  },
}

const defaultStorylets = {
  1: {
    id: "1",
    title: "The first storylet",
    description: "A wild storylet appears!",
    actions: [
      {id: "1"}
    ],
  }

};
const defaultActions = {
  1: {
    id: "1",
    type: "modify",
    title: "A modify action.",
    description: "I change qualities.",
    reveal: "always",
    results: {
      hide: true,
      changes: [
        {
          id: "domain",
          value: 2,
          type: "set"
        },
      ],
    },
    reqs: [
      {
        id: "domain",
        min: 1,
        max: 1,
      },
    ],
  },  

  2: {
    id: "2",
    type: "storylet",
    title: "A storylet action.",
    description: "I begin a storylet.",
    reveal: "always",
    results: {
      hide: true,
      storylet: "1"
    },
    reqs: [
      {
        id: "domain",
        min: 1,
        max: 1,
      },
    ],
  },

  3: {
    id: "3",
    type: "challenge",
    title: "A challenge action.",
    description: "I begin a challenge.",
    reveal: "always",
    remain: false,
    luck: false,
    reqs: [
      {
        id: "domain",
        difficulty: 1,
      },
    ],
    results: {
      success: {
        changes: [ 
          {
            id: "domain",
            value: 1,
            type: "set",
          },
        ],
        report: {
          title: "Success!",
          description: "You passed the challenge.",
        }
      },
      failure: {
        changes: [ 
          {
            id: "domain",
            value: 1,
            type: "set",
          },
        ],
        report: {
          title: "Failure!",
          description: "You failed the challenge.",
        }
      }
    },
  },
}

export { defaultQualities, defaultDomains, defaultStorylets, defaultActions };