import { StyledSelect } from 'components/base/FormElements/StyledSelect';
import { Form, Formik } from 'formik';
import { createReactSelectOptions } from 'utils/lib';
import * as styles from './FilterSortSettings.styles';

const FilterSortSettings = ({
  platforms,
  ops,
  tags,
  genres,
  handleFilterSort,
  setFilterError,
  setRecipes,
  pointer,
  types,
  setFilterValues
}) => {
  return (
    <Formik
      initialValues={{
        platform: '',
        op: '',
        tags: [],
        primaryGenre: '',
        secondaryGenre: '',
        type: '',
        sort: 'desc',
        heartCountSort: '',
        dateCreated: ''
      }}
      onSubmit={(values) => {
        handleFilterSort(values, setFilterError, setRecipes, pointer);
        setFilterValues(values);
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
                <styles.Paragraph bold>type</styles.Paragraph>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="type"
                  options={createReactSelectOptions(types)}
                  onChange={(e) => {
                    setFieldValue('type', e.value);
                    submitForm();
                  }}
                />
              </div>

              <div>
                <styles.Paragraph bold>sort by date posted</styles.Paragraph>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="sort"
                  options={[
                    { value: 'desc', label: 'newest' },
                    { value: 'asc', label: 'oldest' }
                  ]}
                  onChange={(e) => {
                    setFieldValue('sort', e.value);
                    submitForm();
                  }}
                />
              </div>

              <div>
                <styles.Paragraph bold>sort by likes</styles.Paragraph>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="heartCountSort"
                  options={[
                    { value: 'desc', label: 'most liked' },
                    { value: 'asc', label: 'least liked' },
                    { value: '', label: 'clear' }
                  ]}
                  onChange={(e) => {
                    setFieldValue('heartCountSort', e.value);
                    submitForm();
                  }}
                />
              </div>

              <div>
                <styles.Paragraph bold>
                  sort by date added to ableton recipes
                </styles.Paragraph>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="dateCreated"
                  options={[
                    { value: 'asc', label: 'added most recently' },
                    { value: 'desc', label: 'added least recently' },
                    { value: '', label: 'clear' }
                  ]}
                  onChange={(e) => {
                    setFieldValue('dateCreated', e.value);
                    submitForm();
                  }}
                />
              </div>
            </styles.Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

FilterSortSettings.propTypes = {};

export default FilterSortSettings;
