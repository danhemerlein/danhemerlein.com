import Button from 'components/base/Button.js';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const MobileMenuTrigger = styled(Button)``;

export const MobileMenuContent = styled(FlexContainer)`
  justify-content: space-between;
  width: 100%;
  display: flex;

  button,
  a {
    width: auto !important;
  }

  ${above.desktop`
    display: none;
  `}
`;

export const CloseMobileMenuButton = styled(Button)`
  margin-bottom: ${remHelper[8]};
`;

export const MobileInner = styled(FlexContainer)`
  row-gap: ${remHelper[8]};
`;

export const DesktopContent = styled.div`
  display: none;
  visibility: hidden;
  width: 100%;

  ${above.desktop`
    display: flex;
    visibility: visible;
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: flex-start;

  visibility: visible;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  padding: ${remHelper[16]};

  ${({ mobileMenuOpen }) => {
    if (mobileMenuOpen) {
      return `transform: translateY(0);`;
    }
    return `transform: translateY(-100%);`;
  }}

  ${above.desktop`
    display: none;
    visibility: hidden;
  `};
`;

export const HeaderButton = styled(Button)`
  ${above.desktop`
  margin-right: ${remHelper[8]};
`}
  background: ${({ theme }) => {
    return theme.background;
  }};
`;

export const Container = styled(FlexContainer)`
  padding: ${remHelper[16]};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  margin-left: -${remHelper[16]};
  flex-direction: column;
  row-gap: ${remHelper[8]};

  ${({ scrolled }) => {
    if (scrolled) {
      return 'background: black;';
    }
    return 'background: white;';
  }}
`;
