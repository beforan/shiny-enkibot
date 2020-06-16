import React, { useState, createContext, useContext, useEffect } from "react";
import characters from "config/characters";
import translations from "config/translations";
import produce from "immer";

const defaults = {
  character: characters.Butz.id,
  translation: translations.RPGe,
};

const SettingsContext = createContext({
  ...defaults,
  setCharacter: (character) => {},
  setTranslation: (translation) => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  // TODO: save settings in storage a la ColorMode?
  const [settings, setSettings] = useState(defaults);

  const setTranslation = (t) => setSettings({ ...settings, translation: t });
  const setCharacter = (c) => setSettings({ ...settings, character: c });

  const value = { ...settings, setCharacter, setTranslation };

  return <SettingsContext.Provider value={value} children={children} />;
};
