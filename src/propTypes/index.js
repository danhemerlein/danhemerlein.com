import {
  arrayOf,
  bool,
  element,
  elementType,
  instanceOf,
  number,
  shape,
  string,
} from 'prop-types';

/**
 * Prop-types for passing Components
 */
export const singleComponentPropType = elementType;
export const componentPropType = element;

export const sysTypes = shape({
  sys: shape({
    type: string.isRequired,
    linkType: string.isRequired,
    id: string.isRequired,
  }),
});

export const contentfulMetadata = shape({
  tags: arrayOf(string).isRequired,
});

export const contentfulSys = shape({
  contentType: shape({
    sys: sysTypes.isRequired,
  }).isRequired,
  createdAt: string.isRequired,
  environment: sysTypes.isRequired,
  id: string.isRequired,
  locale: string.isRequired,
  revision: number.isRequired,
  space: sysTypes.isRequired,
  type: string.isRequired,
  updatedAt: string.isRequired,
});

export const cotentufulImageFile = shape({
  contentType: string.isRequired,
  details: shape({
    size: number.isRequired,
    image: shape({
      width: number.isRequired,
      height: number.isRequired,
    }).isRequired,
  }).isRequired,
  fileName: string.isRequired,
  url: string.isRequired,
});

export const contentfulFieldSys = shape({
  createdAt: string.isRequired,
  environment: sysTypes.isRequired,
  id: string.isRequired,
  locale: string.isRequired,
  revision: number.isRequired,
  space: sysTypes.isRequired,
  type: string.isRequired,
  updatedAt: string.isRequired,
});

export const imagePropTypes = shape({
  url: string.isRequired,
  title: string,
});

export const descriptionContentPropTypes = shape({
  data: shape({}),
  nodeType: string,
  content: arrayOf(
    shape({
      data: shape({}),
      marks: arrayOf(shape({})),
      nodeType: string,
      value: string,
      content: arrayOf(
        shape({
          data: shape({}),
          marks: arrayOf(shape({})),
          nodeType: string,
          value: string,
        })
      ),
    })
  ),
});

// const codeProjectFieldsPropTypes = shape({
//   description: shape({
//     data: shape({}).isRequired,
//     content: arrayOf(descriptionContentPropTypes),
//     nodeType: string.isRequired,
//   }),
//   image: imagePropTypes,
//   isBottomLink: bool,
//   isListLink: bool,
//   isTopLink: bool,
//   link: string,
//   order: number,
//   timelineLaunchDate: string,
//   title: string.isRequired,
// });

export const codeProjectPropTypes = shape({
  description: shape({
    json: descriptionContentPropTypes,
  }),
  image: imagePropTypes,
  isBottomLink: bool,
  isListLink: bool,
  isTopLink: bool,
  link: string,
  order: number,
  timelineLaunchDate: string,
  title: string.isRequired,
  highight: bool,

  // metadata: contentfulMetadata.isRequired,

  // sys: contentfulFieldSys.isRequired
});

const musicProjectFieldsPropTypes = shape({
  artist: string.isRequired,
  artistWebsite: string,
  artwork: imagePropTypes,
  title: string.isRequired,
  handle: string.isRequired,
  links: arrayOf(
    shape({
      link: string.isRequired,
      title: string.isRequired,
    })
  ),
  newOrder: number,
  order: number,
  performed: bool,
  produced: bool,
  releaseDate: string.isRequired,
  releaseDateFormat: instanceOf(Date),
  role: string.isRequired,
  wrote: bool,
  amazon: string,
  apple: string,
  deezer: string,
  googlePlay: string,
  napster: string,
  soundcloud: string,
  spotify: string,
  tidal: string,
});

export const musicProjectPropTypes = shape({
  fields: musicProjectFieldsPropTypes.isRequired,
  metadata: contentfulMetadata.isRequired,
  sys: contentfulFieldSys.isRequired,
});
