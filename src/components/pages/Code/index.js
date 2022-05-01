import { Accordion } from '@reach/accordion';
import GoHomeBack from 'components/base/GoHomeBack';
import { string } from 'prop-types';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { filterCodeProjects } from 'store/selectors';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import { remHelper } from 'utils/remHelper';
import { contentfulRequest } from 'contentfulClient';
import CodeSort from './CodeSort';
import { ListLinkContainer } from './containers';
// import FilteredProjects from './FilteredProjects';
import RenderProjects from './RenderProjects';

import { getBottomLinks, getTopLinks, getListLinks } from './queries';

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

const MarginContainer = styled.div`
  margin-top: ${remHelper[16]};
`;

const Code = ({ filterBy }) => {
  const [topLinks, setTopLinks] = useState([]);
  const [bottomLinks, setBottomLinks] = useState([]);
  const [listLinks, setListLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const topLinks = await contentfulRequest(getTopLinks);
      const bottomLinks = await contentfulRequest(getBottomLinks);
      const listLinks = await contentfulRequest(getListLinks);

      setTopLinks(topLinks.data.codeProjectCollection.items);
      setBottomLinks(bottomLinks.data.codeProjectCollection.items);
      setListLinks(listLinks.data.codeProjectCollection.items);
    };

    fetchData();

    document.title = `${basePageTitle} - code`;
  }, []);

  return (
    <CodePage items="center" justify="center" direction="column">
      <CodeSort />

      {!filterBy.length ? (
        <StyledAccordion collapsible multiple>
          <RenderProjects projects={topLinks} />

          <MarginContainer>
            <PageParagraph>
              In my spare time, I develop websites for my musician friends.
              Below are few recent selections.
            </PageParagraph>

            <ListLinkContainer direction="column" wrap="wrap" items="center">
              <RenderProjects projects={listLinks} listLink />
            </ListLinkContainer>
          </MarginContainer>

          <MarginContainer>
            <PageParagraph>
              Below are a few more passion projects in various states of
              completion:
            </PageParagraph>

            <RenderProjects projects={bottomLinks} />
          </MarginContainer>
        </StyledAccordion>
      ) : (
        {
          /* <StyledAccordion collapsible multiple>
          <FilteredProjects data={filteredProjects} filterBy={filterBy} />
        </StyledAccordion> */
        }
      )}

      <MarginContainer>
        <GoHomeBack destination="/" cta="go home" white={false} />
      </MarginContainer>
    </CodePage>
  );
};

const mapStateToProps = (state) => {
  const props = {
    filterBy: state.codeProjects.filterBy,
  };

  return { ...state, ...props };
};

Code.propTypes = {
  filterBy: string.isRequired,
};

export default connect(mapStateToProps)(Code);
