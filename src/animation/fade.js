import { keyframes } from "styled-components";
import { customMedia } from "../styles";

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
  }
  to {
    top: 50px;
    top: 3.125rem;
  }
`

export const collectionMenuFadeOut = keyframes`
  from {
  }
  to {
    top: -200px;
    top: -12.5rem;
    ${customMedia.greaterThan("tablet")`
      top: -100px;
      top: -6.25rem;
    `}
  }
`