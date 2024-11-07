'use client';
'use strict';

var react = require('react');

function useInitialAnimationState(isChecked) {
  const [previousIsChecked, setPreviousIsChecked] = react.useState(isChecked);
  const [shouldAnimate, setShouldAnimate] = react.useState(false);
  if (isChecked !== previousIsChecked) {
    setShouldAnimate(true);
    setPreviousIsChecked(isChecked);
  }
  return shouldAnimate;
}

exports.useInitialAnimationState = useInitialAnimationState;
