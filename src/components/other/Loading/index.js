import styled from "styled-components";
import { remHelper } from "utils";

const LoadingContainer = styled.div`
  padding: ${remHelper[32]};
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <p>loading...</p>
    </LoadingContainer>
  );
};

export default Loading;
