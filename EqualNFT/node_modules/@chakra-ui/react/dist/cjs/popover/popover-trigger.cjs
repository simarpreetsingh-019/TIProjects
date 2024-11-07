'use client';
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var popoverContext = require('./popover-context.cjs');

function PopoverTrigger(props) {
  const child = react.Children.only(props.children);
  const { getTriggerProps } = popoverContext.usePopoverContext();
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: react.cloneElement(child, getTriggerProps(child.props, child.ref)) });
}
PopoverTrigger.displayName = "PopoverTrigger";

exports.PopoverTrigger = PopoverTrigger;
