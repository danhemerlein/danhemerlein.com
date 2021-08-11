import FullScreenHeight from "components/other/FullScreenHeight";
import styled from "styled-components";
import { FlexContainer, H1, P } from "styles/elements";
import { remHelper } from "utils";

const StyledHeadline = styled(H1)`
  margin-bottom: ${remHelper[8]};
`;

const StyledP = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const Credits = () => {
  return (
    <FullScreenHeight justify="flex-start" items="flex-start">
      <FlexContainer direction="column">
        <StyledHeadline>site credits:</StyledHeadline>

        <StyledP>
          Not Found page icon create by&nbsp;
          <a
            href="https://linktr.ee/yuto.nyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jeremy Yuto
          </a>
        </StyledP>

        <StyledP>
          Lack Italic font by&nbsp;
          <a
            href="http://www.adrienmidzic.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adrien Midzic
          </a>
        </StyledP>

        <StyledP>
          Happy Times font created by&nbsp;
          <a
            href="https://lucaslebihan.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucas Le Bihan
          </a>
        </StyledP>

        <StyledP>
          Close icon created by Sophia Bai from the Noun Project
        </StyledP>
      </FlexContainer>
    </FullScreenHeight>
  );
};

export default Credits;
