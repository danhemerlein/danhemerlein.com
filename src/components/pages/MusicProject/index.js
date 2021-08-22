import GoHomeBack from 'components/base/GoHomeBack';
import FullScreenHeight from 'components/other/FullScreenHeight';
import Loading from 'components/other/Loading';
import NotFound from 'components/pages/NotFound';
import { usePalette } from 'react-palette';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above, fullBleed } from 'styles/utilities';
import { remHelper } from 'utils';
import ProjectDetails from './ProjectDetails';
import ProjectLink from './ProjectLink';

const Project = styled(FlexContainer)`
  position: relative;
  height: 100%;
  padding: ${remHelper[16]};
  justify-content: space-between;
  ${fullBleed({ space: 1.6, right: true, left: true })};
  overflow-y: scroll;

  ${({ lightMuted, muted }) =>
    lightMuted &&
    muted &&
    `background-image: linear-gradient(45deg, ${lightMuted}, ${muted})`};

  ${above.tablet`
    justify-content: center;
    overflow-y: unset;
  `}
`;

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
  let data;

  const params = useParams();

  if (!musicProjectsLoading && content) {
    project = musicProjects.filter(
      (project) => project.fields.handle === params.handle
    );
    [project] = project;

    console.log(project);

    if (project === undefined) {
      return <NotFound />;
    }

    artwork = project.fields.artwork;
    links = project.fields.links;
    data = usePalette(`https:${artwork.fields.file.url}`);
  }

  if (musicProjectsLoading === false && !content) {
    return null;
  }
  if (musicProjectsLoading === true && !content) {
    return <Loading />;
  }

  return (
    <FullScreenHeight unsetBreakpoint="none">
      <Project
        items="center"
        direction="column"
        lightMuted={data.lightMuted}
        muted={data.muted}
      >
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
      </Project>
    </FullScreenHeight>
  );
};

const mapStateToProps = (state) => {
  return {
    musicProjectsLoading: state.musicProjects.loading,
    musicProjects: state.musicProjects.activeProjects,
  };
};

export default connect(mapStateToProps)(MusicProject);
