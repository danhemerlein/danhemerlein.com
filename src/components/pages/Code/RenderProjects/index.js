import CodeProject from "../CodeProject";
import ListLinkCodeProject from "../ListLinkCodeProject";

const RenderProjects = ({ projects, highlight, listLink, hasImage }) => {
  return (
    <>
      {projects.map((project, key) => {
        const { title } = project.fields;

        if (highlight) {
          return (
            <CodeProject
              project={project}
              index={key}
              key={title}
              gradientRotation="45deg"
              gradientStart="#fff"
              gradientEnd="#ff6ad5"
            />
          );
        }

        if (listLink) {
          return (
            <ListLinkCodeProject project={project} index={key} key={project} />
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

export default RenderProjects;
