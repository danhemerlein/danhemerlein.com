import styled from 'styled-components'
import { globalTransition } from 'styles/utilities/variables'
import { remHelper } from 'utils/remHelper'

export const StyledCloseButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  width: ${remHelper[24]};
  height: ${remHelper[24]};
  display: block;
`

export const Menu = styled.div`
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
    return theme.border
  }};

  background-color: ${({ theme }) => {
    return theme.background
  }};

  visibility: hidden;
  transition: ${globalTransition};

  ${({ open }) => {
    return (
      open &&
      `
      visibility: visible;
      transform: translateX(0);
      position: fixed;
  `
    )
  }};

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
