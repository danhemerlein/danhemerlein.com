import Menu from 'components/navigation/Menu';
import MobileNav from 'components/navigation/MobileNav';
import MobileNavOverlay from 'components/navigation/MobileNavOverlay';
import { bool, func } from 'prop-types';
import { useState } from 'react';
import { FlexContainer } from 'styles/elements';

const Header = ({ mobileNavOpen, toggleMobileNav }) => {
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
        navOpen={mobileNavOpen}
        clickHandler={toggleMobileNav}
        unmountTrap={unmountTrap}
      />

      <MobileNav
        clickHandler={toggleMobileNav}
        navOpen={mobileNavOpen}
        unmountTrap={unmountTrap}
        activeTrap={activeTrap}
      />

      <FlexContainer>
        <Menu clickHandler={toggleMobileNav} mountTrap={mountTrap} />
      </FlexContainer>
    </header>
  );
};

Header.propTypes = {
  mobileNavOpen: bool.isRequired,
  toggleMobileNav: func.isRequired,
};

export default Header;
