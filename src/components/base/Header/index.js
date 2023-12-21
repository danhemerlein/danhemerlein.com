import Menu from 'components/navigation/Menu'
import MobileNav from 'components/navigation/MobileNav'
import Overlay from 'components/navigation/Overlay'
import { bool, func } from 'prop-types'
import { useState } from 'react'
import { FlexContainer } from 'styles/elements'

const Header = ({
  mobileNavOpen,
  toggleMobileNav,

  closeAllModals,
  tipJarOpen
}) => {
  const [activeMobileNavTrap, setActiveMobileTrap] = useState(false)

  const mountNavTrap = () => {
    setActiveMobileTrap(true)
  }

  const unmountAllTraps = () => {
    setActiveMobileTrap(false)
  }

  return (
    <header id="site-header">
      <Overlay
        navOpen={mobileNavOpen || tipJarOpen}
        clickHandler={closeAllModals}
        unmountTrap={unmountAllTraps}
      />

      <MobileNav
        clickHandler={toggleMobileNav}
        navOpen={mobileNavOpen}
        activeTrap={activeMobileNavTrap}
        closeAllModals={closeAllModals}
      />

      <FlexContainer justify="space-between">
        <Menu clickHandler={toggleMobileNav} mountTrap={mountNavTrap} />
      </FlexContainer>
    </header>
  )
}

Header.propTypes = {
  mobileNavOpen: bool.isRequired,
  toggleMobileNav: func.isRequired
}

export default Header
