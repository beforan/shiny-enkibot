import { Container, Stack } from "@chakra-ui/react";
import Head from "next/head";
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

      <Container>
        <Stack>
          {/* <Button onClick={() => setShowData(!showData)}>
          {showData ? "Hide" : "Show"} Data
          </Button>
        {showData && <pre>{JSON.stringify(enkiData, null, 2)}</pre>} */}

          {Object.keys(enkiData).map((section) => {
            // skip the intro from the tips list
            // we'll hide it in a menu
            if (section === "Intro") return null;

            // TODO: filter sections? Anchor them?
            return <Section title={section} groups={enkiData[section]} />;
          })}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
