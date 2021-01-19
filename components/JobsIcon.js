import { Box, Flex, Grid, HStack, Icon, Image } from "@chakra-ui/react";
import { jobDefinitions } from "config/jobs";
import { useSettings } from "contexts/Settings";
import { forLocale } from "lib/localisation";
import { Fragment } from "react";
import { FaPlus } from "react-icons/fa";

const JobsIcon = ({ jobs }) => {
  return (
    <HStack w="100%">
      {jobs.map((job, i) => (
        <Fragment key={i}>
          <JobIcon job={job} />
          {i < jobs.length - 1 && <Icon as={FaPlus} />}
        </Fragment>
      ))}
    </HStack>
  );
};

const JobIcon = ({ job }) => {
  const { locale, character } = useSettings();
  return (
    <Grid align="center" templateColumns="20px 1fr" columnGap={2}>
      <Image
        src={`/assets/jobs/${character}/${job}.png`}
        fallback={<Box minW="20px" minH="28.75px" />}
      />
      <Flex width="100%" align="center" justify="center">
        {forLocale(jobDefinitions[job].name, locale)}
      </Flex>
    </Grid>
  );
};

export default JobsIcon;
