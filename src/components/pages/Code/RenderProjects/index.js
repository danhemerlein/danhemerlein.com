import { arrayOf, bool } from 'prop-types';
import { codeProjectPropTypes } from 'propTypes';
import CodeProject from '../CodeProject';
import ListLinkCodeProject from '../ListLinkCodeProject';

const RenderProjects = ({ projects, listLink }) => {
  return (
    <>
      {projects.map((project, key) => {
        const hasImage = project.fields?.image !== undefined;

        const highlight = project.fields?.highlight === true;

        const { title } = project.fields;

        if (highlight) {
          return (
            <CodeProject
              project={project}
              index={key}
              key={title}
              $gradientRotation="45deg"
              $gradientStart="#fff"
              $gradientEnd="#ff6ad5"
            />
          );
        }

        if (listLink) {
          return (
            <ListLinkCodeProject project={project} index={key} key={title} />
          );
        }
        return (
          <CodeProject
            project={project}
            index={key}
            key={title}
            hasImage={hasImage}
          />
        );
      })}
    </>
  );
};

RenderProjects.propTypes = {
  projects: arrayOf(codeProjectPropTypes).isRequired,
  listLink: bool,
};

RenderProjects.defaultProps = {
  listLink: false,
};

export default RenderProjects;
