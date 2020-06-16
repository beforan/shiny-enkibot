import React, { useState, createContext, useContext } from "react";
import characters from "config/characters";
import translations from "config/translations";
import produce from "immer";

const defaults = {
  character: characters.Butz.id,
  translation: translations.RPGe,
};

const SettingsContext = createContext(defaults);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = () => {
  // TODO: save settings in storage a la ColorMode?

  const [settings, setSettings] = useState(defaults);

  const setTranslation = (t) =>
    setSettings(
      produce(({ translation }) => {
        translation = t;
      })
    );

  const setCharacter = (c) =>
    setSettings(
      produce(({ character }) => {
        character = c;
      })
    );

  const value = { settings, setCharacter, setTranslation };

  return <SettingsContext.Provider value={value} />;
};
