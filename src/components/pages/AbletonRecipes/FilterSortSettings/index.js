import { Field, Form, Formik } from 'formik';
import Select from 'react-select';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

const Bold = styled(P)`
  font-weight: bold;
`;

const FilterSort = styled.div`
  * {
    font-family: 'arial';
  }
`;

const CheckboxContainer = styled(FlexContainer)`
  margin-top: ${remHelper[16]};
`;

const LabelText = styled(P)`
  display: block;
  cursor: pointer;
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
    <>
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
            <Bold id="tags-group">tags</Bold>

            <FlexContainer
              role="group"
              aria-labelledby="tags-group"
              direction="column"
            >
              <Select name="tags" options={tags} isMulti />
            </FlexContainer>

            <Bold id="genres-group">genres</Bold>

            <FlexContainer
              role="group"
              aria-labelledby="genres-group"
              direction="column"
            >
              <Select name="genres" options={genres} isMulti />
            </FlexContainer>

            <Bold id="ops-group">original posters</Bold>

            <FlexContainer role="group" aria-labelledby="ops-group">
              {ops.map((op) => {
                return (
                  <>
                    <LabelText as="label" htmlFor={op}>
                      {op}
                    </LabelText>
                    <Field type="checkbox" name="ops" value={op} id={op} />
                  </>
                );
              })}
            </FlexContainer>

            <Bold id="platforms-group">platforms</Bold>

            <FlexContainer role="group" aria-labelledby="platforms-group">
              {platforms.map((platform) => {
                return (
                  <>
                    <LabelText as="label" htmlFor={platform}>
                      {platform}
                    </LabelText>
                    <Field
                      type="checkbox"
                      name="platforms"
                      id={platform}
                      value={platform}
                    />
                  </>
                );
              })}
            </FlexContainer>
          </FilterSort>

          <button type="submit">submit</button>
        </Form>
      </Formik>

      <CheckboxContainer wrap="wrap" justify="space-between">
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
      </CheckboxContainer>
    </>
  );
};

FilterSortSettings.propTypes = {};

export default FilterSortSettings;
