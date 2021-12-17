import FullScreenHeight from 'components/other/FullScreenHeight';
import Loading from 'components/other/Loading';
import TipJar from 'components/other/TipJar';
import { arrayOf, bool, shape } from 'prop-types';
import { contentfulMetadata, contentfulSys, imagePropTypes } from 'propTypes';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getAboutPageContent } from 'store/actions/aboutPage';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities';
import { basePageTitle } from 'utils';
import HomePageBanner from './HomePageBanner';
import HomePageLink from './HomePageLink';
import Info from './Info';

const HomePage = ({ aboutPageLoading, aboutPage }) => {
  const dispatch = useDispatch();
  const content = aboutPage.length;

  useEffect(() => {
    document.title = basePageTitle;

    const loadContent = async () => {
      await dispatch(getAboutPageContent());
    };

    loadContent();
  }, [dispatch]);

  if (aboutPageLoading === false && !content) {
    return null;
  }
  if (aboutPageLoading === true && !content) {
    return <Loading />;
  }

  const aboutPageContent = aboutPage[0];
  const source = `https:${aboutPageContent.fields.heroImagePrime.fields.file.url}`;
  const sourcePrime = `https:${aboutPageContent.fields.heroImage.fields.file.url}`;

  const RelavtiveDiv = styled(FlexContainer)`
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
        <RelavtiveDiv direction="column" height="100%" width="100%">
          <HomePageBanner desktop mobile={false} />

          <BoxContainer>
            <Info source={source} sourcePrime={sourcePrime} />

            <HomePageLink
              destination="/code"
              text="code"
              position={1}
              blurb="work experience // freelance clients // passion projects // open source"
            />
            <HomePageLink
              destination="/music"
              text="music"
              position={2}
              blurb="production work // songwriting // performances"
            />

            <HomePageBanner mobile desktop={false} />

            <HomePageLink
              destination="/moodboard"
              text="mood"
              position={3}
              blurb="people // dreams // visions // places"
            />
            <HomePageLink
              destination="/about"
              text="more"
              position={4}
              blurb="more // more // more // more"
            />
          </BoxContainer>
        </RelavtiveDiv>
        <TipJar />
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

HomePage.propTypes = {
  aboutPageLoading: bool.isRequired,
  aboutPage: arrayOf(
    shape({
      fields: shape({
        heroImage: imagePropTypes.isRequired,
        heroImagePrime: imagePropTypes.isRequired,
      }).isRequired,
      metadata: contentfulMetadata.isRequired,
      sys: contentfulSys.isRequired,
    })
  ).isRequired,
};

export default connect(mapStateToProps)(HomePage);
