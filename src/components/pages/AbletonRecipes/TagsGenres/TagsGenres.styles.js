import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { globalTransition } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

export const Container = styled.div`
  width: 75%;
`;

export const GenreContainer = styled.div`
  margin-top: ${remHelper[8]};
`;

export const TagGenreContainer = styled(FlexContainer)`
  gap: ${remHelper[8]};
`;

export const TagsGrenresContainer = styled(FlexContainer)`
  gap: ${remHelper[8]};
  margin-top: ${remHelper[8]};
  max-width: 100%;
`;

export const TagGenre = styled.li`
  border: 1px solid;

  transition: border-color ${globalTransition};

  border-color: ${({ theme, hovered }) => {
    return hovered ? theme.background : theme.foreground;
  }};

  border-radius: 5px;
  padding: ${remHelper[4]};
`;
