import FullScreenHeight from 'components/other/FullScreenHeight';
import { FlexContainer, P } from 'styles/elements';

const Closed = () => {
  return (
    <FullScreenHeight unsetBreakpoint="none">
      <FlexContainer direction="column" items="center" justify="center">
        <P>
          <em>countdown garden is closed 7AM - 9PM</em>
        </P>
        <P>
          <em>touch some grass and check back later</em>
        </P>
      </FlexContainer>
    </FullScreenHeight>
  );
};

export default Closed;
