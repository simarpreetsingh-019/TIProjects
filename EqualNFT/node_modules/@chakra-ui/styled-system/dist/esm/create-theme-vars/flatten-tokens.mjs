import { walkObject } from '@chakra-ui/utils';
import { getPseudoPropNames } from '../pseudos.mjs';
import { extractTokens, extractSemanticTokens } from './theme-tokens.mjs';

function flattenTokens(theme) {
  const tokens = extractTokens(theme);
  const semanticTokens = extractSemanticTokens(theme);
  const pseudoPropNames = getPseudoPropNames(theme);
  const isSemanticCondition = (key) => pseudoPropNames.includes(key) || "default" === key;
  const result = {};
  walkObject(tokens, (value, path) => {
    if (value == null)
      return;
    result[path.join(".")] = { isSemantic: false, value };
  });
  walkObject(
    semanticTokens,
    (value, path) => {
      if (value == null)
        return;
      result[path.join(".")] = { isSemantic: true, value };
    },
    {
      stop: (value) => Object.keys(value).every(isSemanticCondition)
    }
  );
  return result;
}

export { flattenTokens };
