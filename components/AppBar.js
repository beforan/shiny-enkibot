// import SettingsMenu from "./SettingsMenu";
import { Flex, Heading, IconButton, Link, HStack } from "@chakra-ui/react";
import { rainbowColors } from "lib/rainbowColors";
// import InfoDrawer from "./Info";
// import { JobDrawer } from "./JobSelector";
import { FaGithub } from "react-icons/fa";
import InfoDrawer from "./Info";
import { JobsDrawer } from "./JobsSelector";
import SettingsMenu from "./SettingsMenu";

const AppHeading = ({ children }) => {
  return (
    <Heading
      size="lg"
      fontWeight="bold"
      textShadow="none"
      bgGradient={`linear(to-r,${rainbowColors.slice(0, 7).join(",")})`}
      bgClip="text"
      lineHeight={1.5}
    >
      {children}
    </Heading>
  );
};

const AppBar = ({ intro, info }) => {
  return (
    <Flex
      layerStyle="ff7"
      align="center"
      p={2}
      justify="space-between"
      w="100%"
      boxShadow="appbar"
    >
      <Flex visibility={{ base: "visible", lg: "hidden" }}>
        <JobsDrawer />
      </Flex>

      <AppHeading>Shiny Enkibot</AppHeading>

      <HStack>
        <InfoDrawer intro={intro} info={info} />

        <SettingsMenu />

        <IconButton
          as={Link}
          icon={<FaGithub />}
          href="https://github.com/beforan/shiny-enkibot"
          target="_blank"
        />
      </HStack>
    </Flex>
  );
};

export default AppBar;
