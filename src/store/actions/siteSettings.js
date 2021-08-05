export const setSiteTheme = (mode) => ({ type: "SET_SITE_THEME", mode });
export const toggleMobileNav = (payload) => {
  console.log("running toggle mobile nav action");
  return {
    type: "TOGGLE_MOBILE_NAV",
    payload,
  };
};
