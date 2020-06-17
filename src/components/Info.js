import React from "react";
import { Stack } from "@chakra-ui/core";
import { useEnkidata } from "../contexts/Enkidata";
import AppDrawer, { SectionHeading } from "./AppDrawer";

export const Info = () => {
  const { Intro } = useEnkidata();

  return (
    <Stack>
      {Intro.map((entry, i) => (
        <div key={i}>{entry.body}</div>
      ))}
    </Stack>
  );
};

const InfoDrawer = () => (
  <AppDrawer header="About Shiny Enkibot" icon="info-outline" size="lg">
    <Stack spacing={2} shouldWrapChildren>
      <SectionHeading>Enkibot info</SectionHeading>
      <Info />
    </Stack>
  </AppDrawer>
);

export default InfoDrawer;
