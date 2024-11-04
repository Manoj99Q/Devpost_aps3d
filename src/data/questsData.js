import { useMarkers } from "../contexts/MarkerContext";

const questData = {


  lostAndFoundQuest: {
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
            next: "quest_start",
          },
          {
            text: "What exactly did you lose?",
            next: "more_info",
          },
        ],
      },
      more_info: {
        text: "Well, I've lost a few precious things—my old pocket watch, a sketchbook, my favorite Cubs cap, a recipe book, and even my vintage trumpet! Each one is tied to a special place in this wonderful city.",
        choices: [
          {
            text: "Let’s get started!",
            next: "quest_start",
          },
          {
            text: "Maybe another time.",
            next: "goodbye",
          },
        ],
      },
      quest_start: {
        text: "Great! All the items are marked on the map. Click on any marker when you're ready to investigate!",
        choices: [
          {
            text: "Got it!",
            next: null,
            action: "startlostAndFoundQuest",
          },
        ],
      },
      goodbye: {
        text: "Alright, I understand. Come back if you change your mind—I’ll be right here!",
        choices: [
          {
            text: "Goodbye",
            next: null,
          },
        ],
      },
    },
    quest: {
      id: "lost_and_found",
      title: "Mr. O'Hare's Lost Treasures",
    },
  },
  optimusPrimeQuest: {
    character: {
      name: "Optimus Prime",
      avatar: "public/images/characters/optimus_prime.jpeg", // Add your avatar image
    },
    dialogues: {
      initial: {
        text: "Greetings, human. I am Optimus Prime. The Decepticons have placed four energy pillars on the Jewelers Building. We must destroy them before they cause harm. Will you help me?",
        choices: [
          {
            text: "Yes, Optimus. Let's do this!",
            next: "quest_start",
          },
          {
            text: "Tell me more about the pillars.",
            next: "more_info",
          },
        ],
      },
      more_info: {
        text: "These energy pillars are amplifying a signal that could destroy the city's communications. They are located at the four corners of the Jewelers Building's rooftop. We must act quickly.",
        choices: [
          {
            text: "I'm ready. Let's destroy them!",
            next: "quest_start",
          },
          {
            text: "Maybe later, Optimus.",
            next: "goodbye",
          },
        ],
      },
      quest_start: {
        text: "Good. I've marked the locations of the pillars on the map. Click on each marker to destroy them and save the city!",
        choices: [
          {
            text: "Understood!",
            next: null,
            action: "startPrimeQuest",
          },
        ],
      },
      goodbye: {
        text: "I understand. Return when you are ready. The city depends on us.",
        choices: [
          {
            text: "Goodbye, Optimus.",
            next: null,
          },
        ],
      },
    },
    quest: {
      id: "optimus_prime_quest",
      title: "Optimus Prime's Call to Action",
    },
  },
};

export default questData;
