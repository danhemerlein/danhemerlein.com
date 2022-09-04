import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { descriptionContentPropTypes } from 'propTypes';
import { generateRichTextParserOptions } from 'utils/rich-text-helpers';

const ProjectContent = ({ description }) => {
  return (
    <div>
      {description.json.content.map((item) => {
        return documentToReactComponents(
          item,
          generateRichTextParserOptions(description)
        );
      })}
    </div>
  );
};

ProjectContent.propTypes = {
  description: descriptionContentPropTypes
};

export default ProjectContent;
