import CloseIcon from 'components/base/icons/Close';
import { bool, func, string } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSiteTheme } from 'store/actions/siteSettings';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
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

  ${({ navOpen }) =>
    navOpen &&
    `
      transform: translateX(0);
      position: fixed;
  `};
`;

const ListItem = styled(P)`
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.foreground};
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  width: 2.4rem;
  height: 2.4rem;

  &:focus {
    border: 1px solid;
    border-color: ${({ theme }) => theme.border};
  }
`;

const StyledHR = styled.hr`
  width: 50%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};

  margin: ${remHelper[16]} 0;
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
                <Link onClick={clickHandler} to={link.to}>
                  {link.title}
                </Link>
              </ListItem>
            );
          })}

          <StyledHR className="MobileNav__hr" />

          {data.bottomNavLinks.map((link) => {
            return (
              <ListItem as="li" key={link.title}>
                <Link to={link.to}>{link.title}</Link>
              </ListItem>
            );
          })}
        </FlexContainer>
      </nav>

      <fieldset>
        <P as="legend">mode</P>
        <P as="label" htmlFor="light-mode">
          light
        </P>
        <input
          onChange={handleRadioChange}
          type="radio"
          name="site-theme"
          id="light-mode"
          value="light"
          checked={mode === 'light'}
        />
        <P as="label" htmlFor="dark-mode">
          dark
        </P>
        <input
          onChange={handleRadioChange}
          type="radio"
          name="site-theme"
          id="dark-mode"
          value="dark"
          checked={mode === 'dark'}
        />
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
  clickHandler: func.isRequired,
  navOpen: bool.isRequired,
  mode: string.isRequired,
};

export default connect(mapStateToProps)(MobileNav);
