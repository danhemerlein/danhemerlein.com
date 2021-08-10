import Menu from "components/navigation/Menu";
import MobileNav from "components/navigation/MobileNav";
import MobileNavOverlay from "components/navigation/MobileNavOverlay";
import styled from "styled-components";
import { FlexContainer } from "styles/elements";

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

export default Header;
