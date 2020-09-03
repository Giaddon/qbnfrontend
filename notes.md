# Data

## Qualities 
Qualities are attributes ascribed to the player character.

They are the engine of the entire system: qualities determine what the player can do, and every meaningful action changes a quality.

At heart, a quality is an integer. Occasionally this will be displayed to the player as text, but the meaningful value is an integer. 

quality: value

However, there are other meaningful data to store.

quality: {
    id: "quality", // Lowercase string. A unique name for the quality.
    value: 1, // Integer. The current value of the quality, used for all comparisons. Shown to the player.
    name: "Quality", // String. The name of the quality displayed to the player. 
    block: "Block", // String. A grouping for the quality, for organization.  
    alt: [
      [1, "Quality"],
      [2, "Different quality."]
     ] // Array of arrays with integer:string pairs. The value displayed to the user is the one the integer value is equal to or the first one lower than.
    description: "Description." // String. Displayed alongside the quality name and value for additional context.  
    descriptions: [
      [1, "Description."],
      [10, "Different description."]  
    ], // Array of arrays with integer:string pairs. The displayed description is the one the integer value is equal to or the first one lower than. Displayed alongside the quality name and value for additional context.
    invisible: true, // Boolean. If true, the quality is still tracked by the game but not displayed to the player.  
    tooltip: "Tooltip", // String. Text that is displayed when the player hovers their mouse over the quality. Tooltips always display name and value.


  ## Storylets
  Storylets are events, actions, dreams... they are everything the player can do. The available storylets are derived from the player's qualities. 

   storylet: {
    id: "storylet", // unique lowercase string. 
    title: "Storylet", // String. Displayed to the player. 
    description: "Description", // String. Displayed to the player to provide context.
    reqs: [ //An array of objects. The quality requierments for selecting this storylet. 
      {
        id: "quality", // String. The id of the quality being checked.
        range: { // Object. Used if the quality value must be between a specific range.
          min: 1, // Integer. The smallest passing value.
          max: 10, // Integer. The largest passing value.
        },
        comparison: { //Object. Used if you want to target a specific value or greater than or less than comparisons.
          value: 1, // Integer. The target value.
          type: "equal", // String. Can be "equal", "smaller", or "bigger". Describes the relationship between the value and quality value. If "equal" the two values must be the same. if "smaller", the quality value must be less than or equal to the value. If "bigger" the quality value must be greater than or equal to the value.
        }
      } 
    ],
    results: { // Object. What happens when storylet is selected.
        domain: "domain", // String. The domain id to load.
        qualities: [ // Array of objects. Each object describes how a quality is changed.
          {
            id: "id", // String. Id of quality.
            value: 1, // Integer. Value to change by.
            type: "set" // String. How to change the quality. "set" sets quality to that value exactly. "adjust" adds the value to the current value (starting from 0, if the player does not yet have the value).
          },
        ],
      },
  }, 