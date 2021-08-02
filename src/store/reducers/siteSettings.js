const initState = {
  mode: "light",
};

const SiteSettings = (state = initState, action) => {
  switch (action.type) {
    case "SET_SITE_THEME":
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
};

export default SiteSettings;
