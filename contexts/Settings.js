import { useState, createContext, useContext, useEffect } from "react";
import characters from "config/characters";
import * as locales from "config/locales";
import { useStorage } from "lib/local-storage";

// storage backed state
const storageKey = "shiny-enkibot-settings";
const useSettingsState = () => {
  const storage = useStorage(storageKey);
  const [settings, setSettings] = useState(defaults);
  useEffect(() => {
    const stored = storage.get();

    if (!stored) {
      setSettings(defaults);
      return;
    }

    if (!stored || stored === settings) return;
    setSettings(stored);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (settings) {
      storage.set(settings);
    }
  }, [settings]);

  return [settings, setSettings];
};

const defaults = {
  character: characters.Butz.id,
  locale: locales.RPGe,
};

const SettingsContext = createContext({
  ...defaults,
  setCharacter: (character) => {}, // eslint-disable-line
  setLocale: (locale) => {}, // eslint-disable-line
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useSettingsState();

  const setLocale = (locale) => setSettings({ ...settings, locale });
  const setCharacter = (character) => setSettings({ ...settings, character });

  const value = { ...settings, setCharacter, setLocale };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
