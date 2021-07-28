import React from "react";
import { connect, useDispatch } from "react-redux";
import {
  filterMusicProjectsByArtist,
  filterMusicProjectsByRole,
  sortMusicProjects,
} from "store/actions/musicProjects";
import styled from "styled-components";
import { FlexContainer, P } from "styles/elements";
import { remHelper } from "utils";

const Container = styled(FlexContainer)`
  width: 100%;
  margin: ${remHelper[16]} 0;
`;

const LabelText = styled(P)`
  display: block;
  margin-bottom: ${remHelper[8]};
`;

const FilterFieldset = styled(FlexContainer)`
  margin-right: ${remHelper[16]};
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

const MusicSort = ({ filters, artists }) => {
  const dispatch = useDispatch();

  function handleSortChange(event) {
    dispatch(sortMusicProjects(event.target.value));
  }

  function handleRoleFilterChange(event) {
    dispatch(filterMusicProjectsByRole(event.target.value));
  }

  function handleArtistFilterChange(event) {
    dispatch(filterMusicProjectsByArtist(event.target.value));
  }

  return (
    <Container>
      <FilterFieldset as="fieldset">
        <LabelText as="legend">filter</LabelText>
        <LabelContainer>
          <P as="label" htmlFor="music-filter-wrote">
            wrote
          </P>
          <input
            type="checkbox"
            onChange={(event) => handleRoleFilterChange(event)}
            name="music-filter"
            id="music-filter-wrote"
            checked={filters.includes("wrote")}
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
            checked={filters.includes("produced")}
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
            checked={filters.includes("performed")}
            value="performed"
          />
        </LabelContainer>
      </FilterFieldset>

      <fieldset>
        <label>
          <LabelText as="span">sort</LabelText>

          <select onChange={(event) => handleSortChange(event)}>
            <option value="default">default</option>
            <option value="most-recent">most recent</option>
            <option value="oldest">oldest</option>
          </select>
        </label>
      </fieldset>

      <SortFieldset>
        <label>
          <LabelText as="span">artist</LabelText>
          <select onChange={(event) => handleArtistFilterChange(event)}>
            <option value="all">all</option>
            {artists.map((artist) => {
              return <option value={artist}>{artist}</option>;
            })}
          </select>
        </label>
      </SortFieldset>
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

export default connect(mapStateToProps)(MusicSort);
