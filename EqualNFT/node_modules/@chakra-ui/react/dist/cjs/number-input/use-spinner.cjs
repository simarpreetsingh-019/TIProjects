'use client';
'use strict';

var hooks = require('@chakra-ui/hooks');
var react = require('react');

const CONTINUOUS_CHANGE_INTERVAL = 50;
const CONTINUOUS_CHANGE_DELAY = 300;
function useSpinner(increment, decrement) {
  const [isSpinning, setIsSpinning] = react.useState(false);
  const [action, setAction] = react.useState(null);
  const [runOnce, setRunOnce] = react.useState(true);
  const timeoutRef = react.useRef(null);
  const removeTimeout = () => clearTimeout(timeoutRef.current);
  hooks.useInterval(
    () => {
      if (action === "increment") {
        increment();
      }
      if (action === "decrement") {
        decrement();
      }
    },
    isSpinning ? CONTINUOUS_CHANGE_INTERVAL : null
  );
  const up = react.useCallback(() => {
    if (runOnce) {
      increment();
    }
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false);
      setIsSpinning(true);
      setAction("increment");
    }, CONTINUOUS_CHANGE_DELAY);
  }, [increment, runOnce]);
  const down = react.useCallback(() => {
    if (runOnce) {
      decrement();
    }
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false);
      setIsSpinning(true);
      setAction("decrement");
    }, CONTINUOUS_CHANGE_DELAY);
  }, [decrement, runOnce]);
  const stop = react.useCallback(() => {
    setRunOnce(true);
    setIsSpinning(false);
    removeTimeout();
  }, []);
  react.useEffect(() => {
    return () => removeTimeout();
  }, []);
  return { up, down, stop, isSpinning };
}

exports.useSpinner = useSpinner;
