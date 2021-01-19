import { Container, Flex, Grid, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { getEnkibotJson } from "lib/enki-data";
import { Section } from "components/Tips";
import AppBar from "components/AppBar";
import { readMarkdownFile } from "lib/markdown";
import JobsSelector from "components/JobsSelector";

export const getStaticProps = async () => {
  const enkiData = JSON.parse(JSON.stringify(await getEnkibotJson()));
  const info = await readMarkdownFile("content/info.md");

  return {
    props: { enkiData, info },
  };
};

const HeadTag = () => (
  <Head>
    <title>Shiny Enkibot</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Home = ({ enkiData, info }) => {
  return (
    <>
      <HeadTag />

      <Grid
        templateRows="auto minmax(200px, 1fr)"
        templateColumns="350px 1fr"
        height="100vh"
      >
        <Flex gridColumn="span 2">
          <AppBar intro={enkiData.Intro[0].tips} info={info} />
        </Flex>

        <Flex
          overflow="auto"
          layerStyle="ff7"
          display={{ base: "none", lg: "flex" }}
        >
          <JobsSelector />
        </Flex>

        <Flex overflow="auto" gridColumn={{ base: "span 2", lg: "inherit" }}>
          <Container maxW="120ch">
            <Stack py={4}>
              {Object.keys(enkiData).map((section, i) => {
                // skip the intro from the tips list
                // we'll hide it in a menu
                if (section === "Intro") return null;

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
