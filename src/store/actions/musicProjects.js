import contentfulClient from 'contentfulClient';
import addDateTime from 'utils/musicProjects/addDateTime';
import { addOrder, compare } from 'utils';
import addProjectHandle from 'utils/musicProjects/addProjectHandle';
import createLinksObject from 'utils/musicProjects/createLinksObject';
import getArtists from 'utils/musicProjects/getArtists';
import orderSchema from 'utils/musicProjects/data/projects-order';

export const getMusicProjectsContent = () => {
  return (dispatch) => {
    dispatch(getMusicProjectsStarted());

    contentfulClient
      .getEntries({
        content_type: 'musicProject',
      })
      .then((entries) => {
        const { items } = entries;

        // add date time for front-end sorting
        addDateTime(items);

        // create project handle from song title
        addProjectHandle(items);

        // create an object of links
        createLinksObject(items);

        addOrder(items, orderSchema);

        // create an object of links
        const artists = getArtists(items);

        items.sort(compare);

        const payload = { all: items, artists };

        dispatch(getMusicProjectsSuccess(payload));
      })
      .catch((err) => {
        dispatch(getMusicPorjectsFailure(err.message));
      });
  };
};

const getMusicProjectsStarted = () => ({
  type: 'GET_MUSIC_PROJECTS_CONTENT_STARTED',
});

const getMusicProjectsSuccess = (payload) => ({
  type: 'GET_MUSIC_PROJECTS_CONTENT_SUCCESS',
  payload,
});

const getMusicPorjectsFailure = (error) => ({
  type: 'GET_MUSIC_PROJECTS_CONTENT_FAILURE',
  error,
});

export const sortMusicProjects = (sortBy) => {
  return {
    type: 'SORT',
    sortBy,
  };
};

export const filterMusicProjectsByRole = (filterBy) => {
  return {
    type: 'FILTER_BY_ROLE',
    filterBy,
  };
};

export const filterMusicProjectsByArtist = (filterBy) => {
  return {
    type: 'FILTER_BY_ARTIST',
    filterBy,
  };
};
