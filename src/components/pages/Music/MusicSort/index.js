import { arrayOf, string } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import {
  filterMusicProjectsByArtist,
  filterMusicProjectsByRole,
  sortMusicProjects,
} from 'store/actions/musicProjects';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import theme from 'styles/theme';
import { above } from 'styles/utilities';
import { remHelper } from 'utils';

const Container = styled(FlexContainer)`
  width: 100%;
  margin: ${remHelper[16]} 0;
  flex-direction: column;

  ${above.tablet`
    flex-direction: row;
  `}
`;

const LabelText = styled(P)`
  display: block;
  margin-bottom: ${remHelper[8]};
`;

const FilterFieldset = styled(FlexContainer)`
  ${above.tablet`
    margin-right: ${remHelper[16]};
  `}
`;

const LabelContainer = styled(FlexContainer)`
  margin-right: ${remHelper[8]};

  &:last-of-type {
    margin-right: 0;
  }
`;

const SortFieldset = styled.fieldset`
  margin-left: ${remHelper[16]};
`;

const SelectContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};
  width: 100%;

  ${above.tablet`
    margin-top: 0;
    width: auto;
  `}
`;

const CheckBox = styled.input`
  margin: 0;
  appearance: none;
  height: ${remHelper[16]};
  width: ${remHelper[16]};
  margin: 0 0 0 ${remHelper[8]};
  background: none;
  border: 1px solid;
  border-color: ${({ color }) => color};
  background-color: ${({ color }) => color};

  border-radius: 50%;
  outline: none;
  position: relative;
  z-index: 1;

  ${'' /* &:focus {
    ${({ input }) => input === "keyboard" && `outline: ${outlineFocusStyle}`};
  } */}
`;

const MusicSort = ({
  filters,
  artists,
  performedAvailable,
  wroteAvailable,
  producedAvailable,
  artistFilter,
  sortBy,
}) => {
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    dispatch(sortMusicProjects(event.target.value));
  };

  const handleRoleFilterChange = (event) => {
    dispatch(filterMusicProjectsByRole(event.target.value));
  };

  const handleArtistFilterChange = (event) => {
    dispatch(filterMusicProjectsByArtist(event.target.value));
  };

  return (
    <Container>
      <FilterFieldset as="fieldset">
        <LabelText as="legend">filter</LabelText>
        <LabelContainer>
          <P as="label" htmlFor="music-filter-wrote">
            wrote
          </P>
          <CheckBox
            color={theme.light.yan.foreground}
            type="checkbox"
            onChange={(event) => handleRoleFilterChange(event)}
            name="music-filter"
            id="music-filter-wrote"
            checked={filters.includes('wrote')}
            disabled={!wroteAvailable}
            value="wrote"
          />
        </LabelContainer>
        <LabelContainer>
          <P as="label" htmlFor="music-filter-produced">
            produced
          </P>
          <input
            type="checkbox"
            onChange={(event) => handleRoleFilterChange(event)}
            name="music-filter"
            id="music-filter-produced"
            checked={filters.includes('produced')}
            disabled={!producedAvailable}
            value="produced"
          />
        </LabelContainer>
        <LabelContainer>
          <P as="label" htmlFor="music-filter-performed">
            performed
          </P>
          <input
            type="checkbox"
            onChange={(event) => handleRoleFilterChange(event)}
            name="music-filter"
            id="music-filter-performed"
            checked={filters.includes('performed')}
            disabled={!performedAvailable}
            value="performed"
          />
        </LabelContainer>
      </FilterFieldset>

      <SelectContainer>
        <fieldset>
          <label>
            <LabelText as="span">sort</LabelText>

            <select
              onChange={(event) => handleSortChange(event)}
              name="musicTimelineSort"
              id="musicTimelineSort"
            >
              <option selected={'default' === sortBy} value="default">
                default
              </option>
              <option selected={'most-recent' === sortBy} value="most-recent">
                most recent
              </option>
              <option selected={'oldest' === sortBy} value="oldest">
                oldest
              </option>
            </select>
          </label>
        </fieldset>

        <SortFieldset>
          <label>
            <LabelText as="span">artist</LabelText>
            <select
              onChange={(event) => handleArtistFilterChange(event)}
              name="musicArtistSort"
              id="musicArtistSort"
            >
              <option value="">all</option>
              {artists.map((artist) => {
                return (
                  <option
                    key={artist}
                    value={artist}
                    selected={artist === artistFilter}
                  >
                    {artist}
                  </option>
                );
              })}
            </select>
          </label>
        </SortFieldset>
      </SelectContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const props = {
    filters: state.musicProjects.filters,
    artists: state.musicProjects.artists,
  };
  return { ...state, ...props };
};

MusicSort.propTypes = {
  filters: arrayOf(string),
  artists: arrayOf(string),
};

MusicSort.defaultProps = {
  filters: [''],
  artists: [''],
};

export default connect(mapStateToProps)(MusicSort);
