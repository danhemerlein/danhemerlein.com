import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { descriptionContentPropTypes } from 'propTypes';
import styled from 'styled-components';
import { anchorColor } from 'styles/utilities';
import { remHelper } from 'utils';

const DescriptionContent = styled.div`
  margin-top: ${remHelper[16]};

  p {
    font-family: 'custom_serif';
    font-size: ${remHelper[16]};
    line-height: 1.25;
    width: 75%;
    margin: 0 auto;
    text-align: justify;
  }

  a {
    ${({ theme }) => {
      return anchorColor({
        color: theme.foreground,
        textDecoration: 'underline',
      });
    }}
  }
`;

const options = {
  renderNode: {
    node: (text) => {
      return <p key={`${text}-key`}>{text}</p>;
    },
  },
};

const ProjectContent = ({ description }) => {
  return (
    <DescriptionContent>
      {documentToReactComponents(description, options)}
    </DescriptionContent>
  );
};

ProjectContent.propTypes = {
  description: descriptionContentPropTypes.isRequired,
};

export default ProjectContent;
