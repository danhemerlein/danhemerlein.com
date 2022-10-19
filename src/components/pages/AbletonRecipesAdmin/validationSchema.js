import * as Yup from 'yup';

export const createPostDocumentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'too short!')
    .max(50, 'too long!')
    .required('required'),
  link: Yup.string().url('must be a url').required('required'),
  id: Yup.string().required('required'),
  uid: Yup.string().required('required'),
  datePosted: Yup.string().length(10, 'wrong length'),
  datePostedJS: Yup.string().required('required'),
  genrePrimary: Yup.string(),
  genreSecondary: Yup.string(),
  type: Yup.string().required('required'),
  tags: Yup.array(),
  originalPoster: Yup.string(),
  platform: Yup.string()
});
