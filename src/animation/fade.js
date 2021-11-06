import { keyframes } from "styled-components";

export const pageFadeIn = keyframes`
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const collectionMenuFadeIn = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    top: 50px;
  }
`

export const collectionMenuFadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    top: -200px;
  }
`