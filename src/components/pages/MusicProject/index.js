import GoHomeBack from 'components/base/GoHomeBack';
import FullScreenHeight from 'components/other/FullScreenHeight';
import Loading from 'components/other/Loading';
import NotFound from 'components/pages/NotFound';
import { arrayOf, bool } from 'prop-types';
import { musicProjectPropTypes } from 'propTypes';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities';
import { basePageTitle } from 'utils/constants/lib';
import { remHelper } from 'utils/remHelper';
import ProjectContainer from './ProjectContainer';
import ProjectDetails from './ProjectDetails';
import ProjectLink from './ProjectLink';

const Inner = styled(FlexContainer)`
  width: 100%;
  flex-direction: column;

  ${above.tablet`
    width: 75%
  `}

  ${above.desktop`
    flex-direction: row;
  `}
`;

const StyledImg = styled.img`
  width: 100%;
  margin: 0 auto;

  ${above.tablet`
    width: 50%;
  `}

  ${above.desktop`
    margin: 0 ${remHelper[8]} 0 0;
  `}
`;

const DetailsContainer = styled.div`
  width: 100%;
  margin-bottom: ${remHelper[16]};

  ${above.desktop`
    width: 50%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0;
    margin-left: ${remHelper[8]};
  `}
`;

const LinksContainer = styled.ul`
  margin-top: ${remHelper[16]};
`;

const StyledGoHomeBack = styled(GoHomeBack)`
  ${above.tablet`
    position: absolute;
    bottom: ${remHelper[16]};
  `}
`;

const MusicProject = ({ musicProjectsLoading, musicProjects }) => {
  const content = musicProjects.length;

  let project = {};
  let artwork;
  let links;

  const params = useParams();

  useEffect(() => {
    document.title = `${basePageTitle} - music`;
  }, []);

  if (!musicProjectsLoading && content) {
    project = musicProjects.filter(
      (project) => project.fields.handle === params.handle
    );

    [project] = project;

    if (project === undefined) {
      return <NotFound />;
    }

    artwork = project.fields.artwork;
    links = project.fields.links;
  }

  if (musicProjectsLoading === false && !content) {
    return null;
  }
  if (musicProjectsLoading === true && !content) {
    return <Loading />;
  }

  return (
    <FullScreenHeight unsetBreakpoint="none">
      <ProjectContainer artwork={artwork}>
        <Inner>
          <StyledImg
            src={artwork.fields.file.url}
            alt={artwork.fields.file.title}
          />

          <DetailsContainer>
            <ProjectDetails project={project} />

            <LinksContainer>
              {links.map((link) => {
                return <ProjectLink key={link.link} link={link} />;
              })}
            </LinksContainer>
          </DetailsContainer>
        </Inner>

        <StyledGoHomeBack
          destination="/music/"
          cta="go back"
          themeColor="white"
        />
      </ProjectContainer>
    </FullScreenHeight>
  );
};

const mapStateToProps = (state) => {
  return {
    musicProjectsLoading: state.musicProjects.loading,
    musicProjects: state.musicProjects.all,
  };
};

MusicProject.propTypes = {
  musicProjectsLoading: bool.isRequired,
  musicProjects: arrayOf(musicProjectPropTypes).isRequired,
};

export default connect(mapStateToProps)(MusicProject);
