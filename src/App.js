import React from "react";
import { EnkidataProvider } from "./contexts/Enkidata";
import Info from "./components/Info";
import { JobsProvider } from "./contexts/Jobs";
import JobSelector from "components/JobSelector";
import { SettingsProvider } from "contexts/Settings";
import SettingsMenu from "components/SettingsMenu";

const AppContextProvider = ({ children }) => (
  <SettingsProvider>
    <JobsProvider>
      <EnkidataProvider>{children}</EnkidataProvider>
    </JobsProvider>
  </SettingsProvider>
);

const App = () => {
  return (
    <AppContextProvider>
      <SettingsMenu />
      {/* <Info /> */}
      <JobSelector />
    </AppContextProvider>
  );
};

export default App;
