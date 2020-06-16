import React, { useState, createContext, useContext, useEffect } from "react";
import characters from "config/characters";
import translations from "config/translations";

// storage
const storageKey = "shiny-enkibot-settings";
const isStorageSupported = typeof Storage !== "undefined";
const storage = {
  get: () =>
    isStorageSupported && JSON.parse(window.localStorage.getItem(storageKey)),
  set: (v) =>
    isStorageSupported &&
    window.localStorage.setItem(storageKey, JSON.stringify(v)),
};

// storage backed state
const useSettingsState = () => {
  const [settings, setSettings] = useState(defaults);
  useEffect(() => {
    const stored = storage.get();

    if (!stored) {
      setSettings(defaults);
      return;
    }

    if (!stored || stored === settings) return;
    setSettings(stored);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (settings) {
      storage.set(settings);
    }
  }, [settings]);

  return [settings, setSettings];
};

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
  const [settings, setSettings] = useSettingsState();

  const setTranslation = (t) => setSettings({ ...settings, translation: t });
  const setCharacter = (c) => setSettings({ ...settings, character: c });

  const value = { ...settings, setCharacter, setTranslation };

  return <SettingsContext.Provider value={value} children={children} />;
};
