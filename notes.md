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



  Qualities with "Change Points"
Some Qualities need to grow by "change points" and not just directly. The way StoryNexus did this was - qualities were either Additive (like the ones we've got here now) or Pyramid. With Pyramid-type qualities, you have a value that represents the number of "change points" you've accumulated, and then there's another value which is your actual "level" of the Quality - used when you want to check the math on things, and what's most commonly reported to the player.

The StoryNexus Formula said:
This formula gives the total cost to reach a given level in a Pyramid quality, where n is that level: (n²+n)/2.

In Excel this is (POWER(A1+1,2)-(A1+1))/2.

Actually, above 50 it's =((POWER(MIN(50,B3)+1,2)-(MIN(50,B3)+1))/2)+(MAX(0,B3-50)*50), because the most points needed to increase one level is 50.
The naive way might be to have a quality tied to another quality, but that adds a whole lot of data entry for what one would expect to be a really common function. I would just think Pyramid-type Qualities need to take two variables - one for the actual level, one for the change points, and have a formula govern their relationship. (To keep things uniform, Additive-type Qualities might as well also take two variables - but there, the formula for the relationship between change points and level is 1:1 instead of the more complicated Pyramid-type formula.)


When the player clicks an action:

1. Determine the type of action. Context / Modify / Challenge.
- Context
-- Find the new context.
-- Prepare the actions.
-- Set it as the active context.

- Modify
-- Go through each change and apply them.
-- Show the result.
-- Clear the context if remain not applied.

- Challenge.
-- Perform the challenge.
-- Apply the results.
-- Show the results.
-- Clear the context if remain not applied.

