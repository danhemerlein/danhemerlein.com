import { string } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { filterCodeProjectsByType } from 'store/actions/codeProjects';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities';
import { remHelper } from 'utils';

const Container = styled(FlexContainer)`
  width: 100%;
  margin-top: ${remHelper[16]};
  flex-direction: column;

  ${above.tablet`
    flex-direction: row;
  `}
`;

const LabelText = styled(P)`
  display: block;
  margin-bottom: ${remHelper[8]};
`;

const SelectContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};
  width: 100%;

  ${above.tablet`
    margin-top: 0;
    width: auto;
  `}
`;

function CodeSort({ filterBy }) {
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    dispatch(filterCodeProjectsByType(event.target.value));
  };

  return (
    <Container>
      <SelectContainer>
        <fieldset>
          <label>
            <LabelText as="span">filter</LabelText>

            <select
              onChange={(event) => handleSortChange(event)}
              value={filterBy}
              name="codeProjectFilter"
              id="codeProjectFilter"
            >
              <option value="">all</option>

              <option
                // selected={'work-experience' === filterBy}
                value="work-experience"
              >
                work experience
              </option>
              <option value="portfolios">portfolio</option>
              <option value="freelance">freelance work</option>
              <option value="passion-project">passion project</option>
            </select>
          </label>
        </fieldset>
      </SelectContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    filterBy: state.codeProjects.filterBy,
  };
};

CodeSort.propTypes = {
  filterBy: string.isRequired,
};

export default connect(mapStateToProps)(CodeSort);
