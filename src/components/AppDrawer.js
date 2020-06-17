import React from "react";
import {
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Heading,
  Button,
} from "@chakra-ui/core";

// we use a few drawers in this app but they are basically all the same
// so this should make where they are used a lot more concise

const AppDrawer = ({ children, icon, button, header, ...p }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {button ? (
        <Button onClick={onOpen}>{button}</Button>
      ) : (
        <IconButton icon={icon} onClick={onOpen} />
      )}

      <Drawer isOpen={isOpen} onClose={onClose} {...p}>
        <DrawerOverlay />
        <DrawerContent display="grid" gridTemplateRows="50px minmax(200px, auto)">
          <DrawerCloseButton />
          <DrawerHeader>{header}</DrawerHeader>
          <DrawerBody d="flex">{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

/**
 * Heading Preset for consistency inside drawers
 */
export const SectionHeading = ({ children }) => (
  <Heading fontWeight="medium" size="sm">
    {children}
  </Heading>
);

export default AppDrawer;
