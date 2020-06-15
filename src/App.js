import React from "react";
import data from "./built/enki.json"
import { EnkidataProvider } from "./contexts/Enkidata";
import Info from "./components/Info";

const App = () => <EnkidataProvider value={data}>
  <Info />
</EnkidataProvider>

export default App;
