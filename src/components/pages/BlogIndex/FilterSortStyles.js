import styled from 'styled-components'
import { FlexContainer } from 'styles/elements'
import { above } from 'styles/utilities/breakpoints'
import { remHelper } from 'utils/remHelper'

export const Container = styled(FlexContainer)`
  margin-top: ${remHelper[16]};
  margin-bottom: ${remHelper[16]};
  flex-direction: column;

  ${above.tablet`
    margin-right: ${remHelper[16]};
    flex-direction: row;
  `}
`

export const SelectContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};
  width: 100%;

  ${above.tablet`
    margin-top: 0;
    width: auto;
  `}

  column-gap: ${remHelper[16]};
`
