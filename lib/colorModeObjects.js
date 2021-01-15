import { useColorModeValue } from "@chakra-ui/react";

/**
 * Generate Light and Dark mode objects.
 * - Dark mode will be based on the Light mode,
 *  for efficiency where both modes share values.
 * @param {*} light The base style, used for light mode
 * @param {*} darkOverrides overrides of light, used for dark mode
 * @returns {Object} {
 *   light: the light mode value,
 *   dark: the light mode value merged with darkOverrides
 * }
 */
export const buildColorModeObjects = (light = {}, darkOverrides = {}) => ({
  light,
  dark: { ...light, ...darkOverrides },
});
