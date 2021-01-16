import { RPGe, Advance, Anthology } from "config/locales";
import { localise } from "lib/localisation";

/**
 * Job "constructor" to simplify writing the list
 */
const Job = (id, name) => ({
  id,
  name: typeof name === "string" ? localise(name) : name,
});

// TODO: other metadata? which crystal, etc.
/**
 * Master Job List
 */
const jobs = [
  // Wind
  Job("KGT", "Knight"),
  Job("MNK", "Monk"),
  Job("THF", "Thief"),
  Job(
    "BLM",
    localise("Black Mage", {
      [RPGe]: "BlackMage",
      [Anthology]: "B. Mage",
    })
  ),
  Job(
    "WHM",
    localise("White Mage", {
      [RPGe]: "WhiteMage",
      [Anthology]: "W. Mage",
    })
  ),
  Job("BLU", localise("BlueMage", { [Advance]: "Blue Mage" })),

  // Water
  Job("BER", localise("Berserker", { [RPGe]: "Berserkr" })),
  Job(
    "MYS",
    localise("Mystic Knight", {
      [RPGe]: "MysticKnt",
      [Anthology]: "Sorcerer",
    })
  ),
  Job("TIM", localise("TimeMage", { [Advance]: "Time Mage" })),
  Job("SUM", "Summoner"),
  Job("RDM", "Red Mage"),
  // Mime

  // Fire
  Job(
    "BST",
    localise("Beastmaster", { [RPGe]: "Mediator", [Anthology]: "Trainer" })
  ),
  Job("GEO", localise("Geomancr", { [Advance]: "Geomancer" })),
  Job("NIN", "Ninja"),
  Job("BRD", "Bard"),
  Job("RAN", localise("Hunter", { [Advance]: "Ranger" })),

  // Earth
  Job("SAM", "Samurai"),
  Job("DRG", localise("Dragoon", { [Anthology]: "Lancer" })),
  Job("DNC", "Dancer"),
  Job("CHM", "Chemist"),
];

// convert the master list to a useful dictionary for the app
const jobDefinitions = jobs.reduce(
  (dictionary, job) => ({
    ...dictionary,
    [job.id]: job,
  }),
  {}
);

export { jobDefinitions };
