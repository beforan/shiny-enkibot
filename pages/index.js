import { Container, Flex, Grid, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { getEnkibotJson } from "lib/enki-data";
import { Section } from "components/Tips";
import AppBar from "components/AppBar";

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

      <Grid
        templateRows="auto minmax(200px, 1fr)"
        templateColumns="300px 1fr"
        height="100vh"
      >
        <Flex gridColumn="span 2">
          <AppBar />
        </Flex>

        <Flex>Job Picker</Flex>

        <Flex overflow="auto" pt={4}>
          <Container maxW="120ch">
            <Stack>
              {Object.keys(enkiData).map((section, i) => {
                // skip the intro from the tips list
                // we'll hide it in a menu
                if (section === "Intro") return null;

                // TODO: filter sections? Anchor them?
                return (
                  <Section key={i} title={section} groups={enkiData[section]} />
                );
              })}
            </Stack>
          </Container>
        </Flex>
      </Grid>
    </>
  );
};

export default Home;
