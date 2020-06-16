import React from "react";
import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  useColorMode,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/core";
import { FaSun, FaMoon } from "react-icons/fa";
import { useSettings } from "contexts/Settings";
import * as locales from "config/locales";
import characters from "config/characters";

const SectionHeading = ({ children }) => (
  <Heading fontWeight="medium" size="sm">
    {children}
  </Heading>
);

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const button = {
    light: { content: "Dark mode", icon: FaMoon },
    dark: { content: "Light mode", icon: FaSun },
  };

  return (
    <>
      <Button
        lineHeight="inherit"
        width="100%"
        leftIcon={button[colorMode].icon}
        onClick={toggleColorMode}
      >
        {button[colorMode].content}
      </Button>
    </>
  );
};

const TranslationMenu = () => {
  const { locale, setLocale } = useSettings();

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon="chevron-down"
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
  <>
    <Image
      htmlWidth="24px"
      htmlHeight="32px"
      src={`/assets/jobs/${id}/${id}.png`}
      alt={name}
      mr="12px"
    />
    <span>{name}</span>
  </>
);

const CharacterMenu = () => {
  const { locale, character, setCharacter } = useSettings();
  const currentName = characters[character].name(locale);

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon="chevron-down"
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

const SettingsMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton icon="settings" onClick={onOpen} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <Stack spacing={2} shouldWrapChildren>
              <SectionHeading>Color Mode</SectionHeading>
              <ColorModeToggle />

              <SectionHeading>Game Translation</SectionHeading>
              <TranslationMenu />

              <SectionHeading>Sprite Character</SectionHeading>
              <CharacterMenu />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SettingsMenu;
