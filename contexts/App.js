import { createContext, useContext, useMemo, useState } from "react";
import { jobDefinitions } from "config/jobs";
import { SettingsProvider } from "contexts/Settings";

const defaults = {
  selectedJobs: {},
  toggleJobSelected: (job) => {}, // eslint-disable-line
  clearSelectedJobs: () => {},
  selectAllJobs: () => {},
};

const AppContext = createContext(defaults);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
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
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </SettingsProvider>
  );
};
