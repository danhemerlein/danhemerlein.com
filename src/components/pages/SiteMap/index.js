import { arrayOf, bool } from 'prop-types';
import { musicProjectPropTypes } from 'propTypes';
import { connect } from 'react-redux';

const SiteMap = ({ musicProjectsLoading, musicProjects }) => {
  return <></>;
};

const mapStateToProps = (state) => {
  return {
    musicProjectsLoading: state.musicProjects.loading,
    musicProjects: state.musicProjects.activeProjects,
  };
};

SiteMap.propTypes = {
  musicProjectsLoading: bool.isRequired,
  musicProjects: arrayOf(musicProjectPropTypes).isRequired,
};

export default connect(mapStateToProps)(SiteMap);
