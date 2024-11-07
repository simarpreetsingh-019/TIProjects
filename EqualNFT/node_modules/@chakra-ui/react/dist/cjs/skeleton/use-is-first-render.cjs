'use client';
'use strict';

var react = require('react');

function useIsFirstRender() {
  const isFirstRender = react.useRef(true);
  react.useEffect(() => {
    isFirstRender.current = false;
  }, []);
  return isFirstRender.current;
}

exports.useIsFirstRender = useIsFirstRender;
