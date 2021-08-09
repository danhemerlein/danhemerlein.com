import FullScreenHeight from "components/other/FullScreenHeight";
import Loading from "components/other/Loading";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getAboutPageContent } from "store/actions/aboutPage";
import styled from "styled-components";
import { FlexContainer } from "styles/elements";
import { above } from "styles/utilities";
import HomePageBanner from "./HomePageBanner";
import HomePageLink from "./HomePageLink";
import Info from "./Info";

const HomePage = ({ aboutPageLoading, aboutPage }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadContent = async () => {
      await dispatch(getAboutPageContent());
    };

    loadContent();
  }, [dispatch]);

  if (aboutPageLoading === false && !aboutPage.length) {
    return null;
  }
  if (aboutPageLoading === true && !aboutPage.length) {
    return <Loading />;
  }

  const aboutPageContent = aboutPage[0];
  const source = `https:${aboutPageContent.fields.heroImage.fields.file.url}`;
  const sourcePrime = `https:${aboutPageContent.fields.heroImagePrime.fields.file.url}`;

  const HomeContainer = styled(FlexContainer)`
    position: relative;
  `;

  const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    ${above.desktop`
      flex-wrap: wrap;
      flex-direction: row;
    `}
  `;

  return (
    <>
      <FullScreenHeight unsetBreakpoint="desktop">
        <HomeContainer direction="column" height="100%" width="100%">
          <HomePageBanner desktop />

          <BoxContainer>
            <Info source={source} sourcePrime={sourcePrime} />

            <HomePageLink destination="/code" text="code" position={1} />
            <HomePageLink destination="/music" text="music" position={2} />

            <HomePageBanner mobile />

            <HomePageLink destination="/moodboard" text="mood" position={3} />
            <HomePageLink destination="/about" text="more" position={4} />
          </BoxContainer>
        </HomeContainer>
      </FullScreenHeight>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    aboutPageLoading: state.aboutPage.loading,
    aboutPage: state.aboutPage.content,
  };
};

export default connect(mapStateToProps)(HomePage);
