import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jobDefinitions } from "config/jobs";
import { SettingsProvider } from "contexts/Settings";
import { useStorage } from "lib/local-storage";

const defaults = {
  selectedJobs: {},
  toggleJobSelected: (job) => {}, // eslint-disable-line
  clearSelectedJobs: () => {},
  selectAllJobs: () => {},
};

const AppContext = createContext(defaults);

export const useAppContext = () => useContext(AppContext);

// Storage backed job selection
const storageKey = "shiny-enkibot-selectedjobs";
const useSelectedJobsState = () => {
  const storage = useStorage(storageKey);

  const [selectedJobs, setSelectedJobs] = useState({});
  useEffect(() => {
    const stored = storage.get();

    if (!stored) {
      setSelectedJobs({});
      return;
    }

    if (!stored || stored === selectedJobs) return;
    setSelectedJobs(stored);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (selectedJobs) {
      storage.set(selectedJobs);
    }
  }, [selectedJobs]);

  return [selectedJobs, setSelectedJobs];
};

export const AppProvider = ({ children }) => {
  const jobList = useMemo(() => jobDefinitions);
  const [selectedJobs, setSelectedJobs] = useSelectedJobsState();

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
