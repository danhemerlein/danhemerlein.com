import styled from 'styled-components';
import { FlexContainer, H1 } from 'styles/elements';
import { fullBleed } from 'styles/utilities/mixins';

const StyledDiv = styled(FlexContainer)`
  height: 25rem;

  * {
    font-family: 'arial';
  }

  ${fullBleed({ space: 1.6, right: true, left: true })};

  background-color: ${({ theme }) => {
    return theme.yan.background;
  }};

  color: ${({ theme }) => {
    return theme.background;
  }};

  position: relative;
  margin-top: 71px;
`;

const Hero = ({ funMode }) => {
  return (
    <StyledDiv justify="center" items="center" direction="column">
      <H1 textAlign="center">
        {funMode ? <span>🎉&nbsp;</span> : null}a recipe website for
        <br /> ableton live
        {funMode ? <span>&nbsp;🎉</span> : null}
      </H1>
    </StyledDiv>
  );
};

Hero.propTypes = {};

export default Hero;
