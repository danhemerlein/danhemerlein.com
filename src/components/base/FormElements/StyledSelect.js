import Select from 'react-select';
import styled from 'styled-components';
import { ParagraphCSS } from 'styles/elements/typography';
import { globalTransition } from 'styles/utilities';

export const StyledSelect = styled(Select)`
  .react-select__control {
    border-radius: 0;
    border: 1px solid;
    border-color: ${({ theme }) => {
      return theme.foreground;
    }};
    cursor: pointer;
  }

  .react-select__placeholder {
    ${ParagraphCSS};
    text-transform: lowercase;
    color: ${({ theme }) => {
      return theme.foreground;
    }};
  }

  .react-select__multi-value {
    background-color: ${({ theme }) => {
      return theme.foreground;
    }};
  }

  .react-select__input-container,
  .react-select__single-value,
  .react-select__input[type='text'] {
    ${ParagraphCSS};

    color: ${({ theme }) => {
      return `${theme.foreground} !important`;
    }};
  }

  .react-select__multi-value__remove {
    transition: background ${globalTransition}, color ${globalTransition};
    border-radius: 0;
    border-left: 1px solid;
    border-color: ${({ theme }) => {
      return theme.background;
    }};

    margin-top: 4px;
    margin-bottom: 4px;

    &:hover,
    &:focus {
      background: ${({ theme }) => {
        return theme.foreground;
      }};
      color: ${({ theme }) => {
        return theme.background;
      }};
    }

    svg {
      fill: ${({ theme }) => {
        return theme.background;
      }};
    }
  }

  .react-select__multi-value__label {
    ${ParagraphCSS};
    color: ${({ theme }) => {
      return theme.background;
    }};
    padding: 4px 6px;
  }

  .react-select__indicator {
    color: ${({ theme }) => {
      return theme.foreground;
    }};
  }

  .react-select__indicator-separator {
    background-color: ${({ theme }) => {
      return theme.foreground;
    }};
  }

  .react-select__menu {
    border-radius: 0;
    margin: 0;
    border-top: 0;
  }

  .react-select__menu-list {
    border-radius: 0;
    border: 1px solid;
    border-color: ${({ theme }) => {
      return theme.foreground;
    }};
    cursor: pointer;
  }

  .react-select__option {
    ${ParagraphCSS};
    cursor: pointer;
    border-bottom: 1px solid;
    border-color: ${({ theme }) => {
      return theme.foreground;
    }};
    color: ${({ theme }) => {
      return theme.foreground;
    }};
    transition: background ${globalTransition}, color ${globalTransition},
      border-color ${globalTransition};

    &:hover,
    &:focus {
      background: ${({ theme }) => {
        return theme.foreground;
      }};
      border-color: ${({ theme }) => {
        return theme.background;
      }};
      color: ${({ theme }) => {
        return theme.background;
      }};
    }
  }
`;
