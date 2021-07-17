const initState = {
  activeProjects: {},
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

const filterMusicProjects = (state, filterBy) => {
  console.log(filterBy);
  console.log(
    state.activeProjects.filter((project) => project.fields[filterBy])
  );
  return state.activeProjects.filter((project) => project.fields[filterBy]);
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
      filterMusicProjects(state, action.filterBy);
      return {
        ...state,
        activeProjects: filterMusicProjects(state, action.filterBy),
      };

    default:
      return state;
  }
};

export default MusicProjects;
