const initState = {
  content: {
    topLinks: [],
    listLinks: [],
    bottomLinks: [],
    highlight: [],
  },
  codeProjectsMessage: null,
  codeProjectsErrorCode: null,
  loading: false,
};

const CodeProjects = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CODE_PROJECTS_CONTENT_STARTED':
      return {
        ...state,
        loading: true,
      };

    case 'GET_CODE_PROJECTS_CONTENT_SUCCESS':
      return {
        ...state,
        loading: false,
        content: action.payload,
        codeProjectsMessage: null,
        codeProjectsErrorCode: null,
      };
    case 'GET_CODE_PROJECTS_CONTENT_FAILURE':
      return {
        ...state,
        loading: false,
        codeProjectsMessage: 'there has been an error',
        codeProjectsErrorCode: 'there has been an error',
      };

    default:
      return state;
  }
};

export default CodeProjects;
