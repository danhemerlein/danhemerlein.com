import { string } from 'prop-types';
import styled from 'styled-components';
import { H2 } from 'styles/elements';

const StyledH2 = styled(H2)`
  margin: 0;
`;

const ProjectTitle = ({ title }) => {
  return <StyledH2 textAlign="left">{title}</StyledH2>;
};

ProjectTitle.propTypes = {
  title: string.isRequired
};

export default ProjectTitle;
