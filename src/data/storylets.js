/** Faux data that serves as our backend for now. */

const storylets = {
  2: {
    body: {
      id: "body",
      title: "Consider your body",
      description: "Apparently you've been inside something this whole time. What does it come equipped with?",
      actions:[
        {
          id: "tentacles",
          type: "modify",
          title: "A standard number of tentacles",
          description: "Writhing tentacles dance in front of you. Could they be yours?",
          results: {
            qualities: [
              {
                id: "tentacles",
                value: 8,
                type: "set",
              },
              {
                id: "body",
                value: 1,
                type: "set",
              },
            ],
            report: {
              title: "You are betentacled!",
              description: "Better than hands. Better than feet. Tentacles forever.",
            }
          },
        },
  
        {
          id: "moretentacles",
          type: "challenge",
          title: "MORE tentacles!",
          description: "The standard number of tentacles are great. But what if you could have more?",
          reqs: [
            {
              id: "forming",
              difficulty: 2,
            },
          ],
          results: {
            success: {
              qualities: [ 
                {
                  id: "tentacles",
                  value: 10,
                  type: "set",
                },
                {
                  id: "body",
                  value: 1,
                  type: "set",
                },
              ],
              report: {
                title: "Success!",
                description: "More tentacles!",
              }
            },
            failure: {
              qualities: [ 
                {
                  id: "tentacles",
                  value: 6,
                  type: "set",
                },
                {
                  id: "body",
                  value: 1,
                  type: "set",
                },
              ],
              report: {
                title: "Failure!",
                description: "Fewer tentacles!",
              }
            }
          },
        },
  
      ], 
    },

    mind: {
      id: "mind",
      title: "Consider your mind.",
      description: "Something is reading this, right?",
      actions:[
        {
          id: "normal",
          type: "modify",
          title: "A normal mind.",
          description: "A normal mind could get you farther than most.",
          results: {
            qualities: [
              {
                id: "mind",
                value: 1,
                type: "set",
              },
              {
                id: "brainpower",
                value: 2,
                type: "set",
              },
            ],
            report: {
              title: "A perfectly normal brain.",
              description: "Nothing unusual here. Just a standard brain that can think about trees, the weather, time, the chemical makeup of dirt, and come up with a retort ten minutes too late.",
            }
          },
        },
  
        {
          id: "better",
          type: "challenge",
          title: "An abnormal mind.",
          description: "Could be worse, could be better... but it sure won't be normal.",
          reqs: [
            {
              id: "forming",
              difficulty: 2,
            },
          ],
          results: {
            success: {
              qualities: [ 
                {
                  id: "mind",
                  value: 1,
                  type: "set",
                },
                {
                  id: "brainpower",
                  value: 3,
                  type: "set",
                }
              ],
              report: {
                title: "GENIUS!",
                description: "Your brain surges with notions incomprehensible to others. Did you know 'irregardless' isn't a word?",
              }
            },
            failure: {
              qualities: [ 
                {
                  id: "mind",
                  value: 1,
                  type: "set",
                },
                {
                  id: "brainpower",
                  value: 1,
                  type: "set",
                },
              ],
              report: {
                title: "Something's gone askew.",
                description: "You're not quite right in the head. But you already knew that, didn't you?",
              },
            }
          },
        },
  
      ], 
    },    

  },

} 

export { storylets };