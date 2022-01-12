const initState = {
  mode: 'light'
};

const SiteSettings = (action, state = initState) => {
  const { type, mode } = action;

  switch (type) {
    case 'SET_SITE_THEME':
      return {
        ...state,
        mode
      };
    default:
      return state;
  }
};

export default SiteSettings;
