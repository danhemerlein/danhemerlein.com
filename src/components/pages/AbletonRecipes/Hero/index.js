import styled from 'styled-components';
import { FlexContainer, H1 } from 'styles/elements';
import { fullBleed } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

const StyledDiv = styled(FlexContainer)`
  height: 25vh;
  margin-top: ${remHelper[16]};

  ${fullBleed({ space: 1.6, right: true, left: true })};

  background-color: ${({ theme }) => {
    return theme.yan.background;
  }};

  color: ${({ theme }) => {
    return theme.background;
  }};
`;

const Hero = () => {
  return (
    <StyledDiv justify="center" items="center">
      <H1>ableton recipes</H1>
    </StyledDiv>
  );
};

Hero.propTypes = {};

export default Hero;
