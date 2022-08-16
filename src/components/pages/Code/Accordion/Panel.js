import { bool, string } from 'prop-types';
import { descriptionContentPropTypes, imagePropTypes } from 'propTypes';
import styled from 'styled-components';
import { removeSpecialCharactersAndHandleize } from 'utils/lib';
import ProjectContent from '../ProjectContent';
import VisitProject from '../VisitProject';

const StyledPanel = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: none;
  visibiltiy: hidden;

  &[data-state='open'] {
    display: flex;
    visibiltiy: visible;
  }
`;

const Panel = ({ link, description, image, hasImage, collapsed, title }) => {
  return (
    <StyledPanel
      role="region"
      aria-labelledby={`${removeSpecialCharactersAndHandleize(title)}-button`}
      data-state={collapsed ? 'collapsed' : 'open'}
      id={`${removeSpecialCharactersAndHandleize(title)}-panel`}
    >
      <VisitProject link={link} image={image} hasImage={hasImage} />

      <ProjectContent description={description} />
    </StyledPanel>
  );
};

Panel.propTypes = {
  link: string,
  description: descriptionContentPropTypes,
  image: imagePropTypes,
  hasImage: bool,
  collapsed: bool.isRequired
};

Panel.defaultProps = {
  link: '',
  hasImage: false,
  image: undefined
};

export default Panel;
