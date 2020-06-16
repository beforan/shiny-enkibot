import React from "react";
import ToggleButton from "./ToggleButton";
import { useJobs } from "contexts/Jobs";
import joblist from "config/jobs";
import characters from "config/characters";
import tr from "config/translations";
import { Box, Image, Flex, Collapse } from "@chakra-ui/core";

const SelectorButton = ({ checked, handleClick, children }) => {
  return (
    <ToggleButton
      height="80px"
      width="50px"
      variantColor="blue"
      onClick={handleClick}
      checked={checked}
      children={children}
    />
  );
};

const ToggleAllButton = () => {
  const { jobs, clearJobs, allJobs } = useJobs();

  const handleToggleAll = () => {
    if (jobs.length > 0) clearJobs();
    else allJobs();
  };

  return (
    <SelectorButton checked={!!jobs.length} handleClick={handleToggleAll}>
      {!!jobs.length ? "Clear" : "All"}
    </SelectorButton>
  );
};

const JobToggleButton = ({ job }) => {
  const { jobs, toggleJob } = useJobs();

  return (
    <SelectorButton
      checked={jobs.includes(job.id)}
      handleClick={() => toggleJob(job.id)}
    >
      <Flex direction="column" align="center">
        <Image
          src={`/assets/jobs/${characters.Butz.id}/${job.id}.png`}
          alt={job}
        />
        {job.id}
      </Flex>
    </SelectorButton>
  );
};

const JobSelector = () => {
  return (
    <Flex justify="space-evenly" wrap="wrap">
      <ToggleAllButton />
      {Object.keys(joblist).map((k) => (
        <JobToggleButton key={k} job={joblist[k]} />
      ))}
    </Flex>
  );
};

export default JobSelector;
