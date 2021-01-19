import { FaChevronDown, FaChevronRight, FaInfoCircle } from "react-icons/fa";
import {
  Box,
  Collapse,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import JobsIcon from "./JobsIcon";
import { useAppContext } from "contexts/App";
import TipsMarkdown from "./TipsMarkdown";

const SectionHeading = ({ children, onToggle, isOpen }) => (
  <Flex p={2} onClick={onToggle} cursor="pointer" align="center">
    <Icon mr={2} as={isOpen ? FaChevronDown : FaChevronRight} />
    <Heading size="md">{children}</Heading>
  </Flex>
);

const Section = ({ title, groups }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack layerStyle="ff7" spacing={0} boxShadow="">
      <SectionHeading onToggle={onToggle} isOpen={isOpen}>
        {title}
      </SectionHeading>

      <Collapse in={isOpen} animateOpacity>
        {isOpen && (
          <Stack p={2}>
            {groups.map((group, i) => (
              <TipsGroup {...group} key={i} />
            ))}
          </Stack>
        )}
      </Collapse>
    </Stack>
  );
};

const shouldDisplayGroup = (jobs, selectedJobs) => {
  // no jobs means info, which we should always display :)
  if (!jobs) return true;

  // here's where we handle the AND/OR criteria for job filtering
  // first array is OR so we can early exit on any match
  for (const combo of jobs) {
    // second array is AND so we use `every()` and check if selected
    if (combo.every((job) => selectedJobs[job])) return true;
  }
};

const TipsGroup = ({ jobs, tips }) => {
  const { selectedJobs } = useAppContext();
  return (
    <Box hidden={!shouldDisplayGroup(jobs, selectedJobs)}>
      <GroupJobs jobs={jobs} />

      <Stack w="100%" p={2} pt={8} boxShadow="lg" layerStyle="ff7">
        {tips.map((t, i) => (
          <TipsMarkdown key={i}>{t}</TipsMarkdown>
        ))}
      </Stack>
    </Box>
  );
};

const GroupJobs = ({ jobs }) => {
  const boxStyles = {
    display: "inline",
    lineHeight: 0,
    position: "relative",
    top: 6,
    p: 2,
    boxShadow: "md",
  };

  return (
    <HStack w="100%" ml={3} mt={-6}>
      {jobs &&
        jobs.map((combo, i) => (
          <Box key={i} {...boxStyles} layerStyle="ff7">
            <JobsIcon jobs={combo} />
          </Box>
        ))}
      {!jobs && (
        <Box {...boxStyles} layerStyle="ff7">
          <Icon boxSize="20px" as={FaInfoCircle} />
        </Box>
      )}
    </HStack>
  );
};

export { Section };
