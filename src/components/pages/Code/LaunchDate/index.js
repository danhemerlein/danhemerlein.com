import styled from "styled-components";
import { P } from "styles/elements";
import { remHelper } from "utils";

const StyledP = styled(P)`
  margin-top: ${remHelper[8]};
`;

const LaunchDate = ({ launchDate }) => {
  return <StyledP textAlign="left">({launchDate})</StyledP>;
};

export default LaunchDate;
