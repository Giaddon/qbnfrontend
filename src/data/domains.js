const domains =
{
  "1": {
    "id": "1",
    "title": "Approaching Deep Street",
    "text": "The crowded tenements and poorly kept shopfronts of Sparrow Hill give way to the manicured gardens, ritzy cafes, and fenced-in estates that populate The Climb. You slow as you approach the corner of Deep Street and Grand. It's not your favorite corner of the city, but it might be the richest. And if you want to take money and nice things from the people who have them, you need to go where they live.",
    "locked": false,
    "slotsCount": 0,
    "actions": {
      "static": [
        
        {
          "id": "1",
          "type": "static",
          "title": "Consider your plans",
          "text": "You're a thief, apparently. But what kind of thief? And what exactly are you doing here?",
          "reveal": {
            "type": "all",
          },
          "results": {
            "type": "context",
            "context": "consider",
          },
          "reqs": [
            {
              "qualityId": "blank",
              "min": 1,
            },
          ],
        },
        
        {
          "id": "pockets",
          "type": "static",
          "title": "Check your pockets.",
          "text": "What's that jangling in your coat?",
          "reveal": {
            "type": "all"
          },
          "reqs": [
            {
              "qualityId": "prepockets",
              "min": 1,
            },
          ],
          "results": {
            "type": "modify",
            "changes": [
              {
                "id": "kcoins",
                "type": "set",
                "value" : 5,
              },
              {
                "id": "tools",
                "type": "set",
                "value" : 3,
              },
              {
                "id": "tcoins",
                "type": "set",
                "value" : 3,
              },
              {
                "id": "prepockets",
                "type": "adjust",
                "value" : -1,
              },
            ],
            "report": {
              "title": "Let's see here...",
              "text": "Lockpicks, tools, a small bag of coins... if the thieving plan goes sideways you can always sit down for a nice coffee."
            }
          }
        },

        {
          "id": "arrival",
          "type":"static",
          "title": "You've arrived",
          "text": "There's a lot to do, and precious few hours to do it.",
          "reveal": {
            "type": "all"
          },
          "reqs": [
            {
              "qualityId": "blank",
              "max": 0,
            },
            {
              "qualityId": "prepockets",
              "max": 0,
            }
          ],
          "results": {
            "type": "modify",
            "changes": [
              {
                "id": "time",
                "type": "set",
                "value": 1,
              },
              {
                "id": "cover",
                "type": "set",
                "value": 5,
              },
              {
                "id": "domain",
                "type": "set",
                "value": 2,
              },
            ],
            "report": {
              "title": "Time to get started",
              "text": "Right, then. West Deep Street. One of the wealthiest addresses in the city. Take them for everything they got."
            },
          }
        }

      ],
    },

    "contexts": {
      "consider": {
        "id": "consider",
        "title": "A night of thievery",
        "text": "You've got six hours to investigate the area, find a good target, and make a plan. Then you'll be back at night to take everything you can. That should be no trouble for you, because you trained under...",
        "actions": {
          "static": [
            {
              "id": "blindalice",
              "type": "static",
              "title": "...Blind Alice",
              "text": "There isn't a better lockpick this side of Tallow Lane, and she taught you a few of her best tricks.",
              "results": {
                "type": "modify",
                "changes": [
                  {
                    "type": "set",
                    "id": "lpicking",
                    "value": 3,
                  },
                  {
                    "type": "set",
                    "id": "lifting",
                    "value": 1,
                  },
                  {
                    "type": "set",
                    "id": "manip",
                    "value": 1,
                  },
                  {
                    "type": "adjust",
                    "id": "blank",
                    "value": -1,
                  },
                ],
                "report": {
                  "title": "Blind Alice",
                  "text": "You spent a good few years running with Blind Alice's gang. She cut you loose when you learned she wasn't really blind."
                }
              }
            },
            {
              "id": "picker",
              "type": "static",
              "title": "...A lifting artist",
              "text": "To say you \"trained under\" them is not quite correct, but you did spend many months observing them as they pickpocketed half the city.",
              "results": {
                "type": "modify",
                "changes": [
                  {
                    "type": "set",
                    "id": "lpicking",
                    "value": 1,
                  },
                  {
                    "type": "set",
                    "id": "lifting",
                    "value": 3,
                  },
                  {
                    "type": "set",
                    "id": "manip",
                    "value": 1,
                  },
                  {
                    "type": "adjust",
                    "id": "blank",
                    "value": -1,
                  },
                ],
                "report": {
                  "title": "They had a gift.",
                  "text": "Watching them, you learned all the steps: the stumbling approach, the drunken collision, the intersection, the lift, the transfer from one pocket to another. It's a lot like a dance, or magic."
                }
              }
            },
            {
              "id": "partridge",
              "type": "static",
              "title": "...Sir Partridge",
              "text": "He claimed to be a knight. He claimed many things. His gift is that people often thought them true. He passed this skill onto you.",
              "results": {
                "type": "modify",
                "changes": [
                  {
                    "type": "set",
                    "id": "lpicking",
                    "value": 1,
                  },
                  {
                    "type": "set",
                    "id": "lifting",
                    "value": 1,
                  },
                  {
                    "type": "set",
                    "id": "manip",
                    "value": 3,
                  },
                  {
                    "type": "adjust",
                    "id": "blank",
                    "value": -1,
                  },
                ],
                "report": {
                  "title": "He really was convincing",
                  "text": "His final lesson is when he left the city with half your things. What a teacher! You learned a lot from that all right."
                }
              }
            },
            {
              "id": "streets",
              "type": "static",
              "title": "...No one",
              "text": "Training is for tradesmen, not thieves. You've learned by trying a little of everything, and you have some nights in Jackney Prison to prove it.",
              "results": {
                "type": "modify",
                "changes": [
                  {
                    "type": "set",
                    "id": "lpicking",
                    "value": 2,
                  },
                  {
                    "type": "set",
                    "id": "lifting",
                    "value": 2,
                  },
                  {
                    "type": "set",
                    "id": "manip",
                    "value": 2,
                  },
                  {
                    "type": "adjust",
                    "id": "blank",
                    "value": -1,
                  },
                ],
                "report": {
                  "title": "A thief of all trades",
                  "text": "You've always been sharp, observant; quick to try, willing to fail. That will help you tonight."
                }
              }
            },


          ]
        },
      }, 
    },
  },

  "2": {
    "id": "1",
    "title": "West Deep Street | Day",
    "text": " Couriers race by you on bicycles, weaving between  Folk in nice clothes wave cheerfully at one another with silk gloves. A place of activity, prosperity, opportunity. And then there's you.",
    "locked": false,
    "slotsCount": 2,
    "actions": {
      "static": [
        
        {
          "id": "ponder",
          "type": "static",
          "title": "Review potential targets",
          "text": "There are some fine houses on Deep Street.",
          "reveal": {
            "type": "all",
          },
          "results": {
            "type": "context",
            "context": "targets",
          },
        },
       
        {
          "id": "1",
          "type": "static",
          "title": "Visit Madame Karlo's Cafe",
          "text": "A popular establishment that draws Deep Street bluebloods and shabbier sorts from nearby districts.",
          "reveal": {
            "type": "all",
          },
          "results": {
            "type": "context",
            "context": "cafe",
          },
        }

      ],
      "dynamic": [
        {
          "id": "dynamic1",
          "type": "dynamic",
          "title": "",
          "text": "What's this...?",
          "reqs": [
            {
              "qualityId": "tcoins",
              "min": 1
            },
            {
              "qualityId": "blank",
              "max": 0,
            }
          ]
        },

        {
          "id": "dynamic2",
          "type": "dynamic",
          "title": "A note in the street.",
          "text": "What's this...?",
          "reqs": [
            {
              "qualityId": "tcoins",
              "min": 1
            },
            {
              "qualityId": "blank",
              "max": 0,
            },
          ]
        },

        {
          "id": "dynamic3",
          "type": "dynamic",
          "title": "A note in the street.",
          "text": "What's this...?",
          "reqs": [
            {
              "qualityId": "tcoins",
              "min": 1
            },
            {
              "qualityId": "blank",
              "max": 0,
            },
          ]
        },

        {
          "id": "dynamic4",
          "type": "dynamic",
          "title": "A note in the street.",
          "text": "What's this...?",
          "reqs": [
            {
              "qualityId": "tcoins",
              "min": 1
            },
            {
              "qualityId": "blank",
              "max": 0,
            },
          ]
        },

        {
          "id": "dynamic5",
          "type": "dynamic",
          "title": "A note in the street.",
          "text": "What's this...?",
          "reqs": [
            {
              "qualityId": "tcoins",
              "min": 1
            },
            {
              "qualityId": "blank",
              "max": 0,
            },
          ]
        },

        {
          "id": "dynamic6",
          "type": "dynamic",
          "title": "A note in the street.",
          "text": "What's this...?",
          "reqs": [
            {
              "qualityId": "tcoins",
              "min": 1
            },
            {
              "qualityId": "blank",
              "max": 0,
            },
          ]
        },

      ],
    },
    "contexts": {
      "targets": {
        "id": "targets",
        "title": "Potential Targets",
        "text": "Some of the oldest and wealthiest families in the city have homes here. To get a big score, you'll have to focus on a target.\n\nExplore Deep Street to discover more possibilities.",
        "actions": {
          "static": [
            {
              "id": "leblair",
              "title": "The Leblair Estate",
              "text": "",
              "results": {
                "type": "modify",
                "changes": [
                  {
                    "type": "set",
                    "id": "lpicking",
                    "value": 3,
                  },
                  {
                    "type": "set",
                    "id": "lifting",
                    "value": 1,
                  },
                  {
                    "type": "set",
                    "id": "manip",
                    "value": 1,
                  },
                  {
                    "type": "set",
                    "id": "blank",
                    "value": 0,
                  },
                ],
                "report": {
                  "title": "Blind Alice",
                  "text": "You spent a good few years running with Blind Alice's gang. She cut you loose when you learned she wasn't really blind."
                }
              }
            },
            {
              "id": "picker",
              "type": "static",
              "title": "Heart's Rest",
              "text": "To say you \"trained under\" them is not quite correct, but you did spend many months observing them as they pickpocketed half the city blind.",
              "reveal" :{
                "type": "all",
              },
              "results": {
                "type": "modify",
                "changes": [
                  {
                    "type": "set",
                    "id": "lpicking",
                    "value": 1,
                  },
                ],
                "report": {
                  "title": "",
                  "text": ""
                }
              },
              "reqs": [
                {
                 "qualityId": "heart",
                  "min":1,
                }
              ]
            },
            {
              "id": "partridge",
              "type": "static",
              "title": "...Sir Partridge",
              "text": "He claimed to be a knight. He claimed many things. His gift is that people often thought them true. He passed this skill onto you.",
              "results": {
                "type": "modify",
                "changes": [
                  {
                    "type": "set",
                    "id": "lpicking",
                    "value": 1,
                  },
                  {
                    "type": "set",
                    "id": "lifting",
                    "value": 1,
                  },
                  {
                    "type": "set",
                    "id": "manip",
                    "value": 3,
                  },
                  {
                    "type": "set",
                    "id": "blank",
                    "value": 0,
                  },
                ],
                "report": {
                  "title": "",
                  "text": ""
                }
              }
            },
            {
              "id": "streets",
              "type": "static",
              "title": "...No one",
              "text": "Training is for tradesmen, not thieves. You've learned by trying a little of everything, and you have some nights in Jackney Prison to prove it.",
              "results": {
                "type": "modify",
                "changes": [
                  {
                    "type": "set",
                    "id": "lpicking",
                    "value": 2,
                  },
                  {
                    "type": "set",
                    "id": "lifting",
                    "value": 2,
                  },
                  {
                    "type": "set",
                    "id": "manip",
                    "value": 2,
                  },
                  {
                    "type": "set",
                    "id": "blank",
                    "value": 0,
                  },
                ],
                "report": {
                  "title": "",
                  "text": ""
                }
              }
            },


          ]
        },
      },
    },
  },



}

export { domains };