const qualities =
{
  "domain": {
    "id": "domain",
    "name": "Domain",
    "value": 1,
    "invisible": true,
  },

  "blank": {
    "id": "blank",
    "value": 1,
    "name": "Blank Slate",
    "invisible": true,
  },

  "heart": {
    "id": "heart",
    "name": "Heart's Rest",
    "alts": {
      "1":"Learned of Heart's Rest",
    },
    "descriptions": {
      "1": "City home of the Clamont family."
    }
  },

  "time": {
    "id": "time",
    "name": "Time",
    "value": "1",
    "descriptions": {
      "1": "Inexorably marches forward. When this reaches 8, the day is over."  
    }
  },

  "cover": {
    "id": "cover",
    "name": "Cover",
    "alts": {
      "1": "Broken",
      "2": "Watched",
      "4": "Suspicious",
      "5": "Safe",
    },
    "descriptions": {
      "1": "The surest shield of any thief is their cover."
    },
    "category": "",
    "value": 5,
  },
  
  "tools": {
    "id": "tools ",
    "name": "Thieves' Tools",
    "descriptions": {
      "1": "An assortment of lockpicks, ropes, pliers... anything you can fit under your coat, really."
    },
    "category": "Inventory",
    "value": 3,
  },

  "tcoins": {
    "id": "tcoins",
    "name": "Thieves' Coins",
    "descriptions": {
      "1": "The front is stamped with a stag's head. The back with a raven. Regular merchants won't take them."
    },
    "category": "Valuables",
    "value": 5,
  },

  "kcoins": {
    "id": "kcoins",
    "name": "King's Coins",
    "descriptions": {
      "1": "A few coins is hardly worth the bother."
    },
    "category": "Valuables",
    "value": 5,
  },

  "lpicking": {
    "id": "lpicking",
    "name": "Lockpicking",
    "category": "Skills",
    "descriptions": {
      "1": "Thieves who smash locks are considered quite gauche."
    }
  },

  "lifting": {
    "id": "lifting",
    "name": "Lifting",
    "category": "Skills",
    "descriptions": {
      "1": "Passing in the night, a small jostle, and you're gone."
    }
  },

  "manip": {
    "id": "manip",
    "name": "Manipulation",
    "category": "Skills",
    "descriptions": {
      "1": "Sometimes you can just ask your mark to hand their valuables over, and they will."
    }
  }

}

export { qualities};