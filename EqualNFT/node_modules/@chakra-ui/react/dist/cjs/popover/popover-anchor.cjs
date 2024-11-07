'use client';
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var popoverContext = require('./popover-context.cjs');

function PopoverAnchor(props) {
  const child = react.Children.only(props.children);
  const { getAnchorProps } = popoverContext.usePopoverContext();
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: react.cloneElement(child, getAnchorProps(child.props, child.ref)) });
}
PopoverAnchor.displayName = "PopoverAnchor";

exports.PopoverAnchor = PopoverAnchor;
