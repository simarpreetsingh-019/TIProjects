'use client';
import { jsx, Fragment } from 'react/jsx-runtime';
import { Children, cloneElement } from 'react';
import { usePopoverContext } from './popover-context.mjs';

function PopoverTrigger(props) {
  const child = Children.only(props.children);
  const { getTriggerProps } = usePopoverContext();
  return /* @__PURE__ */ jsx(Fragment, { children: cloneElement(child, getTriggerProps(child.props, child.ref)) });
}
PopoverTrigger.displayName = "PopoverTrigger";

export { PopoverTrigger };
