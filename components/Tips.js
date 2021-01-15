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
import {
  buildColorModeObjects,
  useColorModeObject,
} from "lib/colorModeObjects";
import JobsIcon from "./JobsIcon";

const styles = {
  section: buildColorModeObjects(
    { borderRadius: 5, bg: "gray.200" },
    { bg: "gray.900" }
  ),
};

const SectionHeading = ({ children, onToggle, isOpen }) => (
  <Flex p={2} onClick={onToggle} cursor="pointer" align="center">
    <Icon mr={2} as={isOpen ? FaChevronDown : FaChevronRight} />
    <Heading size="md">{children}</Heading>
  </Flex>
);

const Section = ({ title, groups }) => {
  // TODO: jobs filtering

  const { isOpen, onToggle } = useDisclosure();

  const styleProps = useColorModeObject(styles.section);

  return (
    <Stack layerStyle="ff7" spacing={0} boxShadow="">
      <SectionHeading onToggle={onToggle} isOpen={isOpen}>
        {title}
      </SectionHeading>

      <Collapse in={isOpen} animateOpacity>
        <Stack p={2}>
          {groups.map((group, i) => (
            <TipsGroup {...group} key={i} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const TipsGroup = ({ jobs, tips }) => {
  return (
    <div>
      <GroupJobs jobs={jobs} />

      <Stack w="100%" p={2} pt={8} boxShadow="lg" layerStyle="ff7">
        {tips.map((t, i) => (
          <Flex key={i}>{t}</Flex>
        ))}
      </Stack>
    </div>
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
