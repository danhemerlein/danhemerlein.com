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
import { setFilteredProjects, getAllProjects } from './queries';

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

const Music = () => {
  const [projects, setProjects] = useState([]);
  const [sortActive, setSortActive] = useState(false);

  const fetchAllProjects = async () => {
    const allProjects = await contentfulRequest(getAllProjects);
    setProjects(allProjects.data.musicProjectCollection.items);
  };

  const filterProjects = async (filterObject) => {
    const sorted = await contentfulRequest(setFilteredProjects(filterObject));
    console.log(sorted);
    setProjects(sorted.data.musicProjectCollection.items);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchAllProjects();
    };

    fetchData();

    document.title = `${basePageTitle} - music`;
  }, []);

  console.log(projects);

  return (
    <PageContainer>
      <MusicHero />
      <FlexContainer wrap="wrap" items="center" justify="center">
        <ProjectPreviewContainer wrap="wrap" items="center" justify="center">
          <MusicSort
            // performedAvailable={performedAvailable}
            // wroteAvailable={wroteAvailable}
            // producedAvailable={producedAvailable}
            // artistFilter={artistFilter}
            // sortBy={sortBy}
            handleFilter={filterProjects}
          />

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
