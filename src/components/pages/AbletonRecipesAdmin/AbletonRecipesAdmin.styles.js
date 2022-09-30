import { Field, Form } from 'formik';
import styled from 'styled-components';
import { H1, P } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

export const Paragraph = styled(P)`
  margin-bottom: ${remHelper[8]};
`;

export const FieldContainer = styled.div`
  margin-bottom: ${remHelper[16]};
`;

export const StyledFrom = styled(Form)`
  ${above.desktop`
    min-width: 50%;
  `}
`;

export const StyledField = styled(Field)`
  width: 100%;
  border: 1px solid;
  border-radius: 0;
  min-height: 38px;
  padding: 2px 8px;

  border-color: ${({ theme }) => {
    return theme.foreground;
  }};
`;

export const HeadlingOne = styled(H1)`
  margin-bottom: ${remHelper[16]};
`;

export const StyledPre = styled.pre`
  max-width: 50%;
  font-size: 24px;
`;
