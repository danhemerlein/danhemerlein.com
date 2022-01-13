import contentfulClient from 'contentfulClient';
import orderSchema from 'utils/codeProjects/data/projects-order';
import { addOrder, compare } from 'utils/lib';

export const getCodeProjectsContent = () => {
  return (dispatch) => {
    dispatch(getCodeProjectsStarted());

    contentfulClient
      .getEntries({
        content_type: 'codeProject'
      })
      .then((entries) => {
        const { items } = entries;

        addOrder(items, orderSchema);

        const topLinks = items.filter((project) => project.fields.isTopLink);

        const listLinks = items.filter((project) => project.fields.isListLink);

        const bottomLinks = items.filter(
          (project) => project.fields.isBottomLink
        );

        topLinks.sort(compare);
        listLinks.sort(compare);
        bottomLinks.sort(compare);

        const payload = {
          all: items,
          topLinks,
          listLinks,
          bottomLinks
        };

        dispatch(getCodeProjectsSuccess(payload));
      })
      .catch((err) => {
        dispatch(getCodePorjectsFailure(err.message));
      });
  };
};

const getCodeProjectsStarted = () => ({
  type: 'GET_CODE_PROJECTS_CONTENT_STARTED'
});

const getCodeProjectsSuccess = (payload) => ({
  type: 'GET_CODE_PROJECTS_CONTENT_SUCCESS',
  payload
});

const getCodePorjectsFailure = (error) => ({
  type: 'GET_CODE_PROJECTS_CONTENT_FAILURE',
  error
});

export const filterCodeProjectsByType = (filterBy) => {
  return {
    type: 'FILTER_BY_TYPE',
    filterBy
  };
};
