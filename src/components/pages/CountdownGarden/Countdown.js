import Button from 'components/base/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCountdown } from 'store/actions/countdowns';
import styled from 'styled-components';
import { P } from 'styles/elements';
import { countdown } from 'utils/lib';
import { remHelper } from 'utils/remHelper';

const Container = styled.div`
  width: 100%;
`;

const Paragraph = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const ErrorParagraph = styled(Paragraph)`
  color: ${({ theme }) => {
    return theme.yan.red;
  }};
`;

const StyledButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${remHelper[16]};
`;

const Countdown = ({ date, countdowns }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = () => {
    setError(false);

    const included = countdowns.includes(date);

    if (!included) {
      countdowns.push(date);

      if (countdowns.length <= 3) {
        dispatch(addCountdown([...countdowns]));
      } else {
        setError(true);
        setErrorMessage('three saved countdowns is the maxium');
      }
    } else {
      setError(true);
      setErrorMessage(
        'a countdown with that date and time has already been saved'
      );
    }
  };

  return (
    <Container>
      {countdown(date).map((str) => {
        return <Paragraph key={str}>{str}</Paragraph>;
      })}

      {error ? <ErrorParagraph>{errorMessage}</ErrorParagraph> : null}

      <StyledButton type="button" clickHandler={handleClick}>
        save countdown?
      </StyledButton>
    </Container>
  );
};

export default Countdown;
