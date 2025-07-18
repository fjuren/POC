// DOCS: https://www.npmjs.com/package/@tokens-studio/sd-transforms?activeTab=readme#usage

import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { expandTypesMap } from '@tokens-studio/sd-transforms';

// Registers token on a StyleDictionary object
register(StyleDictionary, {
  excludeParentKeys: true, //<-- helpful if multiple sets are present / included in json sync; don't need if upgrading to PRO
});

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
  // expand: {
  //   typesMap: expandTypesMap, // <-- handles token studio sets (sets allow for things like themeing)
  // },
  log: {
    verbosity: 'verbose', // <-- helps for error handling
  },
  platforms: {
    // Can expand to various platforms from here
    css: {
      transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab'], // <-- we can customize tranformed output through here if needed
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    // For HTML demo
    'css-html-demo': {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'html-demo/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    // For React demo
    'css-react-demo': {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'react-demo/src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
