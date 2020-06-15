import { createContext, useContext } from "react";

const EnkidataContext = createContext({});

export const useEnkidata = () => useContext(EnkidataContext);

export const EnkidataProvider = EnkidataContext.Provider;
