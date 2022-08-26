import { Form } from 'formik';
import styled from 'styled-components';
import { above } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const StyledForm = styled(Form)`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 70px;

  ${above.desktop`
    width: 50%;
  `}

  input, select {
    background: transparent;
    border: 1px solid black;
    border-radius: 0;
    color: black;
    cursor: pointer;
  }
`;

export const DateLabelContainer = styled(LabelContainer)`
  ${above.desktop`
    width: calc(50% - ${remHelper[16]});
    margin-right: ${remHelper[16]};
  `}

  input {
    padding: ${remHelper[12]};
  }
`;

export const TimeLabelContainer = styled(LabelContainer)`
  justify-content: space-between;
  margin-top: ${remHelper[16]};

  ${above.desktop`
    margin-top: 0rem;
  `}
`;

export const Button = styled.button`
  background: transparent;
  margin-top: 1rem;
  border: 1px solid black;
  border-radius: 0;
  color: black;
  padding: ${remHelper[8]};
  margin-top: ${remHelper[16]};
  cursor: pointer;
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;

  select {
    padding: 0.75rem;
    width: 50%;
  }

  select:first-of-type {
    width: calc(50% - rem);
    margin-right: 1rem;
  }
`;
