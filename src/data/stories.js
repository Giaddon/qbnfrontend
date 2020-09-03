/** Faux data that serves as our backend for now. */

const stories = {
  beginning: [
    {
      id: "start",
      title: "Open your eyes.",
      description: "The dark is nice, yes. But maybe there is something more?",
      results: {
        domain: "beginning2",
        qualities: [
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
          comparison: {
            value: 1,
            type: "equal",
          }
        },
      ],
    },

    {
      id: "prodigy",
      title: "A prodigy!",
      description: "You emerge fully formed!",
      results: {
        domain: "beginning2",
        qualities: [
          {
            id: "forming",
            value: 5,
            type: "set"
          },
        ],
      },
      reqs: [
        {
          id: "forming",
          comparison: {
            value: 4,
            type: "equal",
          }
        },
      ],
    },
  ],

  beginning2: [
    {
      id: "strong",
      title: "Strong and hulking.",
      description: "Damn, you're ripped!",
      results: {
        domain: "beginning3",
        qualities: [
          {
            id: "forming",
            value: 3,
            type: "set"
          },
          {
            id: "strength",
            value: 5,
            type: "set"
          },
        ],
      },
      reqs: [
        {
          id: "forming",
          comparison: {
            value: 2,
            type: "equal",
          }
        },
      ],
    },
    {
      id: "tentacles",
      title: "Betentacled.",
      description: "Eight writhing tentacles dance in front of you. Could they be yours?",
      results: {
        domain: "beginning3",
        qualities: [
          {
            id: "forming",
            value: 3,
            type: "set"
          },
          {
            id: "strength",
            value: 1,
            type: "set"
          },
          {
            id: "tentacles",
            value: 8,
            type: "set"
          },
        ],
      },
      reqs: [
        {
          id: "forming",
          comparison: {
            value: 2,
            type: "equal",
          }
        },
      ],
    },
  ],
} 

  
  
  
  
  
//   buyxl: {
//     id: "buyxl", // unique lowercase string. 
//     name: "Buy Zzbay-XL", // String. Displayed to the player. 
//     description: "You've always wanted one... is today the day?", // String. Displayed to the player to provide context.
//     reqs: [ //An array of objects.
//       {
//         id: "cash", // String. The id of the quality being checked.
//         comparison: { //Object. Used if you want to target a specific value or greater than or less than comparisons.
//           value: 8, // Integer. The target value.
//           type: "bigger", // String. Can be "equal", "smaller", or "bigger". Describes the relationship between the value and quality value. If "equal" the two values must be the same. if "smaller", the quality value must be less than or equal to the value. If "bigger" the quality value must be greater than or equal to the value.
//         }
//       },
//       {
//         id: "location",
//         comparison: { 
//           value: 1, 
//           type: "equal",
//         },
//       },
//       {
//         id: "core",
//         comparison: { 
//           value: 3, 
//           type: "not",
//         }
//       }
//     ],
//     content: {
//       text: '"One ZZbay-XL, please!" you say, slapping down your cash.',
//     },
//     choices: [
//       {
//         text: "Nice.",
//         results: [
//           {
//             quality: "cash",
//             value: -8,
//             type: "adjust"
//           },
//           {
//             quality: "core",
//             value: 3,
//             type: "set",
//           }
//         ]
//       },
//     ]
//   },

//   buygatling: {
//     id: "buygatling",
//     name: "Buy a gatling cannon.",
//     description: "You're tired of your smelly plasma spitter.",
//     reqs: [
//       {
//         id: "location",
//         comparison: {
//           value: 1,
//           type: "equal",
//         }
//       },
//       {
//         id: "weapons",
//         comparison: { 
//           value: 1, 
//           type: "not",
//         }
//       },
//       {
//         id: "cash",
//         comparison: { 
//           value: 5, 
//           type: "bigger",
//         }
//       }
//     ],
//     content: {
//       text: 'The shopkeeper mech nods approvingly as you reach for the classic weapon.',
//     },
//     choices: [
//       {
//         text: "The gatling cannon is mine!",
//         results: [
//           {
//             quality: "cash",
//             value: -5,
//             type: "adjust"
//           },
//           {
//             quality: "weapons",
//             value: 1,
//             type: "set",
//           }
//         ]
//       },
//     ]
//   },

//   dance: {
//     id: "dance",
//     name: "Dance",
//     description: "Time to strut your struts.",
//     reqs: [
//       {
//         id: "location",
//         comparison: {
//           value: 2,
//           type: "equal",
//         }
//       },
//     ],
//     content: {
//       text: 'You push your mech to the limit!',
//     },
//     choices: [
//       {
//         text: "Nice.",
//         results: [
//           {
//             quality: "fun",
//             value: 1,
//             type: "adjust"
//           },
//         ]
//       },
//     ]
//   },

//   win: {
//     id: "win",
//     name: "Win the dance off.",
//     description: "You've got the gear. You've got the moves. Time to bring it home.",
//     reqs: [
//       {
//         id: "location",
//         comparison: {
//           value: 2,
//           type: "equal",
//         }
//       },
//       {
//         id: "fun",
//         range: {
//           min: 3,
//           max: 50,
//         }
//       },
//       {
//         id: "weapons",
//         comparison: {
//           value: 1,
//           type: "equal",
//         }
//       },
//       {
//         id: "core",
//         comparison: {
//           value: 3,
//           type: "equal",
//         }
//       },
//     ],
//     content: {
//       text: 'With the new core, you gyrate faster than ever. When rival mechs step up, you fire your gatling cannon in time to the music. You\'re unstoppable.',
//     },
//     choices: [
//       {
//         text: "I am the dance god of all mechs!",
//         results: [
//           {
//             quality: "fun",
//             value: 100,
//             type: "adjust"
//           },
//         ]
//       },
//     ]
//   },

//   getmission: {
//     id: "getmission",
//     name: "Get a mission.",
//     description: "Mechs in the club are always looking for help with missions.",
//     reqs: [
//       {
//         id: "location",
//         comparison: {
//           value: 2,
//           type: "equal",
//         }
//       },
//     ],
//     content: {
//       text: 'A shady mech waves you over with a XR77 rifle attachement. "Wanna mission?" it asks.',
//     },
//     choices: [
//       {
//         text: "Accept the mission.",
//         results: [
//           {
//             quality: "missions",
//             value: 1,
//             type: "adjust"
//           },
//         ]
//       },
//     ]
//   },

//   domission: {
//     id: "domission",
//     name: "Do a mission.",
//     description: "Blow up the bad guys, get some cash. Easy.",
//     reqs: [
//       {
//         id: "location",
//         comparison: {
//           value: 3,
//           type: "equal",
//         }
//       },
//       {
//         id: "missions",
//         comparison: {
//           value: 1,
//           type: "bigger",
//         }
//       },
//     ],
//     content: {
//       text: 'Always bad mechs out there to explode. And you love it!',
//     },
//     choices: [
//       {
//         text: "Complete the mission.",
//         results: [
//           {
//             quality: "cash",
//             value: 5,
//             type: "adjust"
//           },
//           {
//             quality: "missions",
//             value: -1,
//             type: "adjust"
//           },
//         ]
//       },
//     ]
//   },

//   travel: {
//     id: "travel",
//     name: "Travel",
//     description: "Go somewhere else.",
//     content: {
//       text: 'In this infinite, glittering universe... where will you go?',
//     },
//     choices: [
//       {
//         text: "The mech shop.",
//         results: [
//           {
//             quality: "location",
//             value: 1,
//             type: "set"
//           }
//         ]
//       },
//       {
//         text: "The dance club.",
//         results: [
//           {
//             quality: "location",
//             value: 2,
//             type: "set"
//           }
//         ]
//       },
//       {
//         text: "On a mission.",
//         results: [
//           {
//             quality: "location",
//             value: 3,
//             type: "set"
//           }
//         ]
//       },
//     ]
//   },


// } 

export { stories };