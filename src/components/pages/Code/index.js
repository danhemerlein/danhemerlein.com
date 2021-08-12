import { Accordion } from "@reach/accordion";
import GoHomeBack from "components/base/GoHomeBack";
import Loading from "components/other/Loading";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getCodeProjectsContent } from "store/actions/codeProjects";
import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import { above, blackBorder } from "styles/utilities";
import { remHelper } from "utils";
import RenderProjects from "./RenderProjects";

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

const MarkdownSpan = styled.span`
  font-family: "Courier", serif;
  color: ${({ theme }) => theme.yan.foreground};
`;

const MarginContainer = styled.div`
  margin-top: ${remHelper[16]};
`;

const Code = (props) => {
  const { codeProjectsLoading, codeProjects } = props;

  const { topLinks, listLinks, bottomLinks, highlight } = codeProjects;

  const codeProjectsLength = Object.keys(codeProjects).length;

  const dispatch = useDispatch();

  useEffect(() => {
    const loadContent = async () => {
      await dispatch(getCodeProjectsContent());
    };

    loadContent();
  }, [dispatch]);

  if (codeProjectsLoading === false && !codeProjectsLength) {
    return null;
  }
  if (codeProjectsLoading === true && !codeProjectsLength) {
    return <Loading />;
  }

  return (
    <CodePage items="center" justify="center" direction="column">
      <StyledAccordion collapsible multiple>
        <RenderProjects projects={topLinks} hasImage />
        <RenderProjects projects={highlight} highlight />

        <MarginContainer>
          <PageParagraph>
            In my spare time, I enjoy developing, hosting and maintaining
            websites for my musician friends. Below are few recent selections.
          </PageParagraph>

          <ListLinkContainer direction="column" wrap="wrap" items="center">
            <RenderProjects projects={listLinks} listLink hasImage={false} />
          </ListLinkContainer>
        </MarginContainer>

        <MarginContainer>
          <PageParagraph>
            Below are a few&nbsp;
            <MarkdownSpan>just for fun</MarkdownSpan>
            &nbsp; projects I'm working on in various states of completion:
          </PageParagraph>

          <RenderProjects projects={bottomLinks} hasImage={false} />
        </MarginContainer>
      </StyledAccordion>

      <MarginContainer>
        <GoHomeBack destination="/" cta="go home" white={false} />
      </MarginContainer>
    </CodePage>
  );
};

const mapStateToProps = (state) => {
  return {
    codeProjectsLoading: state.codeProjects.loading,
    codeProjects: state.codeProjects.content,
  };
};

export default connect(mapStateToProps)(Code);
