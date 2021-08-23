const initState = {
  content: [],
  moodboardMessage: null,
  moodboardErrorCode: null,
  loading: false,
};

const Moodboard = (state = initState, action) => {
  switch (action.type) {
    case 'GET_MOODBOARD_CONTENT_STARTED':
      return {
        ...state,
        loading: true,
      };

    case 'GET_MOODBOARD_CONTENT_SUCCESS':
      return {
        ...state,
        loading: false,
        content: action.payload,
        moodboardMessage: null,
        moodboardErrorCode: null,
      };
    case 'GET_MOODBOARD_CONTENT_FAILURE':
      return {
        ...state,
        loading: false,
        moodboardMessage: 'there has been an error',
        moodboardErrorCode: 'there has been an error',
      };

    default:
      return state;
  }
};

export default Moodboard;
