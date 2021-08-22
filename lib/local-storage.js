export const isStorageSupported = typeof Storage !== "undefined";

export const useStorage = (storageKey = "shiny-enkibot") => ({
  get: () =>
    isStorageSupported && JSON.parse(window.localStorage.getItem(storageKey)),
  set: (v) =>
    isStorageSupported &&
    window.localStorage.setItem(storageKey, JSON.stringify(v)),
});
