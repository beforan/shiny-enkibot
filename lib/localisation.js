/**
 * Get a Localised Text string for a specific Locale
 * @param {Object} localised the Localised Text in the form `{ base: "", [locale]: ""...}`
 * @param {*} locale the key of the locale to use
 * @returns {string} either localised[locale] or localised.base
 */
export const forLocale = (localised, locale) =>
  localised[locale] || localised.base;

/**
 * Make a Localised Text object from a string and any optional localised values
 * @param {string} base what the base value should be
 * @param {Object} locales any locale values as kv pairs
 */
export const localise = (base, locales) => ({
  base,
  ...locales,
});
