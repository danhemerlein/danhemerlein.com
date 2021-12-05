import { string } from 'prop-types';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above, globalTransition } from 'styles/utilities';

const InfoContainer = styled.div`
  width: 100%;

  ${above.desktop`
    width: 352px;
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
  transition: opacity ${globalTransition};

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

const Info = ({ source, sourcePrime }) => {
  return (
    <InfoContainer>
      <ImageContainer items="center">
        <BackgroundImage imageSRC={source}>
          <BackgroundImage imageSRC={sourcePrime} index={1} />
        </BackgroundImage>
      </ImageContainer>
    </InfoContainer>
  );
};

Info.propTypes = {
  source: string.isRequired,
  sourcePrime: string.isRequired,
};

export default Info;
