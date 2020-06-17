import React from "react";
import { useEnkidata } from "contexts/Enkidata";
import {
  Stack,
  Flex,
  Collapse,
  useDisclosure,
  Heading,
  useColorMode,
  Image,
  Icon,
  Grid,
} from "@chakra-ui/core";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useSettings } from "contexts/Settings";
import joblist from "config/jobs";

const groupTips = (tips) =>
  // ok, we wanna group tips in contiguous blocks by job tags
  tips.reduce(({ currentJobs, groups = [] }, { body, jobs = [] }) => {
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

const SectionHeading = ({ heading, isOpen, onToggle }) => (
  <Flex p={2} onClick={onToggle} cursor="pointer" align="center">
    <Flex as={isOpen ? FaChevronDown : FaChevronRight} mr={2} />
    <Heading size="md" fontWeight="medium" lineHeight="inherit">
      {heading}
    </Heading>
  </Flex>
);

const GroupJobs = ({ jobs }) => {
  const { character, locale } = useSettings();

  const styles = {
    p: 2,
    bg: "gray.700",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5, 
  };

  // No jobs
  if (!jobs.length)
    return (
      <Flex align="center" {...styles}>
        <Icon size="32px" name="info"></Icon>
      </Flex>
    );

  return (
    <Stack width="100px" {...styles}>
      {jobs.length &&
        jobs.map((jobId) => {
          const job = Object.keys(joblist)
            .map((key) => ({ key, ...joblist[key] }))
            .find((job) => job.id === jobId);

          if (!job) return <Flex>{jobId}</Flex>; // TODO: parse combinations and negatives

          return (
            <Grid align="center" templateColumns="24px 1fr">
              <Image
                width="24px"
                height="32px"
                src={`/assets/jobs/${character}/${jobId}.png`}
              />
              <Flex width="100%" align="center" justify="center">
                {job.name(locale)}
              </Flex>
            </Grid>
          );
        })}
    </Stack>
  );
};

const TipsGroup = ({ jobs, tips }) => {
  // TODO job filtering

  return (
    <Flex>
      <GroupJobs jobs={jobs} />

      <Stack
        width="100%"
        p={2}
        bg="gray.600"
        borderTopRightRadius={5}
        borderBottomRightRadius={5}
      >
        {tips.map((t, i) => (
          <Flex key={i}>{t}</Flex>
        ))}
      </Stack>
    </Flex>
  );
};

const Section = ({ heading, tips }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();
  const bg = { light: "gray.300", dark: "gray.900" };

  const groups = groupTips(tips);

  return (
    <Flex direction="column" bg={bg[colorMode]} borderRadius={5}>
      <SectionHeading heading={heading} isOpen={isOpen} onToggle={onToggle} />
      <Collapse isOpen={isOpen}>
        <Stack p={2} shouldWrapChildren>
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
