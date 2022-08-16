import GoHomeBack from 'components/base/GoHomeBack';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import { remHelper } from 'utils/remHelper';
import { contentfulRequest } from 'contentfulClient';
import CodeSort from './CodeSort';
import { ListLinkContainer } from './containers';
import RenderProjects from './RenderProjects';

import { filterProjects, getAllProjects } from './queries';

const CodePage = styled(FlexContainer)`
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledAccordion = styled.div`
  width: 100%;
`;

const PageParagraph = styled(P)`
  width: 100%;
  padding: 0 ${remHelper[16]};
`;

const MarginContainer = styled.div`
  margin-top: ${remHelper[16]};
`;

const Code = () => {
  const [projects, setProjects] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  const fetchAllProjects = async () => {
    const allProjects = await contentfulRequest(getAllProjects);
    setProjects(allProjects.codeProjectCollection.items);
  };

  const handleFilter = async (filter) => {
    if (filter === '') {
      fetchAllProjects();
      setFilterActive(false);
    } else {
      setFilterActive(true);
      const filtered = await contentfulRequest(filterProjects(filter));
      setProjects(filtered.codeProjectCollection.items);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetchAllProjects();
    };

    fetchData();

    document.title = `${basePageTitle} - code`;
  }, []);

  return (
    <CodePage items="center" justify="center" direction="column">
      <CodeSort filterProjects={handleFilter} />

      <StyledAccordion>
        <RenderProjects
          projects={projects.filter((project) => {
            return project.isTopLink;
          })}
        />

        <MarginContainer>
          {!filterActive && (
            <PageParagraph>
              In my spare time, I develop websites for my musician friends.
              Below are few recent selections.
            </PageParagraph>
          )}

          <ListLinkContainer direction="column" wrap="wrap" items="center">
            <RenderProjects
              projects={projects.filter((project) => {
                return project.isListLink;
              })}
              listLink
            />
          </ListLinkContainer>
        </MarginContainer>

        <MarginContainer>
          {!filterActive && (
            <PageParagraph>
              Below are a few more passion projects in various states of
              completion:
            </PageParagraph>
          )}

          <RenderProjects
            projects={projects.filter((project) => {
              return project.isBottomLink;
            })}
          />
        </MarginContainer>
      </StyledAccordion>

      <MarginContainer>
        <GoHomeBack destination="/" cta="go home" white={false} />
      </MarginContainer>
    </CodePage>
  );
};

export default Code;
