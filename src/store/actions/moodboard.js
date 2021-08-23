import contentfulClient from "../../contentfulClient";

export const getMoodboardContent = () => {
  return (dispatch) => {
    dispatch(getMoodboardStarted());

    contentfulClient
      .getEntries({
        content_type: "moodboard",
      })
      .then((entries) => {
        dispatch(getMoodboardSuccess(entries.items));
      })
      .catch((err) => {
        dispatch(getMoodboardFailure(err.message));
      });
  };
};

const getMoodboardStarted = () => ({ type: "GET_MOODBOARD_CONTENT_STARTED" });

const getMoodboardSuccess = (payload) => ({
  type: "GET_MOODBOARD_CONTENT_SUCCESS",
  payload,
});

const getMoodboardFailure = (error) => ({
  type: "GET_MOODBOARD_CONTENT_FAILURE",
  error,
});
