const domains = {
  1: {
    id: 1,
    title: "A beginning.",
    description: "Something is starting...",
    locked: true,
    actions: [
      {
        id: "open",
        type: "modify",
        title: "Open your eyes.",
        description: "The dark is nice, yes. But maybe there is something more?",
        results: {
          hide: true,
          qualities: [
            {
              id: "domain",
              value: 2,
              type: "set", 
            },
            {
              id: "forming",
              value: 2,
              type: "set"
            },
          ],
        },
        reqs: [
          {
            id: "forming",
            min: 1,
            max: 1,
          },
        ],
      },
    ],
  },

  2: {
    id: 2,
    title: "You are taking shape.",
    description: "Swirling energies gather, and something new is forming. What is it like?",
    locked: true,
    actions:[
      {
        id: "body",
        type: "storylet",
        title: "Consider your body",
        description: "",
        results: {
          storylet: "body",
        },
        reqs: [
          {
            id: "body",
            max: 0, 
          },
        ],
      },

      {
        id: "mind",
        type: "storylet",
        title: "Consider your mind",
        description: "",
        results: {
          storylet: "mind",
        },
        reqs: [
          {
            id: "mind",
            max: 0, 
          },
        ],
      },

      {
        id: "emerge",
        type: "modify",
        title: "Emerge into the world",
        description: "What could be out there?",
        results: {
          hide: true,
          qualities: [
            {
              id: "domain",
              value: 3,
              type: "set",
            },
            {
              id: "forming",
              value: 3,
              type: "set",
            }
          ],
        },
        reqs: [
          {
            id: "mind",
            min: 1,
            max: 1, 
          },
          {
            id: "body",
            min: 1,
            max: 1, 
          },
        ],
      },

    ],  
  },

  3: {
    id: 3,
    title: "Light overtakes you...",
    description: "Sorry, this is the end of the game. But a promising start, eh?",
    locked: true,
    actions:[],
  },

}

export { domains };