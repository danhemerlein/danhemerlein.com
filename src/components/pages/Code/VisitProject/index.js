import { bool, string } from 'prop-types';
import { imagePropTypes } from 'propTypes';
import styled from 'styled-components';
import { P } from 'styles/elements';
import { above, anchorColor } from 'styles/utilities';
import { remHelper } from 'utils';

const StyledAnchor = styled.a`
  text-decoration: underline;
  font-size: ${remHelper[16]};
  margin-top: ${remHelper[16]};
  width: 25%;
  display: flex;
  justifty-content: center;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor,
    });
  }}
`;

const StyledImg = styled.img`
  margin-bottom: ${remHelper[16]};
  width: 25%;
  background: #ffffff;
  padding: ${remHelper[8]};

  ${above.tablet`
    width: 50%;
  `};
`;

const VisitProject = ({ link, hasImage, image }) => {
  return (
    <StyledAnchor href={link} target="_blank" rel="noopener noreferrer">
      {hasImage && (
        <StyledImg src={image.fields.file.url} alt={image.fields.file.title} />
      )}

      <P>visit project</P>
    </StyledAnchor>
  );
};

VisitProject.propTypes = {
  link: string,
  image: imagePropTypes,
  hasImage: bool,
};

VisitProject.defaultProps = {
  link: '',
  hasImage: false,
  image: undefined,
};

export default VisitProject;
