import { useState, useEffect } from 'react';
import GoHomeBack from 'components/base/GoHomeBack';
import Loading from 'components/other/Loading';

import { contentfulRequest } from 'contentfulClient';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
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
  grid-template-columns: repeat(1, 1fr);
  column-gap: ${remHelper[16]};

  ${above.tablet`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${above.desktop`
    grid-template-columns: repeat(4, 1fr);
  `}
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
  const [sortActive, setSortActive] = useState(false);

  const fetchAllProjects = async () => {
    const allProjects = await contentfulRequest(getAllProjects);
    const p = allProjects.musicProjectCollection.items;

    setProjects(p);
    setArtists(getArtists(p));
  };

  const filterSortProjects = async (filterObject, order) => {
    // const trueKeys = Object.keys(filterObject).filter((key) => {
    //   return filterObject[key] === true;
    // });

    // const whereArray = [];

    // trueKeys.map((key) => {
    //   const dict = {};
    //   dict[key] = true;
    //   whereArray.push(dict);
    // });

    const filteredSorted = await contentfulRequest(
      getFilterSortProjects(filterObject, order)
    );

    const p = filteredSorted.musicProjectCollection.items;
    setProjects(p);
    setArtists(getArtists(p));
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

          <GoHomeContainer justify="center">
            <GoHomeBack destination="/" cta="go back" white />
          </GoHomeContainer>
        </ProjectPreviewContainer>
      </FlexContainer>
    </PageContainer>
  );
};

export default Music;
