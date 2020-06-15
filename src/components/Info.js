import React from "react";
import { Stack } from "@chakra-ui/core";
import { useEnkidata } from "../contexts/Enkidata";

const Info = () => {
  const { Intro } = useEnkidata();
  console.log(Intro)

  return <Stack>{Intro.map((entry, i) => <div key={i}>{entry.body}</div>)}</Stack>;
};

export default Info;
