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
`

export const MoodboardContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  ${above.tablet`
    grid-template-columns: repeat(2, 1fr);
  `}
`

export const GoHomeContainer = styled(FlexContainer)`
  width: 100%;
  margin-top: ${remHelper[16]};
`
