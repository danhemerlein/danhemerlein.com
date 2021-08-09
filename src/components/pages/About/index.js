import FullScreenHeight from "components/other/FullScreenHeight";
import Loading from "components/other/Loading";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getAboutPageContent } from "store/actions/aboutPage";
import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import { above } from "styles/utilities";
import { remHelper } from "utils";
import ToolTip from "./ToolTip";

const AboutPage = ({ aboutPageLoading, aboutPage }) => {
  const dispatch = useDispatch();
  const [toolTipOpen, setToolTipOpen] = useState(false);

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

  const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    ${above.tablet`
      height: 75%;
    `}

    ${above.desktop`
      flex-direction: row;
    `}
  `;

  const ImageContainer = styled(FlexContainer)`
    width: 100%;
    justify-content: center;

    ${above.tablet`
      width: 100%;
    `}

    ${above.desktop`
      justify-content: flex-end;
      width: 50%;
      padding-right: ${remHelper[8]};
    `}
  `;

  const BackgroundImage = styled.div`
    width: 100%;
    height: 420px;
    background-position: center;
    background-size: cover;
    transition: opacity 0.25s ease-in-out;

    ${({ imageSRC }) => `background-image: url(${imageSRC});`};
    ${({ index }) => index === 1 && `opacity: 0;`};

    &:hover {
      ${({ index }) => index === 1 && `opacity: 1;`};
      ${({ index }) => index === 0 && `opacity: 0;`};
    }

    ${above.tablet`
      width: 50%;
      ${({ index }) => index === 1 && `width: 100%;`};

    `}

    ${above.desktop`
      width: 352px;
    `}
  `;

  const TextContainer = styled(FlexContainer)`
    width: 100%;
    margin-top: ${remHelper[16]};

    ${above.tablet`
      width: 75%;
      margin-left: auto;
      margin-right: auto;
    `}

    ${above.desktop`
      margin-top: 0;
      width: 50%;
    `}
  `;

  const TextContainerInner = styled.div`
    position: relative;
    ${above.desktop`
      max-width: 75%;
      padding-left: ${remHelper[8]};
    `}
  `;

  const StyledP = styled(P)`
    line-height: 1.24;

    &:not(:first-of-type) {
      margin: ${remHelper[8]} 0;
    }
  `;

  const toolTipToggle = () => {
    setToolTipOpen(!toolTipOpen);
  };

  return (
    <FullScreenHeight>
      <ContentContainer>
        <ImageContainer items="center">
          <BackgroundImage imageSRC={source}>
            <BackgroundImage imageSRC={sourcePrime} index={1} />
          </BackgroundImage>
        </ImageContainer>

        <TextContainer justify="center" items="flex-start" direction="column">
          <TextContainerInner>
            <StyledP>&emsp;hey I'm dan (he/him),</StyledP>
            <button type="button" onClick={toolTipToggle}>
              tip me brother
            </button>
            <ToolTip toolTipOpen={toolTipOpen} />

            <StyledP>
              &emsp;&emsp;I'm a web engineer and music producer based in
              Brooklyn, New York.
            </StyledP>

            <StyledP>
              &emsp;&emsp;As a coder, I'm really into JavaScript, e-commerce,
              CSS, accessibility, developer experience and learning something
              new every day. I find a lot of joy in the process of achieving a
              technical goal.
            </StyledP>

            <StyledP>
              &emsp;&emsp;As a musician, my focus is writing and producing songs
              both under my own projects and for others. I also play bass guitar
              in a few indie bands around Brooklyn.
            </StyledP>

            <StyledP>
              &emsp;&emsp;In my non-code/non-music time, I journal, read,&nbsp;
              &nbsp;moodboard, jog in McCarren Park and aimlessly ride my bike
              around the city.
            </StyledP>

            <StyledP>
              &emsp;&emsp;I write code and make music because I can't not and
              it's super trill.
            </StyledP>
          </TextContainerInner>
        </TextContainer>
      </ContentContainer>
    </FullScreenHeight>
  );
};

const mapStateToProps = (state) => {
  return {
    aboutPageLoading: state.aboutPage.loading,
    aboutPage: state.aboutPage.content,
  };
};

export default connect(mapStateToProps)(AboutPage);
