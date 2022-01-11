import styled from 'styled-components';
import { P } from 'styles/elements/typography';
import { remHelper } from 'utils';

const LoadingContainer = styled.div`
  padding: ${remHelper[32]};
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <P>loading...</P>
    </LoadingContainer>
  );
};

export default Loading;
