import { mergeWith } from '@chakra-ui/utils';
import { getPseudoPropNames, getPseudoSelectors } from './pseudos.mjs';
import { background } from './config/background.mjs';
import { border } from './config/border.mjs';
import { color } from './config/color.mjs';
import { flexbox } from './config/flexbox.mjs';
import { layout } from './config/layout.mjs';
import { filter } from './config/filter.mjs';
import { ring } from './config/ring.mjs';
import { interactivity } from './config/interactivity.mjs';
import { grid } from './config/grid.mjs';
import { others } from './config/others.mjs';
import { position } from './config/position.mjs';
import { effect } from './config/effect.mjs';
import { space } from './config/space.mjs';
import { scroll } from './config/scroll.mjs';
import { typography } from './config/typography.mjs';
import { textDecoration } from './config/text-decoration.mjs';
import { transform } from './config/transform.mjs';
import { list } from './config/list.mjs';
import { transition } from './config/transition.mjs';

const systemProps = mergeWith(
  {},
  background,
  border,
  color,
  flexbox,
  layout,
  filter,
  ring,
  interactivity,
  grid,
  others,
  position,
  effect,
  space,
  scroll,
  typography,
  textDecoration,
  transform,
  list,
  transition
);
const layoutSystem = Object.assign({}, space, layout, flexbox, grid, position);
const layoutPropNames = Object.keys(
  layoutSystem
);
const getPropNames = (theme) => [
  ...Object.keys(systemProps),
  ...getPseudoPropNames(theme)
];
const isStylePropFn = (theme) => {
  const pseudoSelectors = getPseudoSelectors(theme);
  const styleProps = { ...systemProps, ...pseudoSelectors };
  return (prop) => {
    return Object.hasOwnProperty.call(styleProps, prop);
  };
};

export { getPropNames, isStylePropFn, layoutPropNames, systemProps };
