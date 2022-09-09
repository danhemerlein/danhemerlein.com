import { Form, Formik } from 'formik';
import { P } from 'styles/elements';
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
        sort: 'ORDER_ASC'
      }}
      onSubmit={(values) => {
        handleFilterSort(values);
      }}
    >
      {({ values, setFieldValue, submitForm }) => {
        console.log(values);
        return (
          <Form>
            <styles.Grid>
              <div>
                <styles.Paragraph bold>tags</styles.Paragraph>

                <styles.StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  onChange={(e) => {
                    setFieldValue('tags', e);
                    submitForm();
                  }}
                  options={tags}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>genres</styles.Paragraph>

                <styles.StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="genres"
                  options={genres}
                  onChange={(e) => {
                    setFieldValue('genres', e);
                    submitForm();
                  }}
                  isMulti
                />
              </div>
              <div>
                <styles.Paragraph bold>original posters</styles.Paragraph>

                <styles.StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="ops"
                  options={ops}
                  onChange={(e) => {
                    setFieldValue('ops', e);
                    submitForm();
                  }}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>platforms</styles.Paragraph>
                <styles.StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="platforms"
                  options={platforms}
                  onChange={(e) => {
                    setFieldValue('platforms', e);
                    submitForm();
                  }}
                  isMulti
                />
              </div>

              <div>
                <styles.Paragraph bold>sort</styles.Paragraph>
                <styles.StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="sort"
                  options={[
                    { value: 'ORDER_ASC', label: 'newst' },
                    { value: 'ORDER_DESC', label: 'oldest' }
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
