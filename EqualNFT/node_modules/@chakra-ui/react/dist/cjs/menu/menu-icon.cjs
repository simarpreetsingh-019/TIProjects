'use client';
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var utils = require('@chakra-ui/utils');
var react = require('react');
var menu = require('./menu.cjs');
var factory = require('../system/factory.cjs');

const MenuIcon = (props) => {
  const { className, children, ...rest } = props;
  const styles = menu.useMenuStyles();
  const child = react.Children.only(children);
  const clone = react.isValidElement(child) ? react.cloneElement(child, {
    focusable: "false",
    "aria-hidden": true,
    className: utils.cx("chakra-menu__icon", child.props.className)
  }) : null;
  const _className = utils.cx("chakra-menu__icon-wrapper", className);
  return /* @__PURE__ */ jsxRuntime.jsx(factory.chakra.span, { className: _className, ...rest, __css: styles.icon, children: clone });
};
MenuIcon.displayName = "MenuIcon";

exports.MenuIcon = MenuIcon;
