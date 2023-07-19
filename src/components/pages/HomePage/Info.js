import BackgroundImage from 'components/other/BackgroundImage'
import { string } from 'prop-types'
import styled from 'styled-components'
import { FlexContainer } from 'styles/elements'
import { above } from 'styles/utilities/breakpoints'

const InfoContainer = styled.div`
  width: 100%;

  ${above.desktop`
    width: 352px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`

const ImageContainer = styled(FlexContainer)`
  width: 100%;
  justify-content: center;
  margin: 0 auto;

  ${above.tablet`
    width: 50%;
  `}

  ${above.desktop`
    width: 100%;
  `}
`

const Info = ({ source, sourcePrime }) => {
  return (
    <InfoContainer>
      <ImageContainer items="center">
        <BackgroundImage source={source} sourcePrime={sourcePrime} />
      </ImageContainer>
    </InfoContainer>
  )
}

Info.propTypes = {
  source: string.isRequired,
  sourcePrime: string.isRequired
}

export default Info
