import { useState, useEffect } from 'react';
import GoHomeBack from 'components/base/GoHomeBack';

import { contentfulRequest } from 'contentfulClient';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { basePageTitle } from 'utils/constants/lib';
import { remHelper } from 'utils/remHelper';
import MusicHero from './MusicHero';
import MusicSort from './MusicSort';
import ProjectPreview from './ProjectPreview';
import { getFilterSortProjects, getAllProjects } from './queries';

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

const ProjectGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  column-gap: ${remHelper[16]};
  row-gap: ${remHelper[16]};
  margin-bottom: ${remHelper[16]};

  ${above.desktop`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

const NoResultsContainer = styled(FlexContainer)`
  height: 60vh;

  h6 {
    margin-top: ${remHelper[32]};
    text-align: center;
  }
`;

const getArtists = (a) => {
  const art = [];
  a.map((proj) => {
    art.push(proj.artist.trim());
  });
  return [...new Set(art)].sort();
};

const Music = () => {
  const [projects, setProjects] = useState([]);
  const [artists, setArtists] = useState([]);

  const fetchAllProjects = async () => {
    const allProjects = await contentfulRequest(getAllProjects);
    const p = allProjects.musicProjectCollection.items;

    setProjects(p);
    setArtists(getArtists(p));
  };

  const filterSortProjects = async (filterObject, order, artist) => {
    const filteredSorted = await contentfulRequest(
      getFilterSortProjects(filterObject, order, artist)
    );

    const p = filteredSorted.musicProjectCollection.items;
    setProjects(p);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchAllProjects();
    };

    fetchData();

    document.title = `${basePageTitle} - music`;
  }, []);

  return (
    <PageContainer>
      <MusicHero />
      <FlexContainer wrap="wrap" items="center" justify="center">
        <ProjectPreviewContainer wrap="wrap" items="center" justify="center">
          <MusicSort handleFilterSort={filterSortProjects} artists={artists} />

          {projects.length ? (
            <ProjectGrid>
              {projects.map((project, index) => {
                return (
                  <ProjectPreview
                    index={index}
                    project={project}
                    key={project.sys.id}
                  />
                );
              })}
            </ProjectGrid>
          ) : (
            <NoResultsContainer>
              <P as="h6">
                there are no results for the selected filters, please adjust the
                filter / sort parameters
              </P>
            </NoResultsContainer>
          )}

          <GoHomeContainer justify="center">
            <GoHomeBack destination="/" cta="go back" white />
          </GoHomeContainer>
        </ProjectPreviewContainer>
      </FlexContainer>
    </PageContainer>
  );
};

export default Music;
