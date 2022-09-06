import Menu from 'components/navigation/Menu';
import MobileNav from 'components/navigation/MobileNav';
import Overlay from 'components/navigation/Overlay';
import TipTrigger from 'components/navigation/TipTrigger';
import TipJar from 'components/other/TipJar';
import { bool, func } from 'prop-types';
import { useEffect, useState } from 'react';
import { FlexContainer, P } from 'styles/elements';

const Header = ({
  mobileNavOpen,
  toggleMobileNav,
  toggleTipJar,
  closeAllModals,
  tipJarOpen
}) => {
  const [activeMobileNavTrap, setActiveMobileTrap] = useState(false);
  const [activeTipJarTrap, setActiveTipJarTrap] = useState(false);
  const [isExperiment, setIsExperiment] = useState(false);

  useEffect(() => {
    setIsExperiment(window.location.pathname.includes('/experiments/'));
  }, []);

  const mountNavTrap = () => {
    setActiveMobileTrap(true);
  };

  const unmountNavTrap = () => {
    setActiveMobileTrap(false);
  };

  const mountTipJarTrap = () => {
    setActiveTipJarTrap(true);
  };

  const unmountActiveTipJarTrap = () => {
    setActiveTipJarTrap(false);
  };

  const unmountAllTraps = () => {
    setActiveMobileTrap(false);
    setActiveTipJarTrap(false);
  };

  return (
    <header>
      <Overlay
        navOpen={mobileNavOpen || tipJarOpen}
        clickHandler={closeAllModals}
        unmountTrap={unmountAllTraps}
      />

      <MobileNav
        clickHandler={toggleMobileNav}
        navOpen={mobileNavOpen}
        unmountTrap={unmountNavTrap}
        activeTrap={activeMobileNavTrap}
      />

      <TipJar
        clickHandler={toggleTipJar}
        jarOpen={tipJarOpen}
        unmountTrap={unmountActiveTipJarTrap}
        activeTrap={activeTipJarTrap}
      />

      {!isExperiment ? (
        <FlexContainer justify="space-between">
          <Menu clickHandler={toggleMobileNav} mountTrap={mountNavTrap} />
          <TipTrigger clickHandler={toggleTipJar} mountTrap={mountTipJarTrap} />
        </FlexContainer>
      ) : (
        <FlexContainer>
          <P>a side project by Dan Hemerlein</P>
        </FlexContainer>
      )}
    </header>
  );
};

Header.propTypes = {
  mobileNavOpen: bool.isRequired,
  toggleMobileNav: func.isRequired
};

export default Header;
