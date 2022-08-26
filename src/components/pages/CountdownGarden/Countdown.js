import { useDispatch } from 'react-redux';
import { addCountdown } from 'store/actions/countdowns';
import styled from 'styled-components';
import { P } from 'styles/elements';
import { countdown } from 'utils/lib';

import { remHelper } from 'utils/remHelper';

const Container = styled.div`
  width: 100%;

  ${
    '' /* ${above.desktop`
    width: 50%;
  `} */
  }
`;

const Paragraph = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const StyledButton = styled.button`
  background: transparent;
  margin: 0 auto;
  display: block;
  border: 1px solid black;
  border-radius: 0;
  color: black;
  cursor: pointer;
  padding: ${remHelper[8]};
`;

const Countdown = ({ date, countdowns }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const included = countdowns.includes(date);

    if (!included) {
      countdowns.push(date);

      if (countdowns.length < 4) {
        dispatch(addCountdown([...countdowns]));
      } else {
        // toast('three saved countdowns is the maxium');
      }
    } else {
      // toast('a countdown with that date and time has already been saved');
    }
  };

  return (
    <Container>
      {countdown(date).map((str) => {
        return <Paragraph key={str}>{str}</Paragraph>;
      })}
      <StyledButton
        onClick={() => {
          return handleClick();
        }}
      >
        save countdown?
      </StyledButton>
    </Container>
  );
};

export default Countdown;
