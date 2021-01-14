import { Box, Button, Code, Stack } from "@chakra-ui/react";
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
  const [showData, setShowData] = useState(true);
  return (
    <>
      <HeadTag />

      <Stack>
        <Box>Hello World!</Box>

        <Button onClick={() => setShowData(!showData)}>
          {showData ? "Hide" : "Show"} Data
        </Button>
        {showData && <pre>{JSON.stringify(enkiData, null, 2)}</pre>}
      </Stack>
    </>
  );
};

export default Home;
