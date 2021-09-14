import GoHomeBack from 'components/base/GoHomeBack';
import Loading from 'components/other/Loading';
import { arrayOf, bool } from 'prop-types';
import { musicProjectPropTypes } from 'propTypes';
import { connect } from 'react-redux';
import {
  filterMusicArtists,
  filterProjects,
  sortProjects,
} from 'store/selectors';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils';
import MusicHero from './MusicHero';
import MusicSort from './MusicSort';
import ProjectPreview from './ProjectPreview';

const PageContainer = styled.div`
  margin-bottom: ${remHelper[16]};
`;

const ProjectPreviewContainer = styled(FlexContainer)`
  flex-direction: column;
  width: 100%;

  ${above.tablet`
    flex-direction: row;
  `}
`;

const GoHomeContainer = styled(FlexContainer)`
  width: 100%;
`;

const Music = ({
  loading,
  projects,
  performedAvailable,
  wroteAvailable,
  producedAvailable,
  artistFilter,
  sortBy,
}) => {
  const content = projects.length;

  if (loading === false && !content) {
    return null;
  }
  if (loading === true && !content) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <MusicHero />
      <FlexContainer wrap="wrap" items="center" justify="center">
        <ProjectPreviewContainer wrap="wrap" items="center" justify="center">
          <MusicSort
            performedAvailable={performedAvailable}
            wroteAvailable={wroteAvailable}
            producedAvailable={producedAvailable}
            artistFilter={artistFilter}
            sortBy={sortBy}
          />

          {projects.map((project, index) => {
            const { title } = project.fields;
            return (
              <ProjectPreview index={index} project={project} key={title} />
            );
          })}

          <GoHomeContainer justify="center">
            <GoHomeBack destination="/" cta="go back" white />
          </GoHomeContainer>
        </ProjectPreviewContainer>
      </FlexContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  let propsProjects = state.musicProjects.activeProjects;
  const { filters, sortBy, artistFilter } = state.musicProjects;

  if (filters.length) {
    propsProjects = filterProjects(state.musicProjects.filters, propsProjects);
  }

  if (sortBy.length) {
    propsProjects = sortProjects(state.musicProjects.sortBy, propsProjects);
  }

  if (artistFilter.length) {
    propsProjects = filterMusicArtists(
      state.musicProjects.artistFilter,
      propsProjects
    );
  }

  const performedAvailable = propsProjects.map(
    (project) => project.fields.performed === true
  );

  const wroteAvailable = propsProjects.map(
    (project) => project.fields.wrote === true
  );

  const producedAvailable = propsProjects.map(
    (project) => project.fields.produced === true
  );

  const props = {
    loading: state.musicProjects.loading,
    projects: propsProjects,
    artistFilter: state.musicProjects.artistFilter,
    sortBy: state.musicProjects.sortBy,
    performedAvailable: performedAvailable.includes(true),
    wroteAvailable: wroteAvailable.includes(true),
    producedAvailable: producedAvailable.includes(true),
  };

  return { ...state, ...props };
};

Music.propTypes = {
  loading: bool.isRequired,
  projects: arrayOf(musicProjectPropTypes).isRequired,
};

export default connect(mapStateToProps)(Music);
