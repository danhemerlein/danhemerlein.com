import { arrayOf, elementType, number, shape, string } from 'prop-types';

/**
 * Prop-types for passing Components
 */
export const componentPropType = elementType;

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
  fields: shape({
    file: cotentufulImageFile.isRequired,
    title: string,
  }).isRequired,

  metadata: contentfulMetadata.isRequired,

  sys: contentfulFieldSys.isRequired,
});
