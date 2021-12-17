import styled from 'styled-components';
import { remHelper } from 'utils';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import tipJarModel from './tipJarModel';
import { P } from 'styles/elements/typography';
import { useEffect, useState } from 'react';
import { values } from 'lodash';
import Web3 from 'web3';

const StyledForm = styled(Form)`
  background-color: ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.background};
  width: 24rem;
  height: 24rem;
  color: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: ${remHelper[16]};
`;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.background};
  padding: ${remHelper[12]};
`;

const StyledField = styled(Field)`
  padding: ${remHelper[12]};
`;

const TipJar = () => {
  const { formId, formField } = tipJarModel;
  const [hasETH, setHasETH] = useState(undefined);

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

    console.log(Web3.utils.toHex(wei));

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

  return (
    <Formik
      initialValues={{ amount: 0.01 }}
      // validationSchema={schema[0]}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);

        setSubmitting(false);
      }}
    >
      <StyledForm id={formId}>
        <P>if you like my work, please consider leaving me a tip</P>
        <P as="label" htmlFor="amount">
          amount
        </P>
        <StyledField
          type="text"
          id="amount"
          placeholder={values.amount}
          value={values.amount}
        ></StyledField>
        <P>
          <ErrorMessage name="amount"></ErrorMessage>
        </P>
        <StyledButton type="submit">SEND ETH</StyledButton>
      </StyledForm>
    </Formik>
  );
};
export default TipJar;
