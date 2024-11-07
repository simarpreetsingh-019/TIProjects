'use client';
import { jsx, Fragment } from 'react/jsx-runtime';
import { Children, cloneElement } from 'react';
import { usePopoverContext } from './popover-context.mjs';

function PopoverAnchor(props) {
  const child = Children.only(props.children);
  const { getAnchorProps } = usePopoverContext();
  return /* @__PURE__ */ jsx(Fragment, { children: cloneElement(child, getAnchorProps(child.props, child.ref)) });
}
PopoverAnchor.displayName = "PopoverAnchor";

export { PopoverAnchor };
