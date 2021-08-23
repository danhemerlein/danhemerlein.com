import contentfulClient from "../../contentfulClient";

export const getCodeProjectsContent = () => {
  return (dispatch) => {
    dispatch(getCodeProjectsStarted());

    contentfulClient
      .getEntries({
        content_type: "codeProject",
      })
      .then((entries) => {
        const activeEntries = entries.items.filter(
          (project) => project.fields.archived !== true
        );

        const topLinks = activeEntries.filter(
          (project) => project.fields.isTopLink && !project.fields.highlight
        );
        const listLinks = activeEntries.filter(
          (project) => project.fields.isListLink && !project.fields.highlight
        );
        const bottomLinks = activeEntries.filter(
          (project) => project.fields.isBottomLink && !project.fields.highlight
        );
        const highlight = activeEntries.filter(
          (project) => project.fields.highlight
        );

        const compare = (a, b) => {
          return a.fields.order - b.fields.order;
        };

        topLinks.sort(compare);
        listLinks.sort(compare);
        bottomLinks.sort(compare);

        const payload = {
          topLinks,
          listLinks,
          bottomLinks,
          highlight,
        };

        dispatch(getCodeProjectsSuccess(payload));
      })
      .catch((err) => {
        dispatch(getCodePorjectsFailure(err.message));
      });
  };
};

const getCodeProjectsStarted = () => ({
  type: "GET_CODE_PROJECTS_CONTENT_STARTED",
});

const getCodeProjectsSuccess = (payload) => ({
  type: "GET_CODE_PROJECTS_CONTENT_SUCCESS",
  payload,
});

const getCodePorjectsFailure = (error) => ({
  type: "GET_CODE_PROJECTS_CONTENT_FAILURE",
  error,
});
