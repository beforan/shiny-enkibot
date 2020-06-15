import React from "react";
import data from "./built/enki.json"

const App = () => {
  return <div>{JSON.stringify(data)}</div>;
};

export default App;
