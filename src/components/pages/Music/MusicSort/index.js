import React from "react";
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

const FilterLabel = styled.label`
  margin-right: ${remHelper[16]};
`;

const MusicSort = ({ handleSortChange, handleFilterChange }) => {
  return (
    <Container>
      <FilterLabel>
        <LabelText as="span">filter</LabelText>
        <select onChange={(event) => handleFilterChange(event)}>
          <option value="default">default</option>
          <option value="wrote">wrote</option>
          <option value="produced">produced</option>
          <option value="performed">perfomed</option>
        </select>
      </FilterLabel>

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

export default MusicSort;
