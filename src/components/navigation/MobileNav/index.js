import CloseIcon from 'components/base/icons/Close';
import FocusTrap from 'focus-trap-react';
import { bool, func, string } from 'prop-types';
import { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setSiteTheme } from 'store/actions/siteSettings';
import styled from 'styled-components';
import { A, FlexContainer, P, StyledLink } from 'styles/elements';
import { modalTransition } from 'styles/utilities/variables';
import { blockScroll } from 'utils/lib';
import data from 'utils/navigation/data';
import { remHelper } from 'utils/remHelper';
import whatInput from 'what-input';

const Nav = styled.div`
  z-index: 5;
  transform: translateX(-226px);

  position: absolute;
  left: 0;
  top: 0;

  width: 210px;
  height: 100vh;

  display: block;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  padding: ${remHelper[16]};

  background: white;

  border-right: 1px solid;
  border-color: ${({ theme }) => {
    return theme.border;
  }};
  background-color: ${({ theme }) => {
    return theme.background;
  }};

  visibility: hidden;
  transition: ${modalTransition};

  ${({ navOpen }) => {
    return (
      navOpen &&
      `
      visibility: visible;
      transform: translateX(0);
      position: fixed;
  `
    );
  }};
`;

const ListItem = styled(P)`
  margin-bottom: ${remHelper[16]};
  color: ${({ theme }) => {
    return theme.foreground;
  }};
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  width: ${remHelper[24]};
  height: ${remHelper[24]};
`;

const StyledHR = styled.hr`
  width: 50%;
  border: 1px solid;
  border-color: ${({ theme }) => {
    return theme.border;
  }};

  margin-bottom: ${remHelper[16]};
`;

const RadioContainer = styled.div`
  margin-top: ${remHelper[8]};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  margin-top: ${remHelper[16]};
  height: 100%;
  display: inline-flex;
`;

const MobileNav = ({
  clickHandler,
  navOpen,
  mode,
  activeTrap,
  unmountTrap,
}) => {
  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    dispatch(setSiteTheme(event.target.value));
  };

  const closeButtonRef = useRef();

  useEffect(() => {
    if (whatInput.ask() === 'keyboard' && navOpen) {
      closeButtonRef.current.focus();
    }
  }, [navOpen]);

  const handleClick = () => {
    clickHandler();
    unmountTrap();
    blockScroll(false);
  };

  return (
    <Nav navOpen={navOpen}>
      {activeTrap && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: '#mobile-nav-trap',
            allowOutsideClick: true,
            onDeactivate: unmountTrap,
          }}
        >
          <div id="mobile-nav-trap" tabIndex="-1">
            {/* modal close */}

            <FlexContainer items="flex-end" justify="flex-end">
              <StyledCloseButton ref={closeButtonRef} onClick={handleClick}>
                <CloseIcon width="2.4rem" height="2.4rem" />
              </StyledCloseButton>
            </FlexContainer>

            {/* site navigation */}

            <nav role="navigation">
              <FlexContainer
                as="ul"
                items="center"
                justify="center"
                direction="column"
              >
                {data.topNavLinks.map((link) => {
                  return (
                    <ListItem as="li" key={link.title}>
                      <StyledLink onClick={clickHandler} to={link.to}>
                        {link.title}
                      </StyledLink>
                    </ListItem>
                  );
                })}

                <StyledHR />

                {data.bottomNavLinks.map((link) => {
                  return (
                    <ListItem as="li" key={link.title}>
                      <A href={link.to} target="_blank" rel="noreferrer">
                        {link.title}
                      </A>
                    </ListItem>
                  );
                })}
              </FlexContainer>
            </nav>

            <StyledHR />

            {/* color modes */}

            <fieldset>
              <P textAlign="center" as="legend">
                color mode
              </P>
              <RadioContainer>
                {data.siteThemes.map((themeOption) => {
                  return (
                    <InputContainer key={themeOption.for}>
                      <P as="label" htmlFor={themeOption.for}>
                        {themeOption.title}
                      </P>
                      <input
                        onChange={handleRadioChange}
                        type="radio"
                        name="site-theme"
                        id={themeOption.for}
                        value={themeOption.key}
                        checked={mode === themeOption.key}
                      />
                    </InputContainer>
                  );
                })}
              </RadioContainer>
            </fieldset>
          </div>
        </FocusTrap>
      )}
    </Nav>
  );
};

const mapStateToProps = (state) => {
  return {
    mode: state.siteSettings.mode,
  };
};

MobileNav.propTypes = {
  clickHandler: func.isRequired,
  unmountTrap: func.isRequired,
  navOpen: bool.isRequired,
  mode: string.isRequired,
  activeTrap: bool.isRequired,
};

export default connect(mapStateToProps)(MobileNav);
