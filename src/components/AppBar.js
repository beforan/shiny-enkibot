import React from "react";
import SettingsMenu from "./SettingsMenu";
import { Flex, Heading, Stack, IconButton, Link } from "@chakra-ui/core";
import InfoDrawer from "./Info";
import { JobDrawer } from "./JobSelector";
import { FaGithub } from "react-icons/fa";

const AppBar = () => (
  <Flex
    align="center"
    justify="space-between"
    flexBasis="100%"
    boxShadow="0 2px 10px 0 rgba(0,0,0,.2), 0 1px 3px 0 rgba(0,0,0,.5)"
  >
    <Flex visibility={{ base: "visible", md: "hidden" }}>
      <JobDrawer />
    </Flex>
    <Heading size="lg" fontWeight="medium">
      Shiny Enkibot
    </Heading>
    <Stack spacing={2} isInline shouldWrapChildren>
      <InfoDrawer />
      <SettingsMenu />
      <IconButton
        as={Link}
        icon={FaGithub}
        href="https://github.com/beforan/shiny-enkibot"
        target="_new"
      />
    </Stack>
  </Flex>
);

export default AppBar;
