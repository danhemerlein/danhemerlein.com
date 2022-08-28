import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { descriptionContentPropTypes } from 'propTypes';
import { ContentfulRichTextWrapper } from 'styles/elements';

const options = {
  renderNode: {
    node: (text) => {
      return <p key={`${text}-key`}>{text}</p>;
    }
  }
};

const ProjectContent = ({ description }) => {
  return (
    <ContentfulRichTextWrapper>
      {description.json.content.map((item) => {
        return documentToReactComponents(item, options);
      })}
    </ContentfulRichTextWrapper>
  );
};

ProjectContent.propTypes = {
  description: descriptionContentPropTypes
};

export default ProjectContent;
