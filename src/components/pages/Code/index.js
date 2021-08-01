import { Accordion } from "@reach/accordion";
import GoHomeBack from "components/base/GoHomeBack";
import Loading from "components/other/Loading";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import { above, blackBorder } from "styles/utilities";
import { remHelper } from "utils";
import { getCodeProjectsContent } from "../../../store/actions/codeProjects";
import CodeProject from "./CodeProject";
import HighlightCodeProject from "./HighlightCodeProject";
import ListLinkCodeProject from "./ListLinkCodeProject";

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
    padding-top: ${remHelper[32]};
    border: ${blackBorder};
  `}
`;

const MarkdownSpan = styled.span`
  font-family: "Courier", serif;
  color: ${({ theme }) => theme.light.yanRed};
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
        {topLinks.map((project, topLinkKey) => {
          const { title } = project.fields;
          return (
            <CodeProject
              project={project}
              index={topLinkKey}
              key={title}
              hasImage
            />
          );
        })}

        {highlight.map((project, projectKey) => {
          const { title } = project.fields;

          return (
            <HighlightCodeProject
              project={project}
              index={projectKey}
              key={title}
              gradientRotation="45deg"
              gradientStart="#fff"
              gradientEnd="#ff6ad5"
            />
          );
        })}

        <MarginContainer>
          <PageParagraph>
            In my spare time, I enjoy developing, hosting and maintaining
            websites for my musician friends. Below are few recent selections.
          </PageParagraph>

          <ListLinkContainer
            direction="column"
            wrap="wrap"
            items="center"
            index={1}
          >
            {listLinks.map((project, key) => {
              return (
                <ListLinkCodeProject
                  project={project}
                  index={key}
                  key={project}
                />
              );
            })}
          </ListLinkContainer>
        </MarginContainer>

        <MarginContainer>
          <PageParagraph>
            Below are a few&nbsp;
            <MarkdownSpan>just for fun</MarkdownSpan>
            &nbsp; projects I'm working on in various states of completion:
          </PageParagraph>
          {bottomLinks.map((project, key) => {
            return (
              <CodeProject
                project={project}
                index={key}
                key={project}
                hasImage={false}
              />
            );
          })}
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
