import type { HTMLAttributes } from 'react';

export const HTML_ATTRIBUTES: (keyof HTMLAttributes<HTMLElement>)[] = [
  // Standard HTML Attributes
  'accessKey',
  'autoFocus',
  'contentEditable',
  'contextMenu',
  'dir',
  'draggable',
  'hidden',
  'id',
  'lang',
  'nonce',
  'slot',
  'spellCheck',
  'tabIndex',
  'title',
  'translate',
  // WAI-ARIA
  'role',
  // Non-standard Attributes
  'autoCapitalize',
  'autoCorrect',
  'autoSave',
  'color',
  'itemProp',
  'itemScope',
  'itemType',
  'itemID',
  'itemRef',
  'results',
  'security',
  'unselectable',
  // Living Standard
  'inputMode',
  'is',
  // DOM
  'children',
];
