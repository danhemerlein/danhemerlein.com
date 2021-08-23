const initState = {
  mode: "light",
  mobileNavOpen: false,
};

const SiteSettings = (state = initState, action) => {
  switch (action.type) {
    case "SET_SITE_THEME":
      return {
        ...state,
        mode: action.mode,
      };

    case "TOGGLE_MOBILE_NAV":
      return {
        ...state,
        mobileNavOpen: action.payload,
      };
    default:
      return state;
  }
};

export default SiteSettings;
