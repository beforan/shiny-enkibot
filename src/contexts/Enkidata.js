import React, { createContext, useContext } from "react";
import data from "../built/enki.json";

const EnkidataContext = createContext({});

export const useEnkidata = () => useContext(EnkidataContext);

export const EnkidataProvider = ({ children }) => (
  <EnkidataContext.Provider value={data} children={children} />
);
