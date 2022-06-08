import {style} from "@vanilla-extract/css";

export const toast = style({
  position: 'fixed',
  zIndex: 9999,
  pointerEvents: 'none',
  minHeight: '100%',
  minWidth: '100%',
  top: 0,
  left: 0,
})

  export const toastEnter = style({
    opacity: 0,
    selectors: {
      '&': {
        transition: `opacity 300ms`
      }
    }
  })
  export const toastEnterActive = style({
    opacity: 1,
    selectors: {
      '&': {
        transition: `opacity 300ms`
      }
    }
  })

  export const toastExit = style({
    opacity: 1,
    selectors: {
      '&': {
        transition: `opacity 300ms`
      }
    }
  })
  export const toastExitActive = style({
    opacity: 0,
    selectors: {
      '&': {
        transition: `opacity 300ms`
      }
    }
  })
