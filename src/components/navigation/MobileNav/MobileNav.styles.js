import styled from 'styled-components';
import { P } from 'styles/elements';
import { globalTransition } from 'styles/utilities/variables';
import { remHelper } from 'utils/remHelper';

export const Nav = styled.div`
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

  border-right: 1px solid;

  border-color: ${({ theme }) => {
    return theme.border;
  }};

  background-color: ${({ theme }) => {
    return theme.background;
  }};

  visibility: hidden;
  transition: ${globalTransition};

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

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const ListItem = styled(P)`
  margin-bottom: ${remHelper[16]};
  color: ${({ theme }) => {
    return theme.foreground;
  }};
`;

export const StyledHR = styled.hr`
  width: 50%;
  border: 1px solid;
  border-color: ${({ theme }) => {
    return theme.border;
  }};

  margin-bottom: ${remHelper[16]};
`;

export const RadioContainer = styled.div`
  margin-top: ${remHelper[8]};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const InputContainer = styled.div`
  margin-top: ${remHelper[16]};
  height: 100%;
  display: inline-flex;
`;
