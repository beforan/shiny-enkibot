import React from "react";
import { useEnkidata } from "contexts/Enkidata";
import {
  Stack,
  Flex,
  Collapse,
  useDisclosure,
  Heading,
  useColorMode,
} from "@chakra-ui/core";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { current } from "immer";

const SectionHeading = ({ heading, isOpen, onToggle }) => (
  <Flex p={2} onClick={onToggle} cursor="pointer" align="center">
    <Flex as={isOpen ? FaChevronDown : FaChevronRight} mr={2} />
    <Heading size="md" fontWeight="medium" lineHeight="inherit">
      {heading}
    </Heading>
  </Flex>
);

const TipsGroup = ({ jobs, tips }) => (
  <Stack bg="gray.500" p={2} borderRadius={5}>
    <Flex>{jobs}</Flex>
    {tips.map((t, i) => (
      <Flex key={i}>{t}</Flex>
    ))}
  </Stack>
);

const Section = ({ heading, tips }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const bg = { light: "gray.300", dark: "gray.700" };

  // ok, we wanna group tips in contiguous blocks by job tags
  const groups = tips.reduce(({ currentJobs, groups }, { body, jobs }) => {
    jobs = jobs || [];
    groups = groups || [];

    let sameJobs = false;
    if (currentJobs && currentJobs.length === jobs.length) {
      if (jobs.length === 0) sameJobs = true;
      if (jobs.every((j) => currentJobs.includes(j))) sameJobs = true;
    }

    if (!sameJobs) {
      currentJobs = jobs;
      groups.push({
        jobs: jobs,
        tips: [body],
      });
    } else {
      groups[groups.length - 1].tips.push(body);
    }

    return { currentJobs, groups };
  }, {}).groups;

  return (
    <Flex direction="column" bg={bg[colorMode]} borderRadius={5}>
      <SectionHeading heading={heading} isOpen={isOpen} onToggle={onToggle} />
      <Collapse isOpen={isOpen}>
        <Stack shouldWrapChildren>
          {groups.map((g, i) => (
            <TipsGroup key={i} {...g} />
          ))}
        </Stack>
      </Collapse>
    </Flex>
  );
};

const Tips = () => {
  const { Intro, ...tips } = useEnkidata();

  return (
    <Flex width="100%" overflowY="scroll" justify="center">
      <Stack p={4} width={{ base: "100%", xl: "70%" }} shouldWrapChildren>
        {Object.keys(tips).map((k) => (
          <Section key={k} heading={k} tips={tips[k]} />
        ))}
      </Stack>
    </Flex>
  );
};

export default Tips;
