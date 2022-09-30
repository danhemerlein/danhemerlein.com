import * as Yup from 'yup';

export const createPostDocumentSchema = Yup.object().shape({
  datePosted: Yup.string().length(10, 'wrong length').required('Required'),
  datePostedJS: Yup.string().required('Required'),
  genrePrimary: Yup.string().required('Required'),
  genreSecondary: Yup.string().required('Required'),
  link: Yup.string().required('Required'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  originalPoster: Yup.string().required('Required'),
  platform: Yup.string().required('Required'),
  tags: Yup.array.of(Yup.StringSchema()).required('Required'),
  id: Yup.string().required('Required')
});
