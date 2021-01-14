import { Box, Button, Code, Heading, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { getEnkibotJson } from "../lib/enki-data";

export const getStaticProps = async () => {
  const enkiData = JSON.parse(JSON.stringify(await getEnkibotJson()));

  return {
    props: { enkiData },
  };
};

const HeadTag = () => (
  <Head>
    <title>Shiny Enkibot</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Home = ({ enkiData }) => {
  const [showData, setShowData] = useState(false);
  return (
    <>
      <HeadTag />

      <Stack>
        <Box>Hello World!</Box>

        <Button onClick={() => setShowData(!showData)}>
          {showData ? "Hide" : "Show"} Data
        </Button>
        {showData && <pre>{JSON.stringify(enkiData, null, 2)}</pre>}

        {Object.keys(enkiData).map((section) => (
          // TODO: filter sections? Anchor them?
          <Section title={section} groups={enkiData[section]} />
        ))}
      </Stack>
    </>
  );
};

const Section = ({ title, groups }) => {
  // TODO: jobs filtering
  return (
    <>
      <Heading>{title}</Heading>
      {groups.map((group) => (
        <TipsGroup {...group} />
      ))}
    </>
  );
};

const TipsGroup = ({ jobs, tips }) => (
  <>
    {jobs && (
      <Heading size="sm">
        {jobs.map((combo) => (
          <JobsIcon jobs={combo} />
        ))}
      </Heading>
    )}
    {tips.map((tip) => (
      <div>{tip}</div>
    ))}
  </>
);

const JobsIcon = ({ jobs }) => <div>{jobs.join("+")}</div>;

export default Home;
