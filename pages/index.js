import Head from "next/head";
import { useState } from "react";
import { getEnkibotJson } from "../lib/enki-data/enki-data";

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

      <div>Hello World!</div>

      <button onClick={() => setShowData(!showData)}>
        {showData ? "Hide" : "Show"} Data
      </button>
      {showData && <pre>{JSON.stringify(enkiData, null, 2)}</pre>}
    </>
  );
};

export default Home;
