import CloseIcon from 'components/base/icons/Close';
import FocusTrap from 'focus-trap-react';
import { bool, func, string } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { setSiteTheme } from 'store/actions/siteSettings';
import { A, FlexContainer, P, StyledLink } from 'styles/elements';
import { Menu, StyledCloseButton } from 'styles/elements/elements';
import { blockScroll } from 'utils/lib';
import data from 'utils/navigation/data';
import * as styles from './MobileNav.styles';

const MobileNav = ({ clickHandler, navOpen, mode, activeTrap }) => {
  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    dispatch(setSiteTheme(event.target.value));
  };

  const handleClick = () => {
    clickHandler();
    blockScroll(false);
  };

  return (
    <Menu open={navOpen}>
      {activeTrap && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: '#mobile-nav-trap',
            allowOutsideClick: true
          }}
        >
          <div id="mobile-nav-trap">
            {/* modal close */}
            <FlexContainer items="flex-end" justify="flex-end">
              <StyledCloseButton onClick={handleClick}>
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
                    <styles.ListItem as="li" key={link.title}>
                      <StyledLink onClick={clickHandler} to={link.to}>
                        {link.title}
                      </StyledLink>
                    </styles.ListItem>
                  );
                })}

                <styles.StyledHR />

                {data.bottomNavLinks.map((link) => {
                  return (
                    <styles.ListItem as="li" key={link.title}>
                      <A href={link.to} target="_blank" rel="noreferrer">
                        {link.title}
                      </A>
                    </styles.ListItem>
                  );
                })}
              </FlexContainer>
            </nav>
            <styles.StyledHR />
            {/* color modes */}
            <fieldset>
              <P textAlign="center" as="legend">
                color mode
              </P>
              <styles.RadioContainer justify="space-between" wrap="wrap">
                {data.siteThemes.map((themeOption) => {
                  return (
                    <styles.InputContainer key={themeOption.for}>
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
                    </styles.InputContainer>
                  );
                })}
              </styles.RadioContainer>
            </fieldset>
          </div>
        </FocusTrap>
      )}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    mode: state.siteSettings.mode
  };
};

MobileNav.propTypes = {
  clickHandler: func.isRequired,
  navOpen: bool.isRequired,
  activeTrap: bool.isRequired,
  mode: string.isRequired
};

export default connect(mapStateToProps)(MobileNav);
