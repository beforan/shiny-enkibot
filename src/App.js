import React from "react";
import { EnkidataProvider } from "./contexts/Enkidata";
import Info from "./components/Info";
import { JobsProvider } from "./contexts/Jobs";
import JobSelector from "components/JobSelector";

const App = () => {
  return (
    <JobsProvider>
      <EnkidataProvider>
        {/* <Info /> */}
        <JobSelector />
      </EnkidataProvider>
    </JobsProvider>
  );
};

export default App;
