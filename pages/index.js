import { Stack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { getEnkibotJson } from "lib/enki-data";
import { Section } from "components/Tips";

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
  return (
    <>
      <HeadTag />

      <Stack>

        {/* <Button onClick={() => setShowData(!showData)}>
          {showData ? "Hide" : "Show"} Data
        </Button>
        {showData && <pre>{JSON.stringify(enkiData, null, 2)}</pre>} */}

        {Object.keys(enkiData).map((section) => (
          // TODO: filter sections? Anchor them?
          <Section title={section} groups={enkiData[section]} />
        ))}
      </Stack>
    </>
  );
};

export default Home;
