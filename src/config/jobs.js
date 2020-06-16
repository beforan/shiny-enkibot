import { RPGe, Advance, Anthology } from "config/locales";
import { forLocale, localise } from "helpers/localisation";

class Job {
  constructor(id, name) {
    this.id = id;
    const n = typeof name === "string" ? localise(name) : name;
    this.name = (locale) => forLocale(n, locale);
  }
}

// TODO: other metadata? which crystal, etc.
export default {
  // Wind
  Knight: new Job("KGT", "Knight"),
  Monk: new Job("MNK", "Monk"),
  Thief: new Job("THF", "Thief"),
  BlackMage: new Job(
    "BLM",
    localise("Black Mage", {
      [RPGe]: "BlackMage",
      [Anthology]: "B. Mage",
    })
  ),
  WhiteMage: new Job(
    "WHM",
    localise("White Mage", {
      [RPGe]: "WhiteMage",
      [Anthology]: "W. Mage",
    })
  ),
  BlueMage: new Job("BLU", localise("BlueMage", { [Advance]: "Blue Mage" })),

  // Water
  Berserker: new Job("BER", localise("Berserker", { [RPGe]: "Berserkr" })),
  MysticKnight: new Job(
    "MYS",
    localise("Mystic Knight", {
      [RPGe]: "MysticKnt",
      [Anthology]: "Sorcerer",
    })
  ),
  TimeMage: new Job("TIM", localise("TimeMage", { [Advance]: "Time Mage" })),
  Summoner: new Job("SUM", "Summoner"),
  RedMage: new Job("RDM", "Red Mage"),
  // Mime

  // Fire
  Beastmaster: new Job(
    "BST",
    localise("Beastmaster", { [RPGe]: "Mediator", [Anthology]: "Trainer" })
  ),
  Geomancer: new Job("GEO", localise("Geomancr", { [Advance]: "Geomancer" })),
  Ninja: new Job("NIN", "Ninja"),
  Bard: new Job("BRD", "Bard"),
  Ranger: new Job("RAN", localise("Hunter", { [Advance]: "Ranger" })),

  // Earth
  Samurai: new Job("SAM", "Samurai"),
  Dragoon: new Job("DRG", localise("Dragoon", { [Anthology]: "Lancer" })),
  Dancer: new Job("DNC", "Dancer"),
  Chemist: new Job("CHM", "Chemist"),
};
