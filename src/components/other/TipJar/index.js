import CloseIcon from 'components/base/icons/Close'
import FocusTrap from 'focus-trap-react'
import { bool, func } from 'prop-types'
import styled from 'styled-components'
import { A, FlexContainer, P } from 'styles/elements'
import { StyledCloseButton } from 'styles/elements/elements'
import { globalTransition } from 'styles/utilities'
import { blockScroll } from 'utils/lib'
import { remHelper } from 'utils/remHelper'

const Jar = styled.div`
  z-index: 5;
  transform: translateX(240px);

  position: absolute;
  top: 0;
  right: 0;

  display: block;

  width: 240px;
  height: 240px;

  background-color: ${({ theme }) => {
    return theme.background
  }};

  color: ${({ theme }) => {
    return theme.foreground
  }};

  overflow: hidden;

  padding: ${remHelper[16]};

  visibility: hidden;
  transition: ${globalTransition};
  border: 1px solid
    ${({ theme }) => {
      return theme.border
    }};

  ${({ jarOpen }) => {
    return (
      jarOpen &&
      `
      visibility: visible;
      transform: translateX(0);
      position: fixed;
  `
    )
  }};
`

const TextContainer = styled(FlexContainer)`
  height: 100%;

  div:last-of-type {
    flex-grow: 1;
    p {
      text-align: center;
    }
  }
`

const TipJar = ({ jarOpen, clickHandler, activeTrap }) => {
  const handleClick = () => {
    clickHandler()
    blockScroll(false)
  }

  return (
    <Jar jarOpen={jarOpen}>
      {activeTrap && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: '#tip-jar-trap',
            allowOutsideClick: true
          }}
        >
          <TextContainer id="tip-jar-trap" direction="column">
            <FlexContainer items="center">
              <StyledCloseButton onClick={handleClick}>
                <CloseIcon width="2.4rem" height="2.4rem" color="#000" />
              </StyledCloseButton>
            </FlexContainer>

            <FlexContainer items="center" justify="center">
              <P>
                this feature is under construction follow me on&nbsp;
                <A
                  href="https://www.twitter.com/danhemerlein"
                  target="_blank"
                  rel="noreferrer"
                >
                  twitter
                </A>
                &nbsp;for updates
              </P>
            </FlexContainer>
          </TextContainer>
        </FocusTrap>
      )}
    </Jar>
  )
}

TipJar.propTypes = {
  clickHandler: func.isRequired,
  jarOpen: bool.isRequired,
  activeTrap: bool.isRequired
}

export default TipJar
