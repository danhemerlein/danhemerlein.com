import GoHomeBack from 'components/base/GoHomeBack';
import FullScreenHeight from 'components/other/FullScreenHeight';
import { contentfulRequest } from 'contentfulClient';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { basePageTitle } from 'utils/constants/lib';
import { remHelper } from 'utils/remHelper';
import Loading from 'components/other/Loading';
import { getProjectByHandle } from '../Music/queries';
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

const MusicProject = () => {
  const [project, setProject] = useState({});

  const params = useParams();

  const fetchProject = async (handle) => {
    const proj = await contentfulRequest(getProjectByHandle(handle));

    const p = proj.musicProjectCollection.items[0];

    setProject(p);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchProject(params.handle);
    };

    fetchData();

    document.title = `${basePageTitle} - music`;
  }, []);

  const { artwork } = project;

  console.log(project);

  const linkKeys = [
    'spotify',
    'bandcamp',
    'apple',
    'tidal',
    'amazon',
    'deezer',
    'napster',
    'googlePlay',
    'soundcloud',
  ];

  const linkArray = [];

  linkKeys.map((key) => {
    if (project[key] !== null) {
      linkArray.push({
        title: key,
        link: project[key],
      });
    }
  });

  if (!project || !artwork) return <Loading />;

  return (
    <FullScreenHeight unsetBreakpoint="none">
      <ProjectContainer url={artwork.url}>
        <Inner>
          <StyledImg src={artwork.url} alt={artwork.title} />

          <DetailsContainer>
            <ProjectDetails project={project} />

            <LinksContainer>
              {linkArray.map((link) => {
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
      fuck
    </FullScreenHeight>
  );
};

export default MusicProject;
