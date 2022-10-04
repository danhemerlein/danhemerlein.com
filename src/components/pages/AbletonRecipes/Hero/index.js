import styled from 'styled-components';
import { FlexContainer, H1, P } from 'styles/elements';
import { fullBleed } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';

const StyledDiv = styled(FlexContainer)`
  height: 25vh;
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
`;

const PreText = styled(P)`
  position: absolute;
  top: ${remHelper[16]};
  left: ${remHelper[16]};
`;
const SubText = styled(P)`
  position: absolute;
  bottom: ${remHelper[16]};
  right: ${remHelper[16]};
`;

const Hero = ({ total, platforms, ops, tags, funMode }) => {
  return (
    <StyledDiv justify="center" items="center" direction="column">
      <PreText>wtf is ableton recipes?</PreText>
      <H1>
        {funMode ? <span>🎉</span> : null} ableton recipes{' '}
        {funMode ? <span>🎉</span> : null}
      </H1>
      <P>{total} tips to browse</P>
      <P>
        from {ops} sources on {platforms} platforms
      </P>
      <P>bespoke tagging system with {tags} tags</P>
      <SubText>
        ...with more content being added all the time (hopefully)
      </SubText>
    </StyledDiv>
  );
};

Hero.propTypes = {};

export default Hero;
