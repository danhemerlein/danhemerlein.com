import GoHomeBack from "components/base/GoHomeBack";
import Loading from "components/other/Loading";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  filterMusicArtists,
  filterProjects,
  sortProjects,
} from "store/selectors";
import styled from "styled-components";
import { FlexContainer } from "styles/elements";
import { above } from "styles/utilities";
import { remHelper } from "utils";
import MusicHero from "./MusicHero";
import MusicSort from "./MusicSort";
import ProjectPreview from "./ProjectPreview";

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

const Music = ({ loading, projects }) => {
  const content = projects.length;

  console.log("music page");
  console.log(loading);
  console.log(projects);

  useEffect(() => {
    console.log("music page save me");
  }, []);

  if (loading === false && !content) {
    return null;
  }
  if (loading === true && !content) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <MusicHero />
      <FlexContainer wrap="wrap" items="center" justify="center">
        <ProjectPreviewContainer wrap="wrap" items="center" justify="center">
          <MusicSort />

          {projects.map((project, index) => {
            const { title } = project.fields;
            return (
              <ProjectPreview index={index} project={project} key={title} />
            );
          })}

          <GoHomeContainer justify="center">
            <GoHomeBack destination="/" cta="go back" white />
          </GoHomeContainer>
        </ProjectPreviewContainer>
      </FlexContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  let propsProjects = state.musicProjects.activeProjects;

  if (state.musicProjects.filters.length) {
    propsProjects = filterProjects(state.musicProjects.filters, propsProjects);
  }

  if (state.musicProjects.sortBy.length) {
    propsProjects = sortProjects(state.musicProjects.sortBy, propsProjects);
  }

  if (state.musicProjects.artistFilter.length) {
    propsProjects = filterMusicArtists(
      state.musicProjects.artistFilter,
      propsProjects
    );
  }

  const props = {
    loading: state.musicProjects.loading,
    projects: propsProjects,
  };
  return { ...state, ...props };
};

export default connect(mapStateToProps)(Music);
