import React from "react";
import { connect, useDispatch } from "react-redux";
import {
  filterMusicProjects,
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
`;

const MusicSort = ({ filters }) => {
  const dispatch = useDispatch();

  function handleSortChange(event) {
    dispatch(sortMusicProjects(event.target.value));
  }

  function handleFilterChange(event) {
    dispatch(filterMusicProjects(event.target.value));
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
            onChange={(event) => handleFilterChange(event)}
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
            onChange={(event) => handleFilterChange(event)}
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
            onChange={(event) => handleFilterChange(event)}
            name="music-filter"
            id="music-filter-performed"
            checked={filters.includes("performed")}
            value="performed"
          />
        </LabelContainer>
      </FilterFieldset>

      <label>
        <LabelText as="span">sort</LabelText>

        <select onChange={(event) => handleSortChange(event)}>
          <option value="default">default</option>
          <option value="most-recent">most recent</option>
          <option value="oldest">oldest</option>
        </select>
      </label>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const props = {
    filters: state.musicProjects.filters,
  };
  return { ...state, ...props };
};

export default connect(mapStateToProps)(MusicSort);
