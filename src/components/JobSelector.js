import React from "react";
import ToggleButton from "./ToggleButton";
import { useJobs } from "contexts/Jobs";
import joblist from "config/jobs";
import { Image, Flex, Stack, Grid } from "@chakra-ui/core";
import { useSettings } from "contexts/Settings";
import AppDrawer from "./AppDrawer";
import { GiBroadsword } from "react-icons/gi";

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
      checked={jobs.includes(job.key)}
      handleClick={() => toggleJob(job.key)}
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
    <Stack spacing={2} pt={2} width="100%">
      <Flex pl={2} pr={6}>
        <ToggleAllButton />
      </Flex>

      <Stack
        px={2}
        pb={2}
        spacing={2}
        shouldWrapChildren
        style={{ overflowY: "scroll" }}
      >
        {Object.keys(joblist).map((key) => (
          <JobToggleButton key={key} job={{key, ...joblist[key]}} />
        ))}
      </Stack>
    </Stack>
  );
};

export const JobDrawer = () => (
  <AppDrawer
    header="Filter Jobs"
    button={
      <Flex align="center">
        <Flex as={GiBroadsword} mr={2} />
        Jobs
      </Flex>
    }
    placement="left"
    scrollBehavior="inline"
  >
      <JobSelector />
  </AppDrawer>
);

export default JobSelector;
