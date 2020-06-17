import React, { createContext, useContext, useState } from "react";
import produce from "immer";
import joblist from "config/jobs";

const JobsContext = createContext({
  jobs: [],
  toggleJob: (jobId) => {},
  clearJobs: () => {},
  allJobs: () => {},
});

export const useJobs = () => useContext(JobsContext);

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const toggleJob = (jobId) => {
    setJobs(
      produce((jobs) => {
        if (jobs.includes(jobId)) {
          jobs.splice(jobs.indexOf(jobId), 1);
        } else jobs.push(jobId);
      })
    );
  };

  const clearJobs = () => setJobs([]);
  const allJobs = () => setJobs(Object.keys(joblist));

  const value = { jobs, toggleJob, clearJobs, allJobs };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};
