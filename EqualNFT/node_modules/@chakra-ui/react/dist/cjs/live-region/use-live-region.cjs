'use client';
'use strict';

var react = require('react');
var liveRegion = require('./live-region.cjs');

function useLiveRegion(options) {
  const [liveRegion$1] = react.useState(() => new liveRegion.LiveRegion(options));
  react.useEffect(
    () => () => {
      liveRegion$1.destroy();
    },
    [liveRegion$1]
  );
  return liveRegion$1;
}

exports.useLiveRegion = useLiveRegion;
