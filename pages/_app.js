import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "theme/theme";

import { createContext, useContext, useMemo, useState } from "react";
import { jobDefinitions } from "config/jobs";
import { SettingsProvider } from "contexts/Settings";

const defaults = {
  selectedJobs: {},
  toggleJobSelected: (job) => {},
  clearSelectedJobs: () => {},
  selectAllJobs: () => {},
};

const AppContext = createContext(defaults);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const jobList = useMemo(() => jobDefinitions);
  const [selectedJobs, setSelectedJobs] = useState({});

  const toggleJobSelected = (job) =>
    setSelectedJobs((old) => ({ ...old, [job]: !old[job] }));

  const selectAllJobs = () =>
    Object.keys(jobList).forEach((job) => toggleJobSelected(job));
  const clearSelectedJobs = () => setSelectedJobs({});

  const value = {
    selectedJobs,
    toggleJobSelected,
    clearSelectedJobs,
    selectAllJobs,
  };

  return (
    <SettingsProvider>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>;
    </SettingsProvider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
