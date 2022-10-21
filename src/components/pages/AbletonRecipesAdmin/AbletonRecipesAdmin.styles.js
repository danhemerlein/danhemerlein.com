import { Field, Form } from 'formik';
import styled, { css } from 'styled-components';
import { FlexContainer, H1, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const InputCSS = css`
  width: 100%;
  border: 1px solid;
  border-radius: 0;
  min-height: 38px;
  padding: 2px 8px;

  border-color: ${({ theme }) => {
    return theme.foreground;
  }};
`;

export const Paragraph = styled(P)`
  margin-bottom: ${remHelper[8]};

  ${({ error, theme }) => {
    if (error === undefined) {
      return `color: ${theme.foreground}`;
    }
    if (error === true) {
      return `color: ${theme.yan.red}`;
    }
    if (error === false) {
      return `color: green`;
    }

    return `color: ${theme.foreground}`;
  }}
`;

export const ErrorParagraph = styled(P)`
  margin-top: ${remHelper[8]};
  margin-bottom: ${remHelper[8]};
  color: ${({ theme }) => {
    return theme.yan.red;
  }};
`;

export const FieldContainer = styled.div`
  margin-bottom: ${remHelper[16]};
`;

export const StyledFrom = styled(Form)`
  width: 50%;
`;

export const StyledField = styled(Field)`
  ${InputCSS}
`;

export const HeadlingOne = styled(H1)`
  margin-bottom: ${remHelper[16]};
`;

export const StyledPre = styled.pre`
  width: 50%;
  font-size: 24px;
`;

export const StyledFlexContainer = styled(FlexContainer)`
  width: 100%;
  max-width: 900px;
  column-gap: ${remHelper[16]};
  margin: 0 auto;
  margin-top: 71px;

  * {
    font-family: 'arial' !important;
  }
`;

export const StyledDateInput = styled.input`
  ${InputCSS}
`;
