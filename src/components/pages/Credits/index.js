import FullScreenHeight from 'components/other/FullScreenHeight';
import { useEffect } from 'react';
import styled from 'styled-components';
import { FlexContainer, H1, P } from 'styles/elements';
import { anchorColor } from 'styles/utilities';
import { basePageTitle, remHelper } from 'utils';

const StyledHeadline = styled(H1)`
  margin-bottom: ${remHelper[8]};
`;

const StyledP = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const A = styled.a`
  ${({ theme }) => {
    return anchorColor({
      color: theme.foreground,
      textDecoration: 'underline',
    });
  }}
`;

const Credits = () => {
  useEffect(() => {
    document.title = `${basePageTitle} - credits`;
  }, []);
  return (
    <FullScreenHeight
      unsetBreakpoint="none"
      justify="flex-start"
      items="flex-start"
    >
      <FlexContainer direction="column">
        <StyledHeadline>site credits:</StyledHeadline>

        <StyledP>
          Not Found page icon create by&nbsp;
          <A
            href="https://linktr.ee/yuto.nyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jeremy Yuto
          </A>
        </StyledP>

        <StyledP>
          Lack Italic font by&nbsp;
          <A
            href="http://www.adrienmidzic.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adrien Midzic
          </A>
        </StyledP>

        <StyledP>
          Happy Times font created by&nbsp;
          <A
            href="https://lucaslebihan.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucas Le Bihan
          </A>
        </StyledP>

        <StyledP>
          Close icon created by Sophia Bai from the Noun Project
        </StyledP>
      </FlexContainer>
    </FullScreenHeight>
  );
};

export default Credits;
