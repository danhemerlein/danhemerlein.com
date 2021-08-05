export const setSiteTheme = (mode) => ({ type: "SET_SITE_THEME", mode });
export const toggleMobileNav = (payload) => {
  return {
    type: "TOGGLE_MOBILE_NAV",
    payload,
  };
};
