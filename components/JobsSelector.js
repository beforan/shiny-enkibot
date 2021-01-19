import { Button, Flex, Icon, Stack } from "@chakra-ui/react";
import { jobDefinitions } from "config/jobs";
import { useAppContext } from "pages/_app";
import { useMemo } from "react";
import { FaCheck, FaCheckSquare, FaTimes, FaTimesCircle } from "react-icons/fa";
import { GiBroadsword } from "react-icons/gi";
import AppDrawer from "./AppDrawer";
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
    <Stack w="100%" spacing={0}>
      <Button
        m={4}
        minHeight="2.5em"
        colorScheme="blue"
        variant={anyJobs ? "solid" : "outline"}
        borderWidth={1}
        onClick={anyJobs ? clearSelectedJobs : selectAllJobs}
        leftIcon={anyJobs ? <FaTimesCircle /> : <FaCheckSquare />}
      >
        {anyJobs ? "Clear" : "Select"} All
      </Button>
      <Stack overflow="auto" p={4} pt={0}>
        {Object.keys(jobList).map((jobId) => {
          const isSelected = selectedJobs[jobId];
          return (
            <Button
              boxShadow="2px 2px black"
              minHeight="2.5em"
              key={jobId}
              onClick={() => toggleJobSelected(jobId)}
              colorScheme={isSelected ? "green" : "red"}
              variant={"solid"}
              leftIcon={
                isSelected ? (
                  <Icon color="green.500" as={FaCheck} />
                ) : (
                  <Icon color="red.500" as={FaTimes} />
                )
              }
            >
              <JobsIcon jobs={[jobId]} />
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
};

export const JobsDrawer = () => (
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
    <JobsSelector />
  </AppDrawer>
);

export default JobsSelector;
