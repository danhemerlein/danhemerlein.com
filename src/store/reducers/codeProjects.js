const initState = {
  content: {
    all: [],
    topLinks: [],
    listLinks: [],
    bottomLinks: []
  },
  filterBy: '',
  codeProjectsMessage: null,
  codeProjectsErrorCode: null,
  loading: false
};

const CodeProjects = (state = initState, action) => {
  const { type, payload, filterBy } = action;
  switch (type) {
    case 'GET_CODE_PROJECTS_CONTENT_STARTED':
      return {
        ...state,
        loading: true
      };

    case 'GET_CODE_PROJECTS_CONTENT_SUCCESS':
      return {
        ...state,
        loading: false,
        content: payload,
        codeProjectsMessage: null,
        codeProjectsErrorCode: null
      };
    case 'GET_CODE_PROJECTS_CONTENT_FAILURE':
      return {
        ...state,
        loading: false,
        codeProjectsMessage: 'there has been an error',
        codeProjectsErrorCode: 'there has been an error'
      };
    case 'FILTER_BY_TYPE':
      return {
        ...state,
        filterBy
      };

    default:
      return { ...state };
  }
};

export default CodeProjects;
