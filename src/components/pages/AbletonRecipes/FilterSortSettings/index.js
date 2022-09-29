import { StyledSelect } from 'components/base/FormElements/StyledSelect';

import { Form, Formik } from 'formik';
import { P } from 'styles/elements';
import { createReactSelectOptions } from 'utils/lib';
import * as styles from './FilterSortSettings.styles';

const FilterSortSettings = ({
  setFunMode,
  funMode,
  platforms,
  ops,
  tags,
  genres,
  handleFilterSort
}) => {
  return (
    <Formik
      initialValues={{
        platforms: [],
        ops: [],
        tags: [],
        genres: [],
        sort: 'desc'
      }}
      onSubmit={(values) => {
        handleFilterSort(values);
      }}
    >
      {({ values, setFieldValue, submitForm }) => {
        return (
          <Form>
            <styles.Grid>
              <div>
                <styles.Paragraph bold>tags</styles.Paragraph>

                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  onChange={(e) => {
                    setFieldValue('tags', e);
                    submitForm();
                  }}
                  options={createReactSelectOptions(tags)}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>genres</styles.Paragraph>

                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="genres"
                  options={createReactSelectOptions(genres)}
                  onChange={(e) => {
                    setFieldValue('genres', e);
                    submitForm();
                  }}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>original posters</styles.Paragraph>

                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="ops"
                  options={createReactSelectOptions(ops)}
                  onChange={(e) => {
                    setFieldValue('ops', e);
                    submitForm();
                  }}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>platforms</styles.Paragraph>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="platforms"
                  options={createReactSelectOptions(platforms)}
                  onChange={(e) => {
                    setFieldValue('platforms', e);
                    submitForm();
                  }}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>sort</styles.Paragraph>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="sort"
                  options={[
                    { value: 'desc', label: 'newst' },
                    { value: 'asc', label: 'oldest' }
                  ]}
                  onChange={(e) => {
                    setFieldValue('sort', e.value);
                    submitForm();
                  }}
                />
              </div>
              <styles.SubmitContainer items="center">
                <P bold as="label" htmlFor="funMode">
                  fun mode
                </P>
                <input
                  onChange={() => {
                    return setFunMode(!funMode);
                  }}
                  type="checkbox"
                  name="funMode"
                  id="funMode"
                  checked={funMode}
                />
              </styles.SubmitContainer>
            </styles.Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

FilterSortSettings.propTypes = {};

export default FilterSortSettings;
