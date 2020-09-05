/** Faux data that serves as our backend for now. */

const qualities = {
  domain: {
    id: "domain",
    value: 1,
    invisible: true,
  },
  
  forming: {
    id: "forming",
    value: 1,
    alt: [
      [2, "Unformed"],
      [3, "Emerging"],
      [4, ""],
    ],
    name: "Something forming",
    block: "Potential",
    descriptions: [
      [1, "Is there anything here at all?"],
      [2, "A smudge of something in an ocean of black."],
      [3, "You're practically real, now."],
      [4, ""],
      [5, ""],
    ],
  },

  body: {
    id: "body",
    name: "Body",
    block: "Potential",
    alt: [
      [1, "You have a body"],
    ],
    description: "Useful for picking things up, or petting animals."
  },
  
  mind: {
    id: "mind",
    name: "Mind",
    block: "Potential",
    alt: [
      [1, "You have a mind"],
    ],
    description: "Some think this a prerequisite for existence. Observation proves otherwise."
  },

  brainpower: {
    id: "brainpower",
    name: "Brain",
    block: "Attributes",
    descriptions: [
      [1, "Limited"],
      [2, "Normal"],
      [3, "Genius"],
    ],
  },

  strength: {
    id: "strength",
    name: "Strength",
    block: "Attributes",
    description: "Your physical might.",
    pyramid: true,
    change: 0,
  },

  tentacles: {
    id: "tentacles",
    name: "Tentacles",
    block: "Attributes",
    description: "Well, it's the number of tentacles you have. Pretty straightforward.",
  },

}

export { qualities };