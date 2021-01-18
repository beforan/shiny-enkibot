import React from "react";
import { Stack } from "@chakra-ui/react";
import AppDrawer, { SectionHeading } from "./AppDrawer";
import TipsMarkdown from "./TipsMarkdown";
import { FaInfoCircle } from "react-icons/fa";

export const Info = ({ intro }) => {
  return (
    <Stack>
      {intro.map((tip, i) => (
        <TipsMarkdown key={i}>{tip}</TipsMarkdown>
      ))}
    </Stack>
  );
};

const InfoDrawer = ({ intro, info }) => (
  <AppDrawer header="About Shiny Enkibot" icon={<FaInfoCircle />} size="lg">
    <Stack spacing={2}>
      <SectionHeading>Enkibot info</SectionHeading>
      <Info intro={intro} />
      <SectionHeading>Shiny Enkibot info</SectionHeading>
      <TipsMarkdown>{info}</TipsMarkdown>
    </Stack>
  </AppDrawer>
);

export default InfoDrawer;
