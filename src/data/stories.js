/** Faux data that serves as our backend for now. */

const stories = {
  earningGlory: {
    id: "earningGlory",
    name: "Earning Glory",
    description: "You want glory, don't you?",
    reqs: {
      glory:0,
    },
    content: {
      text: "You reach to grasp glory from the luminious glow of the universe itself!",
    },
    choices: [
      {
        text: "Nice.",
        results: {
          glory: 1
        },
      },
    ]
  },
  earningGlory2: {
    id: "earningGlory2",
    name: "Earning Even More Glory",
    description: "You're a greedy one, aren't you?",
    reqs: {
      glory:1,
    },
    content: {
      text: "Unable to resist, you reach out again, ripping more glory from creation and absorbing it into yourself.",
    },
    choices: [
      {
        text: "Nom nom nom.",
        results: {
          glory: 9998,
        },
      },
    ]
  },
  neverSeeThis: {
    id: "neverSeeThis",
    name: "You shouldn't see me.",
    description: "I'm invisible!",
    reqs: {
      sauce: 10,
    },
    content: {
      text: "Something's gone wrong.",
    },
    choices: [
      {
        text: "Oh no!.",
        results: {
          glory: 1
        },
      },
    ]
  },
}

export { stories };