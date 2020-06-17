import React from "react";
import { EnkidataProvider } from "./contexts/Enkidata";
import { JobsProvider } from "./contexts/Jobs";
import JobSelector from "components/JobSelector";
import { SettingsProvider } from "contexts/Settings";
import { Flex, Grid } from "@chakra-ui/core";
import AppBar from "components/AppBar";

const AppContextProvider = ({ children }) => (
  <SettingsProvider>
    <JobsProvider>
      <EnkidataProvider>{children}</EnkidataProvider>
    </JobsProvider>
  </SettingsProvider>
);

const App = () => {
  return (
    <AppContextProvider>
      <Grid
        templateRows="auto minmax(200px, 1fr)"
        templateColumns="300px 1fr"
        height="100vh"
      >
        <Flex gridColumn="span 2">
          <AppBar />
        </Flex>

        <Flex display={{base: "none", md: "flex"}}>
          <JobSelector />
        </Flex>

        <Flex>Test</Flex>
      </Grid>
    </AppContextProvider>
  );
};

export default App;
