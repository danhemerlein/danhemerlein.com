import { keyframes } from 'styled-components'

export const SlideRight = keyframes`
  0% {
    transform: translate3d(-1%, 0, 0);
  }

  100% {
    transform: transform3d(0, 0, 0);
  }
`

export const SlideWideRight = keyframes`
  0% {
    transform: translate3d(-3%, 0, 0);
  }

  100% {
    transform: transform3d(0, 0, 0);
  }
`

export const SlideLeft = keyframes`
  0% {
    transform: translate3d(1%, 0, 0);
  }

  100% {
    transform: transform3d(0, 0, 0);
  }
`

export const SlideWideLeft = keyframes`
  0% {
    transform: translate3d(3%, 0, 0);
  }

  100% {
    transform: transform3d(0, 0, 0);
  }
`
