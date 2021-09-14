import { Accordion } from '@reach/accordion';
import GoHomeBack from 'components/base/GoHomeBack';
import Loading from 'components/other/Loading';
import { array, arrayOf, bool, shape, string } from 'prop-types';
import { codeProjectPropTypes } from 'propTypes';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getCodeProjectsContent } from 'store/actions/codeProjects';
import { filterCodeProjects } from 'store/selectors';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above, blackBorder } from 'styles/utilities';
import { remHelper } from 'utils';
import CodeSort from './CodeSort';
import FilteredProjects from './FilteredProjects';
import RenderProjects from './RenderProjects';

const CodePage = styled(FlexContainer)`
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledAccordion = styled(Accordion)`
  width: 100%;
`;

const PageParagraph = styled(P)`
  width: 100%;
  padding: 0 ${remHelper[16]};
`;

const ListLinkContainer = styled(FlexContainer)`
  width: 100%;
  margin-top: ${remHelper[16]};

  ${above.tablet`
    padding-top: ${remHelper[16]};
    border: ${blackBorder};
  `}
`;

const MarginContainer = styled.div`
  margin-top: ${remHelper[16]};
`;

const Code = ({
  codeProjectsLoading,
  codeProjects,
  filterBy,
  filteredCodeProjects,
}) => {
  const { topLinks, listLinks, bottomLinks, highlight } = codeProjects;
  let filteredProjects;

  if (filterBy.length) {
    filteredProjects = filterCodeProjects(filterBy, filteredCodeProjects);
    console.log(filterCodeProjects(filterBy, filteredCodeProjects));
  }

  const content = Object.keys(codeProjects).length;

  const dispatch = useDispatch();

  useEffect(() => {
    const loadContent = async () => {
      await dispatch(getCodeProjectsContent());
    };

    loadContent();
  }, [dispatch]);

  if (codeProjectsLoading === false && !content) {
    return null;
  }

  if (codeProjectsLoading === true && !content) {
    return <Loading />;
  }

  return (
    <CodePage items="center" justify="center" direction="column">
      <CodeSort />

      {!filterBy.length ? (
        <StyledAccordion collapsible multiple>
          <RenderProjects projects={topLinks} hasImage />
          <RenderProjects projects={highlight} highlight />

          <MarginContainer>
            <PageParagraph>
              In my spare time, I develop websites for my musician friends.
              Below are few recent selections.
            </PageParagraph>

            <ListLinkContainer direction="column" wrap="wrap" items="center">
              <RenderProjects projects={listLinks} listLink hasImage={false} />
            </ListLinkContainer>
          </MarginContainer>

          <MarginContainer>
            <PageParagraph>
              Below are a few more passion projects in various states of
              completion:
            </PageParagraph>

            <RenderProjects projects={bottomLinks} hasImage={false} />
          </MarginContainer>
        </StyledAccordion>
      ) : (
        <StyledAccordion collapsible multiple>
          <FilteredProjects data={filteredProjects} filterBy={filterBy} />
        </StyledAccordion>
      )}

      <MarginContainer>
        <GoHomeBack destination="/" cta="go home" white={false} />
      </MarginContainer>
    </CodePage>
  );
};

const mapStateToProps = (state) => {
  const props = {
    codeProjectsLoading: state.codeProjects.loading,
    codeProjects: state.codeProjects.content,
    filteredCodeProjects: state.codeProjects.content.all,
    filterBy: state.codeProjects.filterBy,
  };

  return { ...state, ...props };
};

Code.propTypes = {
  codeProjectsLoading: bool.isRequired,
  filterBy: string.isRequired,
  filteredCodeProjects: array.isRequired,
  codeProjects: shape({
    topLinks: arrayOf(codeProjectPropTypes).isRequired,
    listLinks: arrayOf(codeProjectPropTypes).isRequired,
    bottomLinks: arrayOf(codeProjectPropTypes).isRequired,
    highlight: arrayOf(codeProjectPropTypes).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Code);
