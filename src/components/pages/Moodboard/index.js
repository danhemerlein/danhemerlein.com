import { useState, useEffect } from 'react';
import { reactContentfulImageURLHelper, altTextHelper } from 'utils/lib';
import GoHomeBack from 'components/base/GoHomeBack';
import Loading from 'components/other/Loading';
import ReactContentfulImage from 'react-contentful-image';
import { contentfulRequest } from 'contentfulClient';

import { basePageTitle } from 'utils/constants/lib';
import { getMoodboardContent } from './queries';

import * as styles from './Moodboard.styles';

const Moodboard = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    document.title = `${basePageTitle} - moodboard`;

    const fetchData = async () => {
      const content = await contentfulRequest(getMoodboardContent);

      setContent(content.moodboard.imagesCollection.items);
    };

    fetchData();
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

    const imageSizes = [
      {
        mediaQuery: 'xs',
        params: { w: 687 }
      },
      {
        mediaQuery: 'sm',
        params: { w: 488 }
      },
      {
        mediaQuery: 'md',
        params: { w: 696 }
      },
      {
        mediaQuery: 'lg',
        params: { w: 1196 }
      }
    ];

    const urlOneWash = reactContentfulImageURLHelper(imageOneURL);
    const urlTwoWash = reactContentfulImageURLHelper(imageTwoURL);

    return (
      <styles.MoodboardContent key={index}>
        <styles.MoodboardContentInner>
          <ReactContentfulImage
            src={urlOneWash.replace(window.location.origin, '')}
            alt={altTextHelper(imageOneTitle)}
            sizes={imageSizes}
            loading={index > 7 ? 'lazy' : ''}
          />
        </styles.MoodboardContentInner>

        {twoImages ? (
          <styles.MoodboardContentInner>
            <ReactContentfulImage
              src={urlTwoWash.replace(window.location.origin, '')}
              alt={altTextHelper(imageTwoTitle)}
              sizes={imageSizes}
              loading={index > 7 ? 'lazy' : ''}
            />
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
    </styles.PageContainer>
  );
};

export default Moodboard;
