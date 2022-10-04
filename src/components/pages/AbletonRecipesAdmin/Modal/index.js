import Button from 'components/base/Button';
import { ErrorMessage, Form, Formik } from 'formik';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { remHelper } from 'utils/remHelper';
import * as styles from '../AbletonRecipesAdmin.styles';

const Container = styled(FlexContainer)`
  width: 250px;
  height: 250px;
  position: absolute;
  border: 1px solid;
  border-color: ${({ theme }) => {
    return theme.foreground;
  }};
  background: ${({ theme }) => {
    return theme.background;
  }};
  padding: ${remHelper[16]};

  z-index: 100;

  button {
    cursor: pointer;
  }
`;

const Inner = styled(FlexContainer)`
  flex-grow: 1;
  width: 100%;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const Modal = ({
  setModalOpen,
  collectionToAddTo,
  submitHandler,
  modalFormErrorSuccess
}) => {
  return (
    <Container direction="column" items="flex-end">
      <button
        type="button"
        onClick={() => {
          return setModalOpen(false);
        }}
      >
        x
      </button>
      <Inner items="center" justify="center" direction="column">
        <styles.Paragraph bold> add to {collectionToAddTo}</styles.Paragraph>

        <Formik
          initialValues={{ value: '' }}
          onSubmit={(values) => {
            submitHandler(collectionToAddTo, values);
          }}
        >
          {({ values }) => {
            return (
              <styles.StyledFlexContainer>
                <StyledForm>
                  <styles.FieldContainer>
                    <styles.StyledField
                      id="value"
                      name="value"
                      placeholder="value"
                    />

                    <styles.ErrorParagraph>
                      <ErrorMessage name="name" />
                    </styles.ErrorParagraph>
                  </styles.FieldContainer>
                  <Button
                    type="submit"
                    clickHandler={(_) => {
                      return _;
                    }}
                  >
                    submit
                  </Button>
                </StyledForm>
              </styles.StyledFlexContainer>
            );
          }}
        </Formik>
      </Inner>

      <styles.Paragraph error={modalFormErrorSuccess.error}>
        {modalFormErrorSuccess.message}
      </styles.Paragraph>
    </Container>
  );
};

Modal.propTypes = {};

export default Modal;
