import { arrayOf, bool } from 'prop-types';
import { codeProjectPropTypes } from 'propTypes';
import CodeProject from '../CodeProject';
import ListLinkCodeProject from '../ListLinkCodeProject';

const RenderProjects = ({ projects, listLink }) => {
  return (
    <>
      {projects.map((project, key) => {
        const hasImage = !!project?.image?.url?.length;

        const highlight = !!project?.highlight;

        if (highlight) {
          return (
            <CodeProject
              project={project}
              index={key}
              key={project.sys.id}
              $gradientRotation="45deg"
              $gradientStart="#fff"
              $gradientEnd="#ff6ad5"
            />
          );
        }

        if (listLink) {
          return (
            <ListLinkCodeProject
              project={project}
              index={key}
              key={project.sys.id}
            />
          );
        }

        return (
          <CodeProject
            project={project}
            index={key}
            key={project.sys.id}
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
