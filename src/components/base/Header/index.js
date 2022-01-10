import Menu from 'components/navigation/Menu';
import MobileNav from 'components/navigation/MobileNav';
import MobileNavOverlay from 'components/navigation/MobileNavOverlay';
import TipTrigger from 'components/navigation/TipTrigger';
import TipJar from 'components/other/TipJar';
import { bool, func } from 'prop-types';
import { useState } from 'react';
import { FlexContainer } from 'styles/elements';

const Header = ({
  mobileNavOpen,
  toggleMobileNav,
  toggleTipJar,
  closeAllModals,
  tipJarOpen,
}) => {
  const [activeTrap, setActiveTrap] = useState(false);

  const mountTrap = () => {
    setActiveTrap(true);
  };

  const unmountTrap = () => {
    setActiveTrap(false);
  };

  return (
    <header>
      <MobileNavOverlay
        navOpen={mobileNavOpen || tipJarOpen}
        clickHandler={closeAllModals}
        unmountTrap={unmountTrap}
      />

      <MobileNav
        clickHandler={toggleMobileNav}
        navOpen={mobileNavOpen}
        unmountTrap={unmountTrap}
        activeTrap={activeTrap}
      />

      <TipJar
        clickHandler={toggleTipJar}
        jarOpen={tipJarOpen}
        unmountTrap={unmountTrap}
        activeTrap={activeTrap}
      />

      <FlexContainer justify="space-between">
        <Menu clickHandler={toggleMobileNav} mountTrap={mountTrap} />
        <TipTrigger clickHandler={toggleTipJar} mountTrap={mountTrap} />
      </FlexContainer>
    </header>
  );
};

Header.propTypes = {
  mobileNavOpen: bool.isRequired,
  toggleMobileNav: func.isRequired,
};

export default Header;
