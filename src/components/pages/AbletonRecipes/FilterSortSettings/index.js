import Button from 'components/base/Button';
import { Form, Formik } from 'formik';
import Select from 'react-select';
import styled from 'styled-components';
import { P } from 'styles/elements';
import { ParagraphCSS } from 'styles/elements/typography';
import { remHelper } from 'utils/remHelper';

const StyledButton = styled(Button)`
  display: block;
`;

const Bold = styled(P)`
  font-weight: bold;
  margin-bottom: ${remHelper[8]};
`;

const FilterSort = styled.div`
  * {
    font-family: 'arial' !important;
  }
`;

const SubmitContainer = styled.div`
  margin-top: ${remHelper[16]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${remHelper[16]};

  label {
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: ${remHelper[16]};
  grid-template-columns: repeat(2, 1fr);
  margin-top: ${remHelper[16]};
`;

const StyledSelect = styled(Select)`
  .react-select__control {
    border-radius: 0;
    border: 1px solid;
    border-color: ${({ theme }) => {
      return theme.foreground;
    }};
    cursor: pointer;
  }

  .react-select__placeholder {
    ${ParagraphCSS};
    text-transform: lowercase;
  }

  .react-select__multi-value__label {
    ${ParagraphCSS};
    color: ${({ theme }) => {
      return theme.foreground;
    }};
  }

  .react-select__menu-list {
    border-radius: 0;
    border: 1px solid;
    border-color: ${({ theme }) => {
      return theme.foreground;
    }};
    cursor: pointer;
  }

  .react-select__option {
    ${ParagraphCSS};
    cursor: pointer;
    border-bottom: 1px solid;
    border-color: ${({ theme }) => {
      return theme.foreground;
    }};
  }
`;

const FilterSortSettings = ({
  setFunMode,
  funMode,
  platforms,
  ops,
  tags,
  genres,
  handleFilterSort
}) => {
  console.log(genres);
  return (
    <Formik
      initialValues={{
        platforms: [],
        ops: [],
        tags: [],
        genres: []
      }}
      onSubmit={(values) => {
        handleFilterSort(values);
      }}
    >
      <Form>
        <FilterSort>
          <Grid>
            <div>
              <Bold>tags</Bold>

              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"
                name="tags"
                options={tags}
                isMulti
              />
            </div>

            <div>
              <Bold id="genres-group">genres</Bold>

              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"
                name="genres"
                options={genres}
                isMulti
              />
            </div>
            <div>
              <Bold id="ops-group">original posters</Bold>

              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"
                name="ops"
                options={ops}
                isMulti
              />
            </div>

            <div>
              <Bold id="platforms-group">platforms</Bold>

              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"
                name="platforms"
                options={platforms}
                isMulti
              />
            </div>
          </Grid>
        </FilterSort>

        <SubmitContainer items="center">
          <div>
            <Bold as="label" htmlFor="funMode">
              fun mode
            </Bold>
            <input
              onChange={() => {
                return setFunMode(!funMode);
              }}
              type="checkbox"
              name="funMode"
              id="funMode"
              checked={funMode}
            />
          </div>
          <StyledButton type="submit">submit</StyledButton>
        </SubmitContainer>
      </Form>
    </Formik>
  );
};

FilterSortSettings.propTypes = {};

export default FilterSortSettings;
