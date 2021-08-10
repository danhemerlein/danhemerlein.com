import { useThemeContext } from "context/ThemeContext";
import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import { above } from "styles/utilities";
import { remHelper } from "utils";

const InfoContainer = styled.div`
  width: 100%;
  padding: ${remHelper[8]};
  border: 1px solid;
  background-color: ${({ theme, $mode }) => theme[$mode].background};
  border-color: ${({ theme, $mode }) => theme[$mode].foreground};
  color: ${({ theme, $mode }) => theme[$mode].foreground};

  ${above.desktop`
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

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
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 420px;
  background-position: center;
  background-size: cover;
  transition: opacity 0.25s ease-in-out;

  ${({ imageSRC }) => `background-image: url(${imageSRC});`};
  ${({ index }) => index === 1 && `opacity: 0;`};

  &:hover {
    ${({ index }) => index === 1 && `opacity: 1;`};
    ${({ index }) => index === 0 && `opacity: 0;`};
  }

  ${above.tablet`
    ${({ index }) => index === 1 && `width: 100%;`};
`}

  ${above.desktop`
    width: 352px;
  `}
`;

const StyledP = styled(P)`
  ${({ index }) => index === 0 && `margin-bottom: ${remHelper[8]};`};
  ${({ index }) =>
    index > 0 && `margin-top: ${remHelper[8]}; text-align: right;`};
`;

const Info = ({ source, sourcePrime }) => {
  const mode = useThemeContext();

  return (
    <InfoContainer $mode={mode}>
      <StyledP index={0}>hey i'm dan (he/him)</StyledP>
      <ImageContainer items="center">
        <BackgroundImage imageSRC={source}>
          <BackgroundImage imageSRC={sourcePrime} index={1} />
        </BackgroundImage>
      </ImageContainer>

      <StyledP index={1}>welcome to my website</StyledP>
    </InfoContainer>
  );
};

export default Info;
