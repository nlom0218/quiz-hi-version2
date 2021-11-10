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
    top: -150px;
    top: -9.375rem;
  }
`

export const collectionMenuFadeOutTablet = keyframes`
  from {
  }
  to {
    top: -50px;
    top: -3.175rem;
  }
`

export const mobileMoveBot = keyframes`
  form {
  }
  to {
    transform: translateY(200px);
    transform: translateY(12.5rem);
  }
`

export const tabletMoveBot = keyframes`
  form {
  }
  to {
    transform: translateY(100px);
    transform: translateY(6.25rem);
  }
`

export const mobileMoveTop = keyframes`
  from {
    transform: translateY(200px);
    transform: translateY(12.5rem);
  }
  to {
    transform: translateY(0);
  }
`

export const tabletMoveTop = keyframes`
  from {
    transform: translateY(100px);
    transform: translateY(6.25rem);
  }
  to {
    transform: translateY(0);
  }
`

export const weatherDown = keyframes`
  from {
    top: -36px;
    top: -2.25rem;
  }
  to {
    top: 20px;
    top: 1.25rem;
  }
`

export const weatherUp = keyframes`
  from {
    top: 20px;
    top: 1.25rem;
  }
  to {
    top: -36px;
    top: -2.25rem;
  }
`

export const weatherBtnDown = keyframes`
  from {
    top: 20px;
    top: 1.25rem;
  }
  to {
    top: 76px;
    top: 4.75rem;
  }
`

export const weatherBtnUp = keyframes`
  from {
    top: 76px;
    top: 4.75rem;
  }
  to {
    top: 20px;
    top: 1.25rem;
  }
`