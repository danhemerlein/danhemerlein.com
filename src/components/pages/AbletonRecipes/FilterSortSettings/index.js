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
        platform: '',
        op: '',
        tags: [],
        primaryGenre: '',
        secondaryGenre: '',
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
                <styles.Paragraph bold>primary genre</styles.Paragraph>

                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="genres"
                  options={createReactSelectOptions(genres)}
                  onChange={(e) => {
                    setFieldValue('primaryGenre', e.value);
                    submitForm();
                  }}
                />
              </div>

              <div>
                <styles.Paragraph bold>secondary genre</styles.Paragraph>

                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="genres"
                  options={createReactSelectOptions(genres)}
                  onChange={(e) => {
                    setFieldValue('secondaryGenre', e.value);
                    submitForm();
                  }}
                />
              </div>

              <div>
                <styles.Paragraph bold>original posters</styles.Paragraph>

                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="op"
                  options={createReactSelectOptions(ops)}
                  onChange={(e) => {
                    setFieldValue('op', e.value);
                    submitForm();
                  }}
                />
              </div>

              <div>
                <styles.Paragraph bold>platforms</styles.Paragraph>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="platform"
                  options={createReactSelectOptions(platforms)}
                  onChange={(e) => {
                    setFieldValue('platform', e.value);
                    submitForm();
                  }}
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
