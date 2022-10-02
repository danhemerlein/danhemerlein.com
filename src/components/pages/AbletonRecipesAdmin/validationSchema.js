import * as Yup from 'yup';

export const createPostDocumentSchema = Yup.object().shape({
  datePosted: Yup.string().length(10, 'wrong length').required('required'),
  datePostedJS: Yup.string().required('required'),
  genrePrimary: Yup.string().required('required'),
  genreSecondary: Yup.string().required('required'),
  link: Yup.string().url('must be a url').required('required'),
  name: Yup.string()
    .min(2, 'too short!')
    .max(50, 'too long!')
    .required('required'),
  originalPoster: Yup.string().required('required'),
  platform: Yup.string().required('required'),
  // tags: Yup.array().of(Yup.string()).required('required'),
  id: Yup.string().required('required')
});
