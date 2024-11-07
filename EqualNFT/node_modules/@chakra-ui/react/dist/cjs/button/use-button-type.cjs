'use client';
'use strict';

var react = require('react');

function useButtonType(value) {
  const [isButton, setIsButton] = react.useState(!value);
  const refCallback = react.useCallback((node) => {
    if (!node)
      return;
    setIsButton(node.tagName === "BUTTON");
  }, []);
  const type = isButton ? "button" : void 0;
  return { ref: refCallback, type };
}

exports.useButtonType = useButtonType;
