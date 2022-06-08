import {style} from "@vanilla-extract/css";

export const toast = style({
  position: 'fixed',
  zIndex: 9999,
  pointerEvents: 'none',
  maxHeight: '100%',
  maxWidth: '100%',
  top: 0,
  right: 0
})