import { string } from 'prop-types'
import styled from 'styled-components'
import { above, globalTransition } from 'styles/utilities'

const Div = styled.div`
  width: 100%;
  height: 420px;
  background-position: center;
  background-size: cover;
  transition: opacity ${globalTransition};

  ${({ imageSRC }) => {
    return `background-image: url(${imageSRC});`
  }};

  ${({ index }) => {
    return index === 1 && `opacity: 0;`
  }};

  ${above.tablet`
    ${({ index }) => {
      return index === 1 && `width: 100%;`
    }};
  `}

  ${above.desktop`
    width: 352px;

    &:hover {
      ${({ index }) => {
        return index === 1 && `opacity: 1;`
      }};

      ${({ index }) => {
        return index === 0 && `opacity: 0;`
      }};
    }

  `}
`

const BackgroundImage = ({ source, sourcePrime }) => {
  return (
    <Div imageSRC={source}>
      <Div imageSRC={sourcePrime} index={1} />
    </Div>
  )
}

BackgroundImage.propTypes = {
  source: string.isRequired,
  sourcePrime: string.isRequired
}

export default BackgroundImage
