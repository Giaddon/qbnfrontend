/** Faux data that serves as our backend for now. */

const qualities = {
  core: {
    id: "core",
    value: 1,
    name: "Core",
    block: "Mech",
    alt: [
      [1, "Zzaby-XS"],
      [2, "Zzaby-XR"],
      [3, "Zzaby-XL"]
    ],
    descriptions: [
      [2, "Not powerful, but works. Mostly."],
      [4, "Other mechs have been known to steal discrete glances at your core."]
    ],
  },
  weapons: {
    id: "weapons",
    value: 2,
    name: "Weapons",
    block: "Mech",
    alt: [
      [1, "Gatling Cannon"],
      [2, "Plasma Spitter"],
      [3, "Missle Launcher"]
    ],
    descriptions: [
      [1, "The old razzle-dazzle."],
      [2, "Cuts through armor easily, but smells terrible."],
      [3, "When you need to blow everything up."]
    ],
  },  
  location: {
    id: "location",
    name: "Location",
    value: 1,
    alt: [
      [1, "Mech Shop"],
      [2, "Mech Dance Club"],
      [3, "On a mission"],
    ],
    descriptions:[
      [1, "Buy everything you need to make your mech an effective killing machine that also smells good."],
      [2, "This is where mechs go to unwind, mingle, and have some fun."],
      [3, "Excitment. Action. This is why you became a mech."],
    ],
    block: "Location",
  },
  cash: {
    id: "cash",
    name: "Cash",
    value: 10,
    block: "Cash",
    description: "Can be exchanged for mech parts.",
  },
  missions: {
    id: "missions", 
    block: "Activities",
    name: "Missions",
    description: "How many unfulfilled missions you have." 
  },
  fun: {
    id: "fun", 
    block: "Feelings",
    name: "Fun",
    descriptions: [
      [1, "You're having a good time."],
      [2, "You're feeling the beat now."],
      [5, "You needed this."],
      [6, "This is the best night of your life!"],
      [10000, "That... was pretty great."],
    ]
  }
}

export { qualities };