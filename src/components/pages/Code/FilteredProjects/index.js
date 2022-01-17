import FullScreenHeight from 'components/other/FullScreenHeight';
import { arrayOf, string } from 'prop-types';
import { codeProjectPropTypes } from 'propTypes';
import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';
import { ListLinkContainer } from '../containers';
import RenderProjects from '../RenderProjects';

const PageParagraph = styled(P)`
  width: 100%;
  padding: 0 ${remHelper[16]};
  margin-top: ${remHelper[16]};
`;

const FilteredProjects = ({ data, filterBy }) => {
  if (filterBy === 'work-experience') {
    return (
      <FullScreenHeight
        items="flex-start"
        justify="flex-start"
        direction="column"
        noTopPadding
      >
        <RenderProjects projects={data} hasImage />
      </FullScreenHeight>
    );
  }

  if (filterBy === 'freelance') {
    return (
      <FullScreenHeight
        items="flex-start"
        justify="flex-start"
        direction="column"
        noTopPadding
      >
        <RenderProjects projects={data} highlight />
      </FullScreenHeight>
    );
  }

  if (filterBy === 'portfolios') {
    const listLinks = data.filter((project) => {
      return project.fields.isListLink;
    });
    const nonListLinks = data.filter((project) => {
      return !project.fields.isListLink;
    });
    return (
      <FullScreenHeight
        items="flex-start"
        justify="flex-start"
        direction="column"
        noTopPadding
      >
        <RenderProjects projects={nonListLinks} hasImage />
        <PageParagraph>
          Below are a few more passion projects in various states of completion:
        </PageParagraph>
        <ListLinkContainer direction="column" wrap="wrap" items="center">
          <RenderProjects projects={listLinks} listLink hasImage={false} />
        </ListLinkContainer>
      </FullScreenHeight>
    );
  }

  if (filterBy === 'passion-project') {
    return (
      <FullScreenHeight
        items="flex-start"
        justify="flex-start"
        direction="column"
        noTopPadding
      >
        <RenderProjects projects={data} hasImage={false} />
      </FullScreenHeight>
    );
  }
};

FilteredProjects.propTypes = {
  data: arrayOf(codeProjectPropTypes).isRequired,
  filterBy: string.isRequired
};

export default FilteredProjects;
