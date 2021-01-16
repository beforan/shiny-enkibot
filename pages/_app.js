import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "theme/theme";

import { createContext, useContext, useState } from "react";
import { jobDefinitions } from "config/jobs";

const AppContext = createContext({
  selectedJobs: {},
  toggleJobSelected: (job) => {},
});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [selectedJobs, setSelectedJobs] = useState(jobDefinitions);

  const toggleJobSelected = (job) =>
    setSelectedJobs((old) => ({ ...old, [job]: !old[job] }));

  return (
    <AppContext.Provider value={{ selectedJobs, toggleJobSelected }}>
      {children}
    </AppContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
