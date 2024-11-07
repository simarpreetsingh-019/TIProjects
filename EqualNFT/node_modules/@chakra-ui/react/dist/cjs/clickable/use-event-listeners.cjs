'use client';
'use strict';

var react = require('react');

function useEventListeners() {
  const listeners = react.useRef(/* @__PURE__ */ new Map());
  const currentListeners = listeners.current;
  const add = react.useCallback((el, type, listener, options) => {
    listeners.current.set(listener, { type, el, options });
    el.addEventListener(type, listener, options);
  }, []);
  const remove = react.useCallback(
    (el, type, listener, options) => {
      el.removeEventListener(type, listener, options);
      listeners.current.delete(listener);
    },
    []
  );
  react.useEffect(
    () => () => {
      currentListeners.forEach((value, key) => {
        remove(value.el, value.type, key, value.options);
      });
    },
    [remove, currentListeners]
  );
  return { add, remove };
}

exports.useEventListeners = useEventListeners;
