import styled from 'styled-components'
import { FlexContainer } from 'styles/elements'
import { above } from 'styles/utilities/breakpoints'
import { fullBleed } from 'styles/utilities'
import { remHelper } from 'utils/remHelper'

export const PageContainer = styled(FlexContainer)`
  margin: ${remHelper[16]} 0;
  display: grid;
  grid-template-columns: 1fr;
  ${fullBleed({ space: 1.6, right: true, left: true })};

  overflow: scroll;
  height: calc(100vh - 134px);
  scroll-snap-type: y mandatory;
  position: relative;

  -ms-overflow-style: none;
  scrollbar-width: none;
  scrollbar-height: none;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
    display: none;
  }

  ${above.tablet`
    height: auto;
    overflow: unset;
  `}
`

export const MoodboardContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  ${above.tablet`
    grid-template-columns: repeat(2, 1fr);
  `}
`
