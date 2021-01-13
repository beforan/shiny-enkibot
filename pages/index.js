import Head from "next/head";

export const getStaticProps = () => {
  const enkiData = { test: "hello" };

  return {
    props: { enkiData },
  };
};

const HeadTag = () => (
  <Head>
    <title>Create Next App</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Home = ({ enkiData }) => (
  <>
    <div>Hello World!</div>
    <pre>{JSON.stringify(enkiData, null, 2)}</pre>
  </>
);

export default Home;
