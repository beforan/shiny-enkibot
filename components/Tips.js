import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import {
  Collapse,
  Flex,
  Heading,
  Icon,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { buildColorModeObjects } from "lib/colorModeObjects";
import JobsIcon from "./JobsIcon";

const styles = {
  section: buildColorModeObjects(
    { padding: 2, borderRadius: 5, bg: "gray.300" },
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

  const styleProps = useColorModeValue(
    styles.section.light,
    styles.section.dark
  );

  return (
    <Stack {...styleProps} spacing={0}>
      <SectionHeading onToggle={onToggle} isOpen={isOpen}>
        {title}
      </SectionHeading>

      <Collapse in={isOpen} animateOpacity>
        <Stack mt={2}>
          {groups.map((group, i) => (
            <TipsGroup {...group} key={i} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const TipsGroup = ({ jobs, tips }) => (
  <>
    {jobs && (
      <Heading size="sm">
        {jobs.map((combo, i) => (
          <JobsIcon key={i} jobs={combo} />
        ))}
      </Heading>
    )}
    {tips.map((tip, i) => (
      <div key={i}>{tip}</div>
    ))}
  </>
);

export { Section };
