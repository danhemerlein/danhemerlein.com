import Menu from 'components/navigation/Menu';
import MobileNav from 'components/navigation/MobileNav';
import MobileNavOverlay from 'components/navigation/MobileNavOverlay';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';

const StyledHeader = styled.header`
  position: relative;
`;

const Header = ({ mobileNavOpen, toggleMobileNav }) => {
  return (
    <StyledHeader>
      <MobileNavOverlay
        navOpen={mobileNavOpen}
        clickHandler={toggleMobileNav}
      />

      <MobileNav clickHandler={toggleMobileNav} navOpen={mobileNavOpen} />

      <FlexContainer>
        <Menu clickHandler={toggleMobileNav} />
      </FlexContainer>
    </StyledHeader>
  );
};

Header.propTypes = {
  mobileNavOpen: bool.isRequired,
  toggleMobileNav: func,
};

Header.defaultProps = {
  toggleMobileNav: (_) => _,
};

export default Header;
