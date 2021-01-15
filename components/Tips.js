import { Heading, Stack } from "@chakra-ui/react";
import JobsIcon from "./JobsIcon";

const Section = ({ title, groups }) => {
  // TODO: jobs filtering
  return (
    <>
      <Heading>{title}</Heading>
      <Stack>
        {groups.map((group, i) => (
          <TipsGroup {...group} key={i} />
        ))}
      </Stack>
    </>
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
