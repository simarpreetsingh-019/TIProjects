'use client';
'use strict';

var react = require('react');

const ColorModeContext = react.createContext({});
ColorModeContext.displayName = "ColorModeContext";
function useColorMode() {
  const context = react.useContext(ColorModeContext);
  if (context === void 0) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}
function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

exports.ColorModeContext = ColorModeContext;
exports.useColorMode = useColorMode;
exports.useColorModeValue = useColorModeValue;
