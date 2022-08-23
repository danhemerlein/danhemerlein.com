import CloseIcon from 'components/base/icons/Close';
import FocusTrap from 'focus-trap-react';
import { bool, func, string } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { setSiteTheme } from 'store/actions/siteSettings';
import { A, FlexContainer, P, StyledLink } from 'styles/elements';
import { blockScroll } from 'utils/lib';
import data from 'utils/navigation/data';
import * as styles from './MobileNav.styles';

const MobileNav = ({
  clickHandler,
  navOpen,
  mode,
  activeTrap,
  unmountTrap
}) => {
  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    dispatch(setSiteTheme(event.target.value));
  };

  const handleClick = () => {
    clickHandler();
    unmountTrap();
    blockScroll(false);
  };

  return (
    <styles.Nav navOpen={navOpen}>
      {activeTrap && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: '#mobile-nav-trap',
            allowOutsideClick: true,
            onDeactivate: unmountTrap
          }}
        >
          <div id="mobile-nav-trap">
            {/* modal close */}
            <FlexContainer items="flex-end" justify="flex-end">
              <styles.StyledCloseButton onClick={handleClick}>
                <CloseIcon width="2.4rem" height="2.4rem" />
              </styles.StyledCloseButton>
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
              <styles.RadioContainer>
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
    </styles.Nav>
  );
};

const mapStateToProps = (state) => {
  return {
    mode: state.siteSettings.mode
  };
};

MobileNav.propTypes = {
  clickHandler: func.isRequired,
  unmountTrap: func.isRequired,
  navOpen: bool.isRequired,
  activeTrap: bool.isRequired,
  mode: string.isRequired
};

export default connect(mapStateToProps)(MobileNav);
