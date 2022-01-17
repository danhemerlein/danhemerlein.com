import _ from 'lodash';

const initState = {
  all: [],
  filters: [],
  sortBy: '',
  artists: [],
  artistFilter: '',
  musicProjectsMessage: null,
  musicProjectsErrorCode: null,
  loading: false
};

const updateFilters = (state, filterBy) => {
  const { filters } = state;

  if (!state.filters.includes(filterBy)) {
    filters.push(filterBy);
    return filters;
  }

  _.pull(filters, filterBy);

  return filters;
};

const MusicProjects = (state = initState, action) => {
  // || {} needed to shortcircut object destructuring
  //  use short circuit evaluation to supply a default if content is a falsy value,
  // usually undefined or null in this case.
  const { type, payload, sortBy, filterBy } = action || {};

  switch (type) {
    case 'GET_MUSIC_PROJECTS_CONTENT_STARTED':
      return {
        ...state,
        loading: true
      };

    case 'GET_MUSIC_PROJECTS_CONTENT_SUCCESS':
      return {
        ...state,
        loading: false,
        all: payload.all,
        artists: payload.artists,
        musicProjectsMessage: null,
        musicProjectsErrorCode: null
      };

    case 'GET_MUSIC_PROJECTS_CONTENT_FAILURE':
      return {
        ...state,
        loading: false,
        musicProjectsMessage: 'there has been an error',
        musicProjectsErrorCode: 'there has been an error'
      };

    case 'SORT':
      return {
        ...state,
        sortBy
      };

    case 'FILTER_BY_ROLE':
      return {
        ...state,
        filters: updateFilters(state, filterBy)
      };

    case 'FILTER_BY_ARTIST':
      return {
        ...state,
        artistFilter: filterBy
      };

    default:
      return { ...state };
  }
};

export default MusicProjects;
