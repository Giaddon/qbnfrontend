/** Faux data that serves as our backend for now. */

const qualities = {
  glory: {
    id: "glory",
    name: "Glory",
    block: "Vices",
    description: "Glory made manifest.",
    visible: true,
    tooltip: "The aura that shines from the righteous.",
    value: 1,
  },
  lugubriousness: {
    id: "lugubriousness",
    name: "Lugubriousness",
    block: "Vices",
    description: "Misery loves company.",
    visible: true,
    tooltip: "But it's an unrequited love.",
    value: 5,
  },
  restraint: {
    id: "restraint",
    name: "Restraint",
    description: "The ascetic is never deprived.",
    visible: true,
    tooltip: "The greatest expression of control is over oneself.",
    block: "Virtues",
  },
  spire: {
    id: "spire",
    name: "The Angel's Spire",
    description: "Near enough to touch, now.",
    visible: true,
    tooltip: "You've never heard of anyone who came back from the spire. It's probably fine.",
    value: "Top of the spire",
    block: "Location",
  },
}

export { qualities };