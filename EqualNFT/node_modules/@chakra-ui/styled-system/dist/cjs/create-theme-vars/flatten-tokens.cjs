'use strict';

var utils = require('@chakra-ui/utils');
var pseudos = require('../pseudos.cjs');
var themeTokens = require('./theme-tokens.cjs');

function flattenTokens(theme) {
  const tokens = themeTokens.extractTokens(theme);
  const semanticTokens = themeTokens.extractSemanticTokens(theme);
  const pseudoPropNames = pseudos.getPseudoPropNames(theme);
  const isSemanticCondition = (key) => pseudoPropNames.includes(key) || "default" === key;
  const result = {};
  utils.walkObject(tokens, (value, path) => {
    if (value == null)
      return;
    result[path.join(".")] = { isSemantic: false, value };
  });
  utils.walkObject(
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

exports.flattenTokens = flattenTokens;
