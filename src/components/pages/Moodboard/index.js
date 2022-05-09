import _ from 'lodash';
import { useState, useEffect, useRef } from 'react';
import GoHomeBack from 'components/base/GoHomeBack';
import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';

import { basePageTitle } from 'utils/constants/lib';
import { getMoodboardContent } from './queries';

import * as styles from './Moodboard.styles';

const Moodboard = () => {
  const [content, setContent] = useState([]);

  const divRef = useRef();

  const isInViewport = () => {
    if (!divRef.current) return false;
    const { top } = divRef.current.getBoundingClientRect();
    return top <= window.innerHeight;
  };

  useEffect(() => {
    document.title = `${basePageTitle} - moodboard`;

    const handleScroll = () => {
      const bool = isInViewport();
      if (bool) {
        window.scrollTo(0, 0);
      }
    };

    const fetchData = async () => {
      const content = await contentfulRequest(getMoodboardContent);

      setContent(content.data.moodboard.imagesCollection.items);
    };

    fetchData();

    const debouncedScroll = _.debounce(handleScroll, 250);
    window.addEventListener('scroll', debouncedScroll);
  }, []);

  const renderGalleryRow = (imageGroup, index) => {
    const imageOneURL = imageGroup[0].url;
    const imageOneTitle = imageGroup[0].title;
    let imageTwoURL;
    let imageTwoTitle;

    const twoImages = imageGroup.length === 2;

    if (twoImages) {
      imageTwoURL = imageGroup[1].url;
      imageTwoTitle = imageGroup[1].title;
    }

    return (
      <styles.MoodboardContent key={index}>
        <styles.MoodboardContentInner first>
          <styles.StyledImg src={imageOneURL} alt={imageOneTitle} />
        </styles.MoodboardContentInner>

        {twoImages ? (
          <styles.MoodboardContentInner second>
            <styles.StyledImg src={imageTwoURL} alt={imageTwoTitle} />
          </styles.MoodboardContentInner>
        ) : null}
      </styles.MoodboardContent>
    );
  };

  const imageMatrix = content.reduce((rows, image, index) => {
    return (
      (index % 2 === 0
        ? rows.push([image])
        : rows[rows.length - 1].push(image)) && rows
    );
  }, []);

  if (!content.length) {
    return <Loading />;
  }

  return (
    <styles.PageContainer wrap="wrap">
      {imageMatrix.map((imageGroup, index) => {
        return renderGalleryRow(imageGroup, index, imageMatrix);
      })}
      <styles.GoHomeContainer justify="center">
        <GoHomeBack destination="/" cta="go back" white={false} />
      </styles.GoHomeContainer>
      <div ref={divRef} />
    </styles.PageContainer>
  );
};

export default Moodboard;
