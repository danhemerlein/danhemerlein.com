import CloseIcon from 'components/base/icons/Close';
import { bool, func, string } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSiteTheme } from 'store/actions/siteSettings';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { anchorColor } from 'styles/utilities';
import { remHelper } from 'utils';
import data from './data';

const Nav = styled.div`
  z-index: 5;
  transform: translateX(-226px);
  left: 0;
  top: 0;
  transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1);
  position: absolute;
  width: 210px;
  height: 100vh;
  display: block;
  overflow-y: scroll;
  background: white;
  display: flex;
  flex-direction: column;
  padding: ${remHelper[16]};
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  visibility: hidden;

  ${({ navOpen }) =>
    navOpen &&
    `
      visibility: visible;
      transform: translateX(0);
      position: fixed;
  `};
`;

const ListItem = styled(P)`
  margin-bottom: ${remHelper[16]};
  color: ${({ theme }) => theme.foreground};
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  width: ${remHelper[24]};
  height: ${remHelper[24]};

  &:focus {
    border: 1px solid;
    border-color: ${({ theme }) => theme.border};
  }
`;

const StyledHR = styled.hr`
  width: 50%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};

  margin-bottom: ${remHelper[16]};
`;

const StyledLink = styled(Link)`
  font-family: 'custom_serif';
  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor,
    });
  }}
`;

const StyledBottomLink = styled.a`
  font-family: 'custom_serif';
  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor,
    });
  }}
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

const MobileNav = ({ clickHandler, navOpen, mode }) => {
  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    dispatch(setSiteTheme(event.target.value));
  };

  return (
    <Nav navOpen={navOpen}>
      <FlexContainer items="flex-end" justify="flex-end">
        <StyledCloseButton onClick={clickHandler}>
          <CloseIcon width="2.4rem" height="2.4rem" />
        </StyledCloseButton>
      </FlexContainer>
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
                <StyledBottomLink
                  href={link.to}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.title}
                </StyledBottomLink>
              </ListItem>
            );
          })}
        </FlexContainer>
      </nav>

      <StyledHR />

      <fieldset>
        <P textAlign="center" as="legend">
          color mode
        </P>
        <RadioContainer>
          {data.siteThemes.map((themeOption) => {
            return (
              <InputContainer>
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
    </Nav>
  );
};

const mapStateToProps = (state) => {
  return {
    mode: state.siteSettings.mode,
  };
};

MobileNav.propTypes = {
  clickHandler: func,
  navOpen: bool.isRequired,
  mode: string.isRequired,
};

MobileNav.defaultProps = {
  clickHandler: (_) => _,
};

export default connect(mapStateToProps)(MobileNav);
