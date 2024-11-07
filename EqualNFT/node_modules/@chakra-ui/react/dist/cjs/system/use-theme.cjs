'use client';
'use strict';

var react$1 = require('@emotion/react');
var react = require('react');

function useTheme() {
  const theme = react.useContext(
    react$1.ThemeContext
  );
  if (!theme) {
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`"
    );
  }
  return theme;
}

exports.useTheme = useTheme;
