import { Button, SimpleGrid, Stack } from "@chakra-ui/react";
import { jobDefinitions } from "config/jobs";
import { useAppContext } from "pages/_app";
import { useMemo } from "react";
import JobsIcon from "./JobsIcon";

const JobsSelector = () => {
  const {
    selectedJobs,
    toggleJobSelected,
    selectAllJobs,
    clearSelectedJobs,
  } = useAppContext();

  const anyJobs = Object.keys(selectedJobs).some((job) => selectedJobs[job]);
  const jobList = useMemo(() => jobDefinitions);

  return (
    <Stack p={2} spacing={0} w="100%">
      <Button
        minHeight="2.5em"
        colorScheme="cyan"
        variant="outline"
        onClick={anyJobs ? clearSelectedJobs : selectAllJobs}
      >
        {anyJobs ? "Clear" : "Select"} All
      </Button>
      <SimpleGrid py={2} columns={2} spacing={2} autoRows="min-content">
        {Object.keys(jobList).map((jobId) => (
          <Button
            key={jobId}
            onClick={() => toggleJobSelected(jobId)}
            colorScheme={selectedJobs[jobId] ? "blue" : "red"}
          >
            <JobsIcon jobs={[jobId]} />
          </Button>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default JobsSelector;
