const initState = {
  content: [],
  aboutPageMessage: null,
  aboutPageErrorCode: null,
  loading: false
};

const aboutPage = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ABOUT_PAGE_CONTENT_STARTED':
      return {
        ...state,
        loading: true
      };

    case 'GET_ABOUT_PAGE_CONTENT_SUCCESS':
      return {
        ...state,
        loading: false,
        content: action.payload,
        aboutPageMessage: null,
        aboutPageErrorCode: null
      };
    case 'GET_ABOUT_PAGE_CONTENT_FAILURE':
      return {
        ...state,
        loading: false,
        aboutPageMessage: 'there has been an error',
        aboutPageErrorCode: 'there has been an error'
      };

    default:
      return { ...state };
  }
};

export default aboutPage;
