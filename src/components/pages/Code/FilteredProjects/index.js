import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils';
import { ListLinkContainer } from '../containers';
import RenderProjects from '../RenderProjects';

const PageParagraph = styled(P)`
  width: 100%;
  padding: 0 ${remHelper[16]};
`;

const FilteredProjects = ({ data, filterBy }) => {
  if (filterBy === 'work-experience') {
    return <RenderProjects projects={data} hasImage />;
  }

  if (filterBy === 'freelance') {
    return <RenderProjects projects={data} highlight />;
  }

  if (filterBy === 'portfolios') {
    const listLinks = data.filter((project) => project.fields.isListLink);
    const nonListLinks = data.filter((project) => !project.fields.isListLink);
    return (
      <>
        <RenderProjects projects={nonListLinks} hasImage />
        <PageParagraph>
          Below are a few more passion projects in various states of completion:
        </PageParagraph>
        <ListLinkContainer direction="column" wrap="wrap" items="center">
          <RenderProjects projects={listLinks} listLink hasImage={false} />
        </ListLinkContainer>
      </>
    );
  }

  if (filterBy === 'passion-project') {
    return <RenderProjects projects={data} hasImage={false} />;
  }
};

export default FilteredProjects;
