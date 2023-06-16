import Menu from 'components/navigation/Menu';
import MobileNav from 'components/navigation/MobileNav';
import Overlay from 'components/navigation/Overlay';
import TipTrigger from 'components/navigation/TipTrigger';
import TipJar from 'components/other/TipJar';
import { bool, func } from 'prop-types';
import { useEffect, useState } from 'react';
import { FlexContainer, P, StyledLink } from 'styles/elements';

const Header = ({
  mobileNavOpen,
  toggleMobileNav,
  toggleTipJar,
  closeAllModals,
  tipJarOpen
}) => {
  const [activeMobileNavTrap, setActiveMobileTrap] = useState(false);
  const [activeTipJarTrap, setActiveTipJarTrap] = useState(false);
  const [isSite, setIsSite] = useState(true);
  const [isAbleton, setIsAbleton] = useState(false);

  useEffect(() => {
    setIsAbleton(window.location.pathname.includes('ableton'));
  }, []);

  const mountNavTrap = () => {
    setActiveMobileTrap(true);
  };

  const mountTipJarTrap = () => {
    setActiveTipJarTrap(true);
  };

  const unmountAllTraps = () => {
    setActiveMobileTrap(false);
    setActiveTipJarTrap(false);
  };

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
      />

      <TipJar
        clickHandler={toggleTipJar}
        jarOpen={tipJarOpen}
        activeTrap={activeTipJarTrap}
      />

      {isSite && !isAbleton ? (
        <FlexContainer justify="space-between">
          <Menu clickHandler={toggleMobileNav} mountTrap={mountNavTrap} />
          <TipTrigger clickHandler={toggleTipJar} mountTrap={mountTipJarTrap} />
        </FlexContainer>
      ) : null}

      {!isSite && !isAbleton ? (
        <FlexContainer>
          <P>
            a side project by <StyledLink to="/">Dan Hemerlein</StyledLink>
          </P>
        </FlexContainer>
      ) : null}

      {!isSite && isAbleton && null}
    </header>
  );
};

Header.propTypes = {
  mobileNavOpen: bool.isRequired,
  toggleMobileNav: func.isRequired
};

export default Header;
