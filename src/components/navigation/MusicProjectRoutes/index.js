import MusicProject from "components/pages/MusicProject";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const MusicProjectRoutes = ({ musicProjectsLoading, musicProjects }) => {
  if (!musicProjectsLoading && musicProjects.length) {
    return musicProjects.map((project) => {
      const handle = `/music/${project.fields.handle}`;
      return (
        <Route
          path={handle}
          key={project}
          render={(props) => <MusicProject {...props} project={project} />}
        />
      );
    });
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    musicProjectsLoading: state.musicProjects.loading,
    musicProjects: state.musicProjects.activeProjects,
  };
};

export default connect(mapStateToProps)(MusicProjectRoutes);
