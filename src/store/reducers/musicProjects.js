import _ from 'lodash';

const initState = {
  activeProjects: {},
  filters: [],
  sortBy: '',
  artists: [],
  artistFilter: '',
  musicProjectsMessage: null,
  musicProjectsErrorCode: null,
  loading: false,
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
  switch (action.type) {
    case 'GET_MUSIC_PROJECTS_CONTENT_STARTED':
      return {
        ...state,
        loading: true,
      };

    case 'GET_MUSIC_PROJECTS_CONTENT_SUCCESS':
      console.log(action.payload.activeEntries);
      return {
        ...state,
        loading: false,
        activeProjects: action.payload.activeEntries,
        artists: action.payload.artists,
        musicProjectsMessage: null,
        musicProjectsErrorCode: null,
      };

    case 'GET_MUSIC_PROJECTS_CONTENT_FAILURE':
      return {
        ...state,
        loading: false,
        musicProjectsMessage: 'there has been an error',
        musicProjectsErrorCode: 'there has been an error',
      };

    case 'SORT':
      return {
        ...state,
        sortBy: action.sortBy,
      };

    case 'FILTER_BY_ROLE':
      return {
        ...state,
        filters: updateFilters(state, action.filterBy),
      };

    case 'FILTER_BY_ARTIST':
      return {
        ...state,
        artistFilter: action.filterBy,
      };

    default:
      return state;
  }
};

export default MusicProjects;
