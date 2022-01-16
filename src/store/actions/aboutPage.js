import contentfulClient from 'contentfulClient';

export const getAboutPageContent = () => {
  return (dispatch) => {
    dispatch(getAboutPageStarted());

    contentfulClient
      .getEntries({
        content_type: 'aboutPage'
      })
      .then((entries) => {
        dispatch(getAboutPageSuccess(entries.items));
      })
      .catch((err) => {
        dispatch(getAboutPageFailure(err.message));
      });
  };
};

const getAboutPageStarted = () => {
  return { type: 'GET_ABOUT_PAGE_CONTENT_STARTED' };
};

const getAboutPageSuccess = (payload) => {
  return {
    type: 'GET_ABOUT_PAGE_CONTENT_SUCCESS',
    payload
  };
};

const getAboutPageFailure = (error) => {
  return {
    type: 'GET_ABOUT_PAGE_CONTENT_FAILURE',
    error
  };
};
