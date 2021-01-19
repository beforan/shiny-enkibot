import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Image,
  Text,
  HStack,
  Box,
} from "@chakra-ui/react";
import * as locales from "config/locales";
import characters from "config/characters";
import AppDrawer, { SectionHeading } from "./AppDrawer";
import { useSettings } from "contexts/Settings";
import { FaChevronDown, FaCog } from "react-icons/fa";

// currently with the ff7 theme we lock to dark mode
// const ColorModeToggle = () => {
//   const { colorMode, toggleColorMode } = useColorMode();

//   const button = {
//     light: { content: "Dark mode", icon: FaMoon },
//     dark: { content: "Light mode", icon: FaSun },
//   };

//   return (
//     <>
//       <Button
//         lineHeight="inherit"
//         width="100%"
//         leftIcon={button[colorMode].icon}
//         onClick={toggleColorMode}
//       >
//         {button[colorMode].content}
//       </Button>
//     </>
//   );
// };

const TranslationMenu = () => {
  const { locale, setLocale } = useSettings();

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<FaChevronDown />}
          width="100%"
          justifyContent="space-between"
        >
          {locale}
        </MenuButton>
        <MenuList>
          {Object.keys(locales).map((k) => (
            <MenuItem key={k} onClick={() => setLocale(k)}>
              {k}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

const Character = ({ id, name }) => (
  <HStack align="center">
    <Image
      width="20px"
      height="28.75px"
      src={`/assets/jobs/${id}/${id}.png`}
      alt={name}
      fallback={<Box minW="20px" minH="28.75px" />}
    />
    <Text as="div">{name}</Text>
  </HStack>
);

const CharacterMenu = () => {
  const { locale, character, setCharacter } = useSettings();
  const currentName = characters[character].name(locale);

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<FaChevronDown />}
          width="100%"
          justifyContent="space-between"
        >
          <Character id={character} name={currentName} />
        </MenuButton>
        <MenuList>
          {Object.keys(characters).map((k) => (
            <MenuItem key={k} onClick={() => setCharacter(k)} height="40px">
              <Character id={k} name={characters[k].name(locale)} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

const SettingsMenu = () => (
  <AppDrawer header="Settings" icon={<FaCog />}>
    <Stack spacing={2} shouldWrapChildren width="100%">
      <SectionHeading>Color Mode</SectionHeading>
      {/* <ColorModeToggle /> */}

      <SectionHeading>Game Translation</SectionHeading>
      <TranslationMenu />

      <SectionHeading>Sprite Character</SectionHeading>
      <CharacterMenu />
    </Stack>
  </AppDrawer>
);

export default SettingsMenu;
