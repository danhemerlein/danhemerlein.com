import FullScreenHeight from 'components/other/FullScreenHeight';
import { useEffect } from 'react';
import styled from 'styled-components';
import { A, FlexContainer, H1, P } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import { remHelper } from 'utils/remHelper';

const StyledHeadline = styled(H1)`
  margin-bottom: ${remHelper[8]};
`;

const StyledP = styled(P)`
  margin: ${remHelper[8]} 0;
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

        <StyledP>icons:</StyledP>

        <StyledP>
          Not Found page icon by&nbsp;
          <A
            href="https://linktr.ee/yuto.nyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jeremy Yuto
          </A>
        </StyledP>

        <StyledP>fonts:</StyledP>

        <StyledP>Close icon by Sophia Bai from the Noun Project</StyledP>

        <StyledP>
          Happy Times font by&nbsp;
          <A
            href="https://lucaslebihan.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucas Le Bihan
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

        <StyledP>photography:</StyledP>

        <StyledP>
          homepage main photo by&nbsp;
          <A
            href="https://linktr.ee/ursae"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andrew Campbell
          </A>
        </StyledP>

        <StyledP>
          homepage and about page hover photos by&nbsp;
          <A
            href="https://linktr.ee/sarlauf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sara Laufer
          </A>
        </StyledP>
      </FlexContainer>
    </FullScreenHeight>
  );
};

export default Credits;
