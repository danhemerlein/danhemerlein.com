import { Form } from 'formik';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  gap: ${remHelper[16]};
`;

export const LabelContainer = styled(FlexContainer)`
  width: 100%;
  height: 70px;

  input,
  select {
    border: 1px solid black;
    color: black;
  }
`;

export const DateLabelContainer = styled(LabelContainer)`
  input {
    padding: ${remHelper[12]};
  }
`;

export const TimeLabelContainer = styled(LabelContainer)`
  margin-top: ${remHelper[16]};

  ${above.desktop`
    margin-top: 0;
  `}
`;

export const SelectContainer = styled(FlexContainer)`
  gap: ${remHelper[16]};

  select {
    padding: ${remHelper[12]};
    width: 50%;
  }
`;

export const ErrorParagraph = styled(P)`
  margin-top: ${remHelper[16]};

  color: ${({ theme }) => {
    return theme.yan.red;
  }};
`;
