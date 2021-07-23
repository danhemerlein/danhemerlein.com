import _ from "lodash";

const initState = {
  activeProjects: {},
  filters: [],
  musicProjectsMessage: null,
  musicProjectsErrorCode: null,
  loading: false,
};

const sortMusicProjects = (state, sortBy) => {
  switch (sortBy) {
    case "default":
      const sorted = state.activeProjects.sort((a, b) => {
        return a.fields.order - b.fields.order;
      });
      return sorted;
    case "most-recent":
      const sortedRecently = state.activeProjects.sort((a, b) => {
        return b.fields.releaseDateFormat - a.fields.releaseDateFormat;
      });
      return sortedRecently;
    case "oldest":
      const sortedOldest = state.activeProjects.sort((a, b) => {
        return a.fields.releaseDateFormat - b.fields.releaseDateFormat;
      });
      return sortedOldest;
    default:
  }
};

const updateFilters = (state, filterBy) => {
  // if filter is not in the stateful filters array

  console.log("filterBy", filterBy);

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
    case "GET_MUSIC_PROJECTS_CONTENT_STARTED":
      return {
        ...state,
        loading: true,
      };

    case "GET_MUSIC_PROJECTS_CONTENT_SUCCESS":
      return {
        ...state,
        loading: false,
        activeProjects: action.payload,
        musicProjectsMessage: null,
        musicProjectsErrorCode: null,
      };

    case "GET_MUSIC_PROJECTS_CONTENT_FAILURE":
      return {
        ...state,
        loading: false,
        musicProjectsMessage: "there has been an error",
        musicProjectsErrorCode: "there has been an error",
      };

    case "SORT":
      return {
        ...state,
        activeProjects: sortMusicProjects(state, action.sortBy),
      };

    case "FILTER":
      return {
        ...state,
        filters: updateFilters(state, action.filterBy),
      };

    default:
      return state;
  }
};

export default MusicProjects;
