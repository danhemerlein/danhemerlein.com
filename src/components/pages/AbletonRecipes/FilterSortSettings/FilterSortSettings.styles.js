import Select from 'react-select';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { ParagraphCSS } from 'styles/elements/typography';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

export const Paragraph = styled(P)`
  margin-bottom: ${remHelper[8]};
`;

export const SubmitContainer = styled(FlexContainer)`
  label {
    cursor: pointer;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: ${remHelper[16]};
  grid-template-columns: repeat(2, 1fr);
  margin-top: ${remHelper[16]};

  ${above.desktop`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

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
  }

  .react-select__multi-value__label {
    ${ParagraphCSS};
    color: ${({ theme }) => {
      return theme.foreground;
    }};
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
  }
`;
