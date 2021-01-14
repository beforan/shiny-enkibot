import { RPGe, Anthology } from "config/locales";
import { forLocale, localise } from "lib/localisation";

class Character {
  constructor(id, nameLocales) {
    this.id = id;
    this.name = (locale) => forLocale(localise(id, nameLocales), locale);
  }
}

export default {
  Butz: new Character("Butz", localise("Bartz", { [RPGe]: "Butz" })),
  Lenna: new Character("Lenna", { [Anthology]: "Reina" }),
  Galuf: new Character("Galuf"),
  Faris: new Character("Faris"),
  Krile: new Character("Krile", { [RPGe]: "Cara" }),
};
