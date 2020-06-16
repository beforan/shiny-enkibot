import React from "react";
import ToggleButton from "./ToggleButton";
import { useJobs } from "contexts/Jobs";
import joblist from "config/jobs";
import { Image, Flex, Stack, Grid } from "@chakra-ui/core";
import { useSettings } from "contexts/Settings";

const SelectorButton = ({ checked, handleClick, children }) => {
  return (
    <ToggleButton
      height="40px"
      width="100%"
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
  const { character, locale } = useSettings();

  return (
    <SelectorButton
      checked={jobs.includes(job.id)}
      handleClick={() => toggleJob(job.id)}
    >
      <Grid width="100%" templateColumns="40px 1fr" align="center">
        <Image
          width="24px"
          height="32px"
          src={`/assets/jobs/${character}/${job.id}.png`}
          alt={job.id}
        />
        <Flex width="100%" align="center" justify="center">
          {job.name(locale)}
        </Flex>
      </Grid>
    </SelectorButton>
  );
};

const JobSelector = () => {
  return (
    <Stack spacing={2} width="300px" height="500px">
      <Flex pl={2} pr={6}>
        <ToggleAllButton />
      </Flex>
      
      <Stack px={2} spacing={2} shouldWrapChildren style={{ overflow: "auto" }}>
        {Object.keys(joblist).map((k) => (
          <JobToggleButton key={k} job={joblist[k]} />
        ))}
      </Stack>
    </Stack>
  );
};

export default JobSelector;
