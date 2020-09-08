const domains =
{
  "1": {
    "id": "1",
    "title": "Deep Street West | Day",
    "text": "One of the most prosperous neighborhoods in the city.",
    "locked": false,
    "slotsCount": 2,
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
              "max": 1,
            },
          ],
        },
        {
          "id": "ponder",
          "type": "static",
          "title": "Ponder potential targets",
          "text": "There are some fine houses on Deep Street.",
          "reveal": {
            "type": "all",
          },
          "results": {
            "type": "context",
            "context": "targets",
          },
          "reqs": [
            {
              "qualityId": "blank",
              "max": 0,
            },
          ],
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

      ]
    },
    "contexts": {
      "consider": {
        "id": "consider",
        "title": "A night of thievery",
        "text": "You've got eight hours to investigate the area, find a good target, and build up resources. Then you'll be back at night to rob your target blind. That should be no trouble for you, because you trained under...",
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
              "title": "...A lifting artist",
              "text": "To say you \"trained under\" them is not quite correct, but you did spend many months observing them as they pickpocketed half the city blind.",
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
  }


}

export { domains };