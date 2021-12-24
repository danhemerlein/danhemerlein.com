import CloseIcon from 'components/base/icons/Close';
import FocusTrap from 'focus-trap-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { values } from 'lodash';
import { bool, func } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements/containers';
import { P } from 'styles/elements/typography';
import { remHelper } from 'utils';
import Web3 from 'web3';
import whatInput from 'what-input';
import tipJarModel from './tipJarModel';

const Jar = styled.div`
  z-index: 5;
  transform: translateX(256px);
  background-color: ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.background};
  width: 24rem;
  height: 24rem;
  color: #fff;
  position: absolute;
  top: ${remHelper[16]};
  right: 0;
  padding: ${remHelper[16]};

  visibility: hidden;

  transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1);

  ${({ jarOpen }) =>
    jarOpen &&
    `
      visibility: visible;
      transform: translateX(0);
      position: fixed;
  `};
`;

const TrapContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled(Form)`
  margin-top: ${remHelper[16]};
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.background};
  padding: ${remHelper[12]};
  font-family: 'custom_serif';
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const StyledField = styled(Field)`
  padding: ${remHelper[12]};
  font-family: 'custom_serif';
  width: 60%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const StyledParagraph = styled(P)`
  width: 40%;
`;

const StyledLabel = styled(P)`
  font-size: ${remHelper.override(12)};
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  width: ${remHelper[24]};
  height: ${remHelper[24]};
`;

const ErrorContainer = styled(FlexContainer)`
  height: 100%;
`;

const TipJar = ({ jarOpen, clickHandler, unmountTrap, activeTrap }) => {
  const { formId } = tipJarModel;
  const [hasETH, setHasETH] = useState(undefined);

  const closeButtonRef = useRef();

  useEffect(() => {
    if (whatInput.ask() === 'keyboard' && jarOpen) {
      closeButtonRef.current.focus();
    }
  }, [jarOpen]);

  useEffect(() => {
    if (window.ethereum) {
      setHasETH(true);
    } else {
      setHasETH(false);
    }
  }, []);

  const handleSubmit = async (vals) => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const wei = Web3.utils.toWei(vals.amount.toString(), 'ether');

    if (accounts.length > 0) {
      window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: '0x5e1b84F8cD7c0cF9F05F0F0B9300532213518598',
            value: Web3.utils.toHex(wei),
          },
        ],
      });
    }
  };

  const handleClick = () => {
    clickHandler();
    unmountTrap();
  };

  return (
    <Jar jarOpen={jarOpen}>
      {activeTrap && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: '#tip-jar-trap',
            allowOutsideClick: true,
            onDeactivate: unmountTrap,
          }}
        >
          <TrapContainer id="tip-jar-trap" tabIndex="-1">
            <FlexContainer items="flex-end">
              <StyledCloseButton ref={closeButtonRef} onClick={handleClick}>
                <CloseIcon width="2.4rem" height="2.4rem" color="#fff" />
              </StyledCloseButton>
            </FlexContainer>

            {hasETH ? (
              <Formik
                initialValues={{ amount: 0.01 }}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values);

                  setSubmitting(false);
                }}
              >
                <StyledForm id={formId}>
                  <P>if you like my work, please consider leaving me a tip</P>
                  <StyledLabel as="label" htmlFor="amount">
                    amount:
                  </StyledLabel>
                  <FlexContainer items="center">
                    <StyledField
                      type="text"
                      id="amount"
                      placeholder="0.01"
                      value={values.amount}
                    ></StyledField>
                    <StyledParagraph textAlign="center">ETH</StyledParagraph>
                  </FlexContainer>
                  <P>
                    <ErrorMessage name="amount"></ErrorMessage>
                  </P>
                  <StyledButton type="submit">send</StyledButton>
                </StyledForm>
              </Formik>
            ) : (
              <ErrorContainer items="center" justify="center">
                <P textAlign="center">
                  please install a crypto wallet browser extension to use this
                  feature
                </P>
              </ErrorContainer>
            )}
          </TrapContainer>
        </FocusTrap>
      )}
    </Jar>
  );
};

TipJar.propTypes = {
  jarOpen: bool.isRequired,
  clickHandler: func.isRequired,
  unmountTrap: func.isRequired,
  activeTrap: bool.isRequired,
};

export default TipJar;
