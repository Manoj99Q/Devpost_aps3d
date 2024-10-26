// questData.js
const questData = {
  bean_energon: {
      character: {
        name: "Bumblebee",
        avatar: "public/images/characters/bumblebee.jpg", // Add your avatar image
      },
      dialogues: {
        initial: {
          text: "Hey there! I've detected some strange energy readings near the Bean. Want to help me investigate?",
          choices: [
            {
              text: "Sure, I'll help!",
              next: "quest_start"
            },
            {
              text: "Tell me more first",
              next: "more_info"
            }
          ]
        },
        more_info: {
          text: "I believe there might be an Energon cube hidden somewhere in the structure. It could be dangerous if it falls into the wrong hands!",
          choices: [
            {
              text: "Let's find it",
              next: "quest_start"
            },
            {
              text: "Maybe later",
              next: "goodbye"
            }
          ]
        },
        quest_start: {
          text: "Great! First, we need to scan the Bean's surface. Click on the structure when you're ready.",
          choices: [
            {
              text: "Got it",
              next: null,
              action: "startBumbleBeeQuest"
            }
          ]
        },
        goodbye: {
          text: "Alright, come back when you're ready to help! I'll keep watching the area.",
          choices: [
            {
              text: "Goodbye",
              next: null
            }
          ]
        }
      },
      quest: {
        id: "bean_energon",
        title: "The Hidden Energon"
      }
    },
    willis: {
      character: {
        name: "Iron Man",
        avatar: "https://picsum.photos/300",
        mood: "concerned"
      },
      dialogues: {
        initial: {
          text: "FRIDAY detected unusual activity at the top of Willis Tower. I could use some backup checking it out.",
          choices: [
            {
              text: "I'm in",
              next: "quest_start"
            },
            {
              text: "What kind of activity?",
              next: "more_info"
            }
          ]
        },
        // Add more dialogue states...
      },
      quest: {
        id: "willis_defense",
        title: "Skyline Defense",
        steps: [
          {
            id: "reach_top",
            text: "Reach the tower's observation deck",
            isComplete: false
          },
          // Add more steps...
        ]
      }
    },
    navyPier: {
      character: {
        name: "Phoenix",
        avatar: "https://picsum.photos/300",
        mood: "alert"
      },
      dialogues: {
        initial: {
          text: "I sense a disturbance in the energy patterns around Navy Pier. We should investigate before it grows stronger.",
          choices: [
            {
              text: "Let's check it out",
              next: "quest_start"
            },
            {
              text: "What kind of disturbance?",
              next: "more_info"
            }
          ]
        },
        // Add more dialogue states...
      },
      quest: {
        id: "pier_energy",
        title: "Pier Mysteries",
        steps: [
          {
            id: "investigate_wheel",
            text: "Investigate the Centennial Wheel",
            isComplete: false
          },
          // Add more steps...
        ]
      }
    },

    lostAndFoundQuest :{
      character: {
        name: "Mr. O'Hare",
        avatar: "public/images/characters/mr_ohare.jpg", // Add your avatar image
      },
      dialogues: {
        initial: {
          text: "Hello there! I'm Mr. O'Hare, and I've misplaced some of my favorite items around Chicago. Could you help me find them?",
          choices: [
            {
              text: "Of course, I'd love to help!",
              next: "quest_start"
            },
            {
              text: "What exactly did you lose?",
              next: "more_info"
            }
          ]
        },
        more_info: {
          text: "Well, I've lost a few precious things—my old pocket watch, a sketchbook, my favorite Cubs cap, a recipe book, and even my vintage trumpet! Each one is tied to a special place in this wonderful city.",
          choices: [
            {
              text: "Let’s get started!",
              next: "quest_start"
            },
            {
              text: "Maybe another time.",
              next: "goodbye"
            }
          ]
        },
        quest_start: {
          text: "Great! Let's start with my pocket watch. I think I lost it near The Bean. Click on the marker when you're ready to investigate!",
          choices: [
            {
              text: "Got it!",
              next: null,
              action: "startLostAndFoundQuest"
            }
          ]
        },
        goodbye: {
          text: "Alright, I understand. Come back if you change your mind—I’ll be right here!",
          choices: [
            {
              text: "Goodbye",
              next: null
            }
          ]
        }
      },
      quest: {
        id: "lost_and_found",
        title: "Mr. O'Hare's Lost Treasures"
      }
    }
    
  };
  
  export default questData;