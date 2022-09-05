import styled from 'styled-components';
import { remHelper } from 'utils/remHelper';

export const Container = styled.div`
  width: 75%;
`;

export const TagGenreContainer = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const TagsGrenresContainer = styled(TagGenreContainer)`
  margin-top: ${remHelper[8]};
  max-width: 100%;
`;

export const TagGenre = styled.li`
  border: 1px solid;

  border-color: ${({ theme }) => {
    return theme.foreground;
  }};
  border-radius: 5px;
  padding: ${remHelper[4]};
`;
