import contentfulClient from "contentfulClient";
import addDateTime from "utils/musicProjects/addDateTime";
import addNewOrder from "utils/musicProjects/addNewOrder";
import addProjectHandle from "utils/musicProjects/addProjectHandle";
import createLinksObject from "utils/musicProjects/createLinksObject";
import getArtists from "utils/musicProjects/getArtists";

export const getMusicProjectsContent = () => {
  return (dispatch) => {
    dispatch(getMusicProjectsStarted());

    contentfulClient
      .getEntries({
        content_type: "musicProject",
      })
      .then(function (entries) {
        const activeEntries = entries.items;

        // add date time for front-end sorting
        addDateTime(activeEntries);

        // create project handle from song title
        addProjectHandle(activeEntries);

        // create an object of links
        createLinksObject(activeEntries);

        addNewOrder(activeEntries);

        // create an object of links
        const artists = getArtists(activeEntries);

        console.log(activeEntries);

        activeEntries.sort((a, b) => {
          return a.fields.newOrder - b.fields.newOrder;
        });

        const payload = { activeEntries, artists };

        dispatch(getMusicProjectsSuccess(payload));
      })
      .catch((err) => {
        dispatch(getMusicPorjectsFailure(err.message));
      });
  };
};

const getMusicProjectsStarted = () => ({
  type: "GET_MUSIC_PROJECTS_CONTENT_STARTED",
});

const getMusicProjectsSuccess = (payload) => ({
  type: "GET_MUSIC_PROJECTS_CONTENT_SUCCESS",
  payload,
});

const getMusicPorjectsFailure = (error) => ({
  type: "GET_MUSIC_PROJECTS_CONTENT_FAILURE",
  error,
});

export const sortMusicProjects = (sortBy) => {
  return {
    type: "SORT",
    sortBy,
  };
};

export const filterMusicProjectsByRole = (filterBy) => {
  return {
    type: "FILTER_BY_ROLE",
    filterBy,
  };
};

export const filterMusicProjectsByArtist = (filterBy) => {
  return {
    type: "FILTER_BY_ARTIST",
    filterBy,
  };
};
