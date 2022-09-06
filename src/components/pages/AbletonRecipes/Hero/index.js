import styled from 'styled-components';
import { FlexContainer, H1, P } from 'styles/elements';
import { fullBleed } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

const StyledDiv = styled(FlexContainer)`
  height: 25vh;
  margin-top: ${remHelper[16]};
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
`;

const Hero = ({ total, platforms, ops, tags }) => {
  return (
    <StyledDiv justify="center" items="center" direction="column">
      <H1>ableton recipes</H1>
      <P>{total} tips to browse</P>
      <P>
        from {ops} sources on {platforms} platforms
      </P>
      <P>{tags} tags to search with</P>
      <P>...with more being added all the time (hopefully)</P>
    </StyledDiv>
  );
};

Hero.propTypes = {};

export default Hero;
