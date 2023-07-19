const initState = {
  mobileNavOpen: false
}

const MobileNav = (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_MOBILE_NAV':
      return {
        ...state,
        mobileNavOpen: action.payload
      }
    default:
      return { ...state }
  }
}

export default MobileNav
