import GoHomeBack from "components/base/GoHomeBack";
import Loading from "components/other/Loading";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { sortMusicProjects } from "store/actions/musicProjects";
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

  ${above.tablet`
    flex-direction: row;
  `}
`;

const GoHomeContainer = styled(FlexContainer)`
  width: 100%;
`;

const Music = ({ loading, projects }) => {
  const dispatch = useDispatch();

  function handleSortChange(event) {
    dispatch(sortMusicProjects(event.target.value));

    // if (event.target.value === "") {
    //   const sorted = projects.sort((a, b) => {
    //     return a.fields.order - b.fields.order;
    //   });

    // } else if (event.target.value === "most-recent") {
    //   const sorted = projects.sort((a, b) => {
    //     return b.fields.releaseDateFormat - a.fields.releaseDateFormat;
    //   });

    // } else if (event.target.value === "oldest") {
    //   const sorted = projects.sort((a, b) => {
    //     return a.fields.releaseDateFormat - b.fields.releaseDateFormat;
    //   });

    // } else {
    //   const sorted = projects.sort((a, b) => {
    //     return a.fields.order - b.fields.order;
    //   });

    //   const filtered = sorted.filter((project) => {
    //     return project.fields[event.target.value];
    //   });

    // }
  }

  function handleFilterChange() {}

  const content = projects.length;

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
          <MusicSort
            handleFilterChange={handleFilterChange}
            handleSortChange={handleSortChange}
          />

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
  console.log(state.musicProjects.activeProjects[0].fields.title);
  const props = {
    loading: state.musicProjects.loading,
    projects: state.musicProjects.activeProjects,
  };
  return { ...state, ...props };

  // return {
  //   loading: state.musicProjects.loading,
  //   projects: state.musicProjects.activeProjects,
  // };
};

export default connect(mapStateToProps)(Music);
