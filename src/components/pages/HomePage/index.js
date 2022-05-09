import FullScreenHeight from 'components/other/FullScreenHeight';
import Loading from 'components/other/Loading';
import { useEffect, useState } from 'react';
import { contentfulRequest } from 'contentfulClient';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { basePageTitle } from 'utils/constants/lib';
import { getAboutPageContent } from '../About/queries';
import HomePageBanner from './HomePageBanner';
import HomePageLink from './HomePageLink';
import Info from './Info';

const HomePage = () => {
  const [heroImage, setHeroImage] = useState({});
  const [heroImagePrime, setHeroImagePrime] = useState({});

  useEffect(() => {
    document.title = basePageTitle;

    const fetchData = async () => {
      const content = await contentfulRequest(getAboutPageContent);

      setHeroImage(content.data.aboutPage.heroImage);
      setHeroImagePrime(content.data.aboutPage.heroImagePrime);
    };

    fetchData();
  }, []);

  if (!heroImage.url && !heroImagePrime.url) {
    return <Loading />;
  }

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
    <FullScreenHeight unsetBreakpoint="desktop">
      <RelavtiveDiv direction="column" height="100%" width="100%">
        <HomePageBanner desktop mobile={false} />

        <BoxContainer>
          <Info source={heroImage?.url} sourcePrime={heroImagePrime.url} />

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
            blurb="production // songwriting // performances"
          />

          <HomePageBanner mobile desktop={false} />

          <HomePageLink
            destination="/moodboard"
            text="mood"
            position={3}
            blurb="people // places // dreams // visions"
          />

          <HomePageLink
            destination="/about"
            text="more"
            position={4}
            blurb="more // more // more // more"
          />
        </BoxContainer>
      </RelavtiveDiv>
    </FullScreenHeight>
  );
};

export default HomePage;
