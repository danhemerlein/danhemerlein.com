import FullScreenHeight from 'components/other/FullScreenHeight'
import { useEffect } from 'react'
import styled from 'styled-components'
import { FlexContainer, P } from 'styles/elements'
import { basePageTitle } from 'utils/constants/lib'
import { remHelper } from 'utils/remHelper'

const PageContainer = styled(FlexContainer)`
  height: 50%;
  flex-direction: column;
`

const TextContainer = styled.div`
  margin-top: ${remHelper[16]};
  max-width: 340px;
`

const YAN = () => {
  useEffect(() => {
    document.title = `${basePageTitle} - not found`
  }, [])

  return (
    <FullScreenHeight unsetBreakpoint="none">
      <PageContainer items="center" justify="center">
        <TextContainer>
          <P>
            young and nauseous is my creative multimedia project emphasising
            music, software and data. the dedicated young and nauseous website
            is currently under construction.
          </P>
        </TextContainer>
      </PageContainer>
    </FullScreenHeight>
  )
}

export default YAN
