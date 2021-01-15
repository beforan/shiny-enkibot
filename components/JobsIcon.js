import { Flex, Grid, HStack, Icon, Image } from "@chakra-ui/react";
import { Fragment } from "react";
import { FaPlus } from "react-icons/fa";

const JobsIcon = ({ jobs }) => {
  return (
    <HStack>
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
  const character = "Butz";
  return (
    <Grid align="center" templateColumns="24px 1fr">
      <Image
        width="18px"
        height="24px"
        src={`/assets/jobs/${character}/${job}.png`}
      />
      <Flex width="100%" align="center" justify="center">
        {job}
      </Flex>
    </Grid>
  );
};

export default JobsIcon;
